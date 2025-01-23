import { SzAbstractFactory, SzEngineFlags } from '../../dist/@senzing/sz-sdk-typescript-grpc';

const szParamFactory = new SzAbstractFactory(`0.0.0.0:8261`);
const szEngine       = szParamFactory.createEngine();

const DATA_SOURCE_CODE = "TEST";
const FLAGS = SzEngineFlags.SZ_RECORD_DEFAULT_FLAGS;
const RECORD_DEFINITION = {
    "RECORD_TYPE": "PERSON",
    "PRIMARY_NAME_LAST": "Smith",
    "PRIMARY_NAME_FIRST": "Robert",
    "DATE_OF_BIRTH": "12/11/1978",
    "ADDR_TYPE": "MAILING",
    "ADDR_LINE1": "123 Main Street, Las Vegas NV 89132",
    "PHONE_TYPE": "HOME",
    "PHONE_NUMBER": "702-919-1300",
    "EMAIL_ADDRESS": "bsmith@work.com",
    "DATE": "1/2/18",
    "STATUS": "Active",
    "AMOUNT": "100"
};
const RECORD_ID = "1";

await szEngine.preprocessRecord(JSON.stringify(RECORD_DEFINITION), FLAGS).then((resp) => {
    console.log(`RESULT #${RECORD_ID}:\n${resp}`);
});