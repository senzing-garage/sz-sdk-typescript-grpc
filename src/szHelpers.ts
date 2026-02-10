// eslint-disable-next-line n/no-missing-import
import * as grpcweb from "grpc-web";
// eslint-disable-next-line n/no-missing-import
import * as grpc from "@grpc/grpc-js";
// eslint-disable-next-line n/no-missing-import
import { ENGINE_EXCEPTION_MAP, SzError } from "./senzing/SzError";

function ltrim(inputStr: string, searchStr?: string) {
  let start = 0;
  let retVal = inputStr;
  if (!searchStr) {
    return inputStr.replace(/^\s+/gm, "");
  }
  if (inputStr.includes(searchStr)) {
    while (searchStr.indexOf(inputStr[start]) >= 0) {
      start += 1;
    }
    retVal = inputStr.substring(start);
  }

  return retVal;
}

export function getSenzingErrorCode(error: string): number {
  let retVal = 0;
  if (!error || (error && error.length <= 0)) {
    return 0;
  }
  try {
    retVal = parseInt(ltrim(error.split("|")[0].trim(), "SENZ")); // not sure why you would want to "strip(S || E || N || Z)" and not just trim left of instance ??
  } catch {
    // bearer:disable javascript_lang_logger
    console.error(`ERROR: Could not parse error text '${error}'`);
  }
  return retVal;
}
/**
 * The other language implementations take an ServiceError object and pull details out of the object
 * but due to the ... non-uniform shape of the two different grpc packages implementations the static
 * analysis complains. the simple solution is to just pull the details out of the error obj
 * BEFORE it gets to the helper sig to avoid type collision issues.
 * @returns
 */
export function newException(
  error: grpc.ServiceError | grpcweb.RpcError,
): SzError {
  //let retVal          = initialError;
  //let details         = initialError.details;
  let errorDetails = undefined;
  if (error && (error as grpc.ServiceError).details) {
    errorDetails = (error as grpc.ServiceError).details;
  } else if (error && (error as grpcweb.RpcError).message) {
    errorDetails = (error as grpcweb.RpcError).message;
  }

  if (errorDetails === undefined) {
    return new SzError(errorDetails);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let detailsAsJSON: Record<string, any> = {};
  // is JSON?
  try {
    detailsAsJSON = JSON.parse(errorDetails); // check if "details" is a json Object
  } catch {
    /* parse failed, use empty default */
  }
  const reason = detailsAsJSON["reason"] ? detailsAsJSON["reason"] : "";
  const senzing_error_code = getSenzingErrorCode(reason);
  if (ENGINE_EXCEPTION_MAP.has(senzing_error_code)) {
    const senzing_error_class = ENGINE_EXCEPTION_MAP.get(senzing_error_code);
    return senzing_error_class
      ? new senzing_error_class(errorDetails)
      : new SzError(errorDetails);
  }
  return new SzError(errorDetails);
}

/** The SzEngineFlags values are all big int or bitwise operations on bigInt
 * so just casting them to numbers doesn't work due to some values being bitwise ops on
 * long numbers. the casting needs to be done inside the methods handing values to the engine.
 */
// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
export function bigIntToNumber(value: BigInt | number): number {
  if (typeof value === "bigint") {
    // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
    return Number(value as BigInt);
  } else {
    return value as number;
  }
}
/**
 * Given a string, map of key value pairs, or json object of key value pairs returns a string
 * @param value
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function asString(
  value: string | Map<any, any> | { [key: string]: any },
): string {
  let retVal = value as string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((value as Map<any, any>).entries) {
    // is map
    retVal = JSON.stringify(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Object.fromEntries(value as Map<any, any>),
    );
    return retVal;
  } else if (typeof (value as string) === "string") {
    // string
    // double check that it's valid json
    try {
      JSON.parse(value as string);
      retVal = value as string;
      return retVal;
    } catch {
      throw new Error("not parsable json");
    }
  } else if (typeof (value as { [key: string]: string }) === "object") {
    // serialized object
    retVal = JSON.stringify(value as string);
    return retVal;
  }
  return retVal;
}
/**
 * takes a array of entityId's, single string value of entityId, or comma delimited string of entityId's
 * and returns a json search compatible with the findNetwork method.
 * @param value
 * @returns json fragment of entityId's to use for findNetwork request
 */
export function entityIdsAsJsonString(
  value: string | Array<number | string>,
): string | undefined {
  let retVal = undefined;
  if (typeof value === "string") {
    // is string
    // check if they're already passing in '{"ENTITIES": [{"ENTITY_ID": number | string}]}'
    // a single entityId, or a comma-delimited list of entityId's
    let isJson = false;
    try {
      const asJSON = JSON.parse(value as string);
      isJson = asJSON && asJSON["ENTITIES"] !== undefined;
    } catch {
      /* not JSON */
    }
    if (isJson) {
      // just pass as string
      retVal = value as string;
    } else {
      // check if it has a "comma"
      if ((value as string).includes(",")) {
        // multiple entityId's
        const entitiesList = (value as string)
          .split(",")
          .map((entityId: string | number) => {
            return `{"ENTITY_ID": "${entityId}}"`;
          });
        retVal = `{"ENTITIES": [${entitiesList.join(",")}]}`;
      } else {
        // assume single entityId
        retVal = `{"ENTITIES": [ {"ENTITY_ID": ${value as string} }] }`;
      }
    }
  } else if (Array.isArray(value)) {
    // array of entity ids
    const entitiesList = (value as Array<number | string>).map(
      (entityId: string | number) => {
        return `{"ENTITY_ID": ${entityId}}`;
      },
    );
    retVal = `{"ENTITIES": [${entitiesList.join(",")}]}`;
  }
  return retVal;
}
/** takes a array of [dataSourceCode, recordId] values and returns findNetwork compatible json string */
export function recordIdsAsJsonString(
  values: Array<[string, string | number]>,
): string {
  let retVal = "";
  if (Array.isArray(values)) {
    const identifiersList = (values as Array<[string, string | number]>).map(
      (recordKey: [string, string | number]) => {
        return `{"DATA_SOURCE": "${recordKey[0]}", "RECORD_ID": "${recordKey[1]}"}`;
      },
    );
    retVal = `{"RECORDS": [${identifiersList.join(",")}]}`;
  }
  return retVal;
}
export function requiredDataSourcesAsJson(values: Array<string>): string {
  let retVal = `{"DATA_SOURCES": []}`;
  if (values && Array.isArray(values) && values.length > 0) {
    retVal = `{"DATA_SOURCES": [${values.map((dsVal) => {
      return '"' + dsVal + '"';
    })}]}`;
  }
  return retVal;
}
export function entityIdsToAvoidAsJson(values: Array<number>): string {
  let retVal = `{"ENTITIES": []}`;
  if (values && Array.isArray(values) && values.length > 0) {
    const entityIds = values.map((entityId) => {
      return `{"ENTITY_ID": ${entityId}}`;
    });
    retVal = `{"ENTITIES": [${entityIds.join(",")}]}`;
  }
  return retVal;
}
export function recordKeysToAvoidAsJson(
  values: Array<[string, string | number]>,
) {
  let retVal = `{"RECORDS": []}`;
  if (Array.isArray(values)) {
    const identifiersList = (values as Array<[string, string | number]>).map(
      (recordKey: [string, string | number]) => {
        return `{"DATA_SOURCE": "${recordKey[0]}", "RECORD_ID": ${recordKey[1]}})`;
      },
    );
    retVal = `{"RECORDS": [${identifiersList.join(",")}]}`;
  }
  return retVal;
}
