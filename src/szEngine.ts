import * as grpc from '@grpc/grpc-js';
import { AddRecordRequest, AddRecordResponse, CloseExportRequest, CloseExportResponse, CountRedoRecordsRequest, CountRedoRecordsResponse, DeleteRecordRequest, DeleteRecordResponse, ExportJsonEntityReportRequest, ExportJsonEntityReportResponse, FetchNextRequest, FetchNextResponse, FindInterestingEntitiesByEntityIdRequest, FindInterestingEntitiesByEntityIdResponse, FindInterestingEntitiesByRecordIdRequest, FindInterestingEntitiesByRecordIdResponse, FindNetworkByEntityIdRequest, FindNetworkByEntityIdResponse, FindNetworkByRecordIdRequest, FindNetworkByRecordIdResponse, FindPathByEntityIdRequest, FindPathByEntityIdResponse, FindPathByRecordIdRequest, FindPathByRecordIdResponse, GetActiveConfigIdRequest, GetActiveConfigIdResponse, GetEntityByEntityIdRequest, GetEntityByEntityIdResponse, GetEntityByRecordIdRequest, GetEntityByRecordIdResponse, GetRecordRequest, GetRecordResponse, GetRedoRecordRequest, GetRedoRecordResponse, GetStatsRequest, GetStatsResponse, GetVirtualEntityByRecordIdRequest, GetVirtualEntityByRecordIdResponse, HowEntityByEntityIdRequest, HowEntityByEntityIdResponse, PreprocessRecordRequest, PreprocessRecordResponse, PrimeEngineRequest, PrimeEngineResponse, ProcessRedoRecordRequest, ProcessRedoRecordResponse, ReevaluateEntityRequest, ReevaluateEntityResponse, ReevaluateRecordRequest, ReevaluateRecordResponse, ReinitializeRequest, ReinitializeResponse, SearchByAttributesRequest, SearchByAttributesResponse, StreamExportJsonEntityReportRequest, StreamExportJsonEntityReportResponse, WhyEntitiesRequest, WhyEntitiesResponse, WhyRecordInEntityRequest, WhyRecordInEntityResponse, WhyRecordsRequest, WhyRecordsResponse } from './szengine/szengine_pb';
import { SzEngineClient } from './szengine/szengine_grpc_pb';
import { SzAbstractEngine } from './abstracts/szAbstractEngine';
import { SzAbstractFactoryOptions } from './szfactorycreator/szFactoryCreator';
import { asString, bigIntToNumber, entityIdsAsJsonString, entityIdsToAvoidAsJson, newException, recordIdsAsJsonString, recordKeysToAvoidAsJson, requiredDataSourcesAsJson } from './szHelpers';
import { SzError, SzNoGrpcConnectionError, SzNotYetImplementedError } from './senzing/SzError';
import { SzEngineFlags } from './senzing';
import { SzGetVirtualEntityByRecordIdRequestParametersJson, SzRecordIdentifierPair } from './types/szEngine';

/**
 * Senzing engine module access gRPC class
 */
export class SzEngine implements SzAbstractEngine {
    private connectionString: string;
    private credentials: grpc.ChannelCredentials;
    private client;
    /** See {@link https://github.com/senzing-garage/knowledge-base/blob/main/lists/senzing-component-ids.md} */
    public productId = "5053";

    constructor(parameters: SzAbstractFactoryOptions) {
        const { connectionString, credentials } = parameters;
        this.connectionString   = connectionString;
        this.credentials        = credentials !== undefined? credentials : grpc.credentials.createInsecure();

        if(this.connectionString) {
            this.client             = new SzEngineClient(this.connectionString, this.credentials);
        }
    }
    /**
     * The addRecord method adds a record into the Senzing repository. Can be called as many times as desired and from multiple threads at the same time.
     * @param dataSourceCode Identifies the provenance of the data.
     * @param recordId The unique identifier within the records of the same data source.
     * @param recordDefinition A JSON document containing the record to be added to the Senzing repository.
     * @param engineFlags Flags used to control information returned. Defaults to 0.
     * @returns Promise<string> or Promise<SzError>
     */
    addRecord(dataSourceCode: string, recordId: string | number, recordDefinition: any, engineFlags: BigInt | number = 0): Promise<string | SzError> {
        let recordPayload: string;
        // cast recordId to string

        // check to see if record is already string
        // if json stringify
        if((recordDefinition).toString() === '[object Object]') {
            // passed in JSON most likely
            // verify json
            try{
                recordDefinition = JSON.stringify(recordDefinition);
            } catch(err) {
                // log/throw error
            }
        }
        // make sure string is valid JSON
        try {
            let _parses = JSON.parse(recordDefinition as string);
            recordPayload = recordDefinition as string;
        } catch(err){
            // throw? or log??
        }

        return new Promise(async (resolve, reject) => {
            if(!this.client){
                reject('no connection present');
                return
            }
            const request = new AddRecordRequest();
            request.setDatasourcecode(dataSourceCode);
            request.setRecordid(recordId as string);
            request.setRecorddefinition(recordPayload);
            request.setFlags(bigIntToNumber(engineFlags));

            this.client.addRecord(request, (err, res: AddRecordResponse) => {
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                let result = res.getResult();
                resolve(result);
            });
        });
    }
    /**
     * The closeExport method closes the exported document created by exportJsonEntityReport. It is part of the export_json_entity_report, fetch_next, close_export lifecycle of a list of sized
     * @param exportHandle A handle created by exportJsonEntityReport or exportCsvEntityReport.
     * @returns Promise<undefined> for better support of async waiting
     */
    closeExport(exportHandle: number) {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new CloseExportRequest();
            request.setExporthandle(exportHandle);
            this.client.closeExport(request, (err, res: CloseExportResponse) => {
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                resolve(undefined);
            });
        });
    }
    /**
     * The countRedoRecords method returns the number of records in need of redo-ing.
     * @returns The number of redo records in Senzing’s redo queue.
     */
    countRedoRecords(): Promise<number | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new CountRedoRecordsRequest();
            this.client.countRedoRecords(request, (err, res: CountRedoRecordsResponse) => {
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                resolve(res.getResult());
            });
        });
    }
    /**
     * The deleteRecord method deletes a record from the Senzing repository.
     * @param dataSourceCode Identifies the provenance of the data
     * @param recordId The unique identifier within the records of the same data source.
     * @param flags Flags used to control information returned. Defaults to 0.
     * @returns 
     */
    deleteRecord(dataSourceCode: string, recordId: string, flags: BigInt | number = 0): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new DeleteRecordRequest();
            request.setDatasourcecode(dataSourceCode);
            request.setRecordid(recordId);
            request.setFlags(bigIntToNumber(flags));
            this.client.deleteRecord(request, (err, res: DeleteRecordResponse)=>{
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                let result = res.getResult();
                resolve(result);
            });
        });
    }

    /**
     * The exportCsvEntityReport method initializes a cursor over a document of exported 
     * entities. It is part of the exportCsvEntityReport, fetchNext, closeExport lifecycle of a list of entities to export.
     * 
     * @todo still need to work out how to sequentially call the fetchNext after this call.
     * recursive function maybe? promises are async so there's no guarantee that one will finish before the next.
     * 
     * @warning not yet implemented
     */
    exportCsvEntityReport() {
        return new Promise(async (resolve, reject) => {
            reject(new SzNotYetImplementedError());
        });
    }
    /** NOT YET IMPLEMENTED */
    exportCsvEntityReportIterator() {
        return new Promise(async (resolve, reject) => {
            reject(new SzNotYetImplementedError());
        });
    }
    /**
     * The exportJsonEntityReport method initializes a cursor over a document of exported 
     * entities. It is part of the exportJsonEntityReport, fetchNext, closeExport lifecycle of a list of entities to export.
     * 
     * @todo still need to work out how to sequentially call the fetchNext after this call.
     * recursive function maybe? promises are async so there's no guarantee that one will finish before the next.
     */
    exportJsonEntityReport(flags: BigInt | number = SzEngineFlags.SZ_EXPORT_DEFAULT_FLAGS) {

    }
    /**
     * NOT YET IMPLEMENTED
     * @todo still need to figure out why the stream reader is 
     * immediately completing and returning no data. o_O
     * 
     * tried 3 different ways, none of them are behaving like I would expect.
     */
    exportJsonEntityReportIterator(flags: BigInt | number = SzEngineFlags.SZ_EXPORT_DEFAULT_FLAGS) {
        return new Promise(async (resolve, reject) => {
            reject(new SzNotYetImplementedError());
            /*
            const request = new StreamExportJsonEntityReportRequest();
            request.setFlags(bigIntToNumber(flags));
            console.log(`flags: ${flags}`,);
            if(!this.client){
                throw newException("no connection present");
                return
            }
            let result = "";
            const call = this.client.streamExportJsonEntityReport(request);
            //for await (const response of call) {
            //    console.log(`what is this? \n`, response, '\n');
            //}
            //call.on("data", (frag: any) => {
            //    console.log(`added Frag to result\n\r`, frag);
            //})
            call.forEach((item: string) => {
                result += item;
                console.log(`added item to result\n\r`, item);
            }).then(()=>{
                resolve(result);
            })
            */
        });
    }
    /**
     * NOT YET IMPLEMENTED
     * 
     * @todo still need to work out how to sequentially call this after the exportJsonEntityReport call.
     * recursive function maybe? promises are async so there's no guarantee that one will finish before the next.
     */
    async fetchNext(exportHandle: number): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            reject(new SzNotYetImplementedError());
            /*
            if(!this.client){
                reject('no connection present');
                return
            }
            const request = new FetchNextRequest();
            this.client.fetchNext(request, (err, res: FetchNextResponse)=>{
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                let result = res.getResult();
                resolve(result);
            });
            */
        });
    }
    /**
     * @todo document method
     * @param entityId 
     * @param flags 
     * @returns 
     */
    findInterestingEntitiesByEntityId(entityId: number, flags: BigInt | number = SzEngineFlags.SZ_ENTITY_DEFAULT_FLAGS): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new FindInterestingEntitiesByEntityIdRequest();
            request.setEntityid(entityId);
            request.setFlags(bigIntToNumber(flags));
            this.client.findInterestingEntitiesByEntityId(request, (err, res: FindInterestingEntitiesByEntityIdResponse)=>{
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                let result = res.getResult();
                resolve(result);
            });
        });
    }
    findInterestingEntitiesByRecordId(dataSourceCode: string, recordId: string, flags: BigInt | number = 0): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new FindInterestingEntitiesByRecordIdRequest();
            request.setDatasourcecode(dataSourceCode);
            request.setRecordid(recordId);
            request.setFlags(bigIntToNumber(flags));
            this.client.findInterestingEntitiesByRecordId(request, (err, res: FindInterestingEntitiesByRecordIdResponse)=>{
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                let result = res.getResult();
                resolve(result);
            });
        });
    }
    /**
     * Finds all entities surrounding a requested set of entities. This includes the requested entities, paths between them, and relations to other nearby entities. Returns a JSON document that identifies the path between the each set of search entities (if the path exists), and the information for the entities in the path.
     * @param entityIds The entity IDs to find the network between.
     * @param maxDegrees The maximum number of degrees in paths between search entities.
     * @param buildOutDegrees The number of degrees of relationships to show around each search entity.
     * @param buildOutMaxEntities The maximum number of entities to return in the discovered network.
     * @param flags 
     * @returns A JSON document as Promise<string>.
     */
    findNetworkByEntityId(entityIds: string | Array<number | string>, maxDegrees?: number, buildOutDegrees?: number, buildOutMaxEntities?: number, flags: BigInt | number = SzEngineFlags.SZ_FIND_NETWORK_DEFAULT_FLAGS) {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            let findNetworkEntityIds = entityIdsAsJsonString(entityIds);
            if(!findNetworkEntityIds) {
                throw new Error("could not parse entity id's from parameter");
            } else {
                const request = new FindNetworkByEntityIdRequest();
                request.setEntityids(findNetworkEntityIds);
                if(maxDegrees) { request.setMaxdegrees(maxDegrees); }
                if(buildOutDegrees) { request.setBuildoutdegrees(buildOutDegrees as number); }
                if(buildOutMaxEntities) { request.setBuildoutmaxentities(buildOutMaxEntities as number); }
                request.setFlags(bigIntToNumber(flags));
                this.client.findNetworkByEntityId(request, (err, res: FindNetworkByEntityIdResponse)=>{
                    if(err) {
                        let _err = newException(err.details);
                        reject(_err);
                        throw _err;
                        return;
                    }
                    let result = res.getResult();
                    resolve(result);
                });
            }
        });
    }
    /**
     * Finds all entities surrounding a requested set of entities by their RECORD_ID values. This includes the requested entities, paths between them, and relations to other nearby entities. Returns a JSON document that identifies the path between the each set of search entities (if the path exists), and the information for the entities in the path.
     * @param recordKeys The data source codes and record IDs to find the network between.
     * @param maxDegrees The maximum number of degrees in paths between search entities.
     * @param buildOutDegrees The number of degrees of relationships to show around each search entity.
     * @param buildOutMaxEntities The maximum number of entities to return in the discovered network.
     * @param flags Flags used to control information returned. Defaults to SzEngineFlags.SZ_FIND_PATH_DEFAULT_FLAGS.
     * @returns A JSON document as Promise<string>.
     */
    findNetworkByRecordId(recordKeys: Array<[string, number | string]>, maxDegrees?: number, buildOutDegrees?: number, buildOutMaxEntities?: number, flags: BigInt | number = SzEngineFlags.SZ_FIND_NETWORK_DEFAULT_FLAGS) {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            let findNetworkRecordIds = recordIdsAsJsonString(recordKeys);
            if(!findNetworkRecordIds) {
                throw new Error("could not parse record id's from parameter");
            } else {
                const request = new FindNetworkByRecordIdRequest();
                request.setRecordkeys(findNetworkRecordIds);
                if(maxDegrees) { request.setMaxdegrees(maxDegrees); }
                if(buildOutDegrees) { request.setBuildoutdegrees(buildOutDegrees as number); }
                if(buildOutMaxEntities) { request.setBuildoutmaxentities(buildOutMaxEntities as number); }
                request.setFlags(bigIntToNumber(flags));
                this.client.findNetworkByRecordId(request, (err, res: FindNetworkByRecordIdResponse)=>{
                    if(err) {
                        let _err = newException(err.details);
                        reject(_err);
                        throw _err;
                        return;
                    }
                    let result = res.getResult();
                    resolve(result);
                });
            }
        });
    }
    /**
     * Finds the most efficient relationship between two entities path based on the parameters and returns a JSON document with an ENTITY_PATHS section that details the path between the entities. The ENTITIES sections details information on the entities. Paths are found using known relationships with other entities. Paths are found using known relationships with other entities.
     * @todo Should accept both entity and record IDs in V4, test
     * @param startEntityId The entity ID for the starting entity of the search path.
     * @param endEntityId The entity ID for the ending entity of the search path.
     * @param maxDegrees The maximum number of degrees in paths between search entities.
     * @param avoidEntityIds The entity IDs to avoid when finding a path.
     * @param requiredDataSources The data source code(s) that must be in a path.
     * @param flags Flags used to control information returned. Defaults to SzEngineFlags.SZ_FIND_PATH_DEFAULT_FLAGS.
     * @returns A JSON document as Promise<string> with an ENTITY_PATHS section that details the path between the entities.
     */
    findPathByEntityId(
        startEntityId: number,
        endEntityId: number,
        maxDegrees: number,
        avoidEntityIds?: Array<number>,
        requiredDataSources?: Array<string>, 
        flags: BigInt | number = SzEngineFlags.SZ_FIND_PATH_DEFAULT_FLAGS
    ) {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new FindPathByEntityIdRequest();
            request.setStartentityid(startEntityId);
            request.setEndentityid(endEntityId);
            request.setMaxdegrees(maxDegrees);
            if(avoidEntityIds) { 
                request.setAvoidentityids(entityIdsToAvoidAsJson(avoidEntityIds)); 
            }
            if(requiredDataSources) { 
                request.setRequireddatasources(requiredDataSourcesAsJson(requiredDataSources)); 
            }
            request.setFlags(bigIntToNumber(flags));
            this.client.findPathByEntityId(request, (err, res: FindPathByEntityIdResponse)=>{
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                let result = res.getResult();
                resolve(result);
            });
        });
    }
    /**
     * Finds the most efficient relationship between two entities path based on the parameters by RECORD_ID values and returns a JSON document with an ENTITY_PATHS section that details the path between the entities. The ENTITIES sections details information on the entities. Paths are found using known relationships with other entities. The entities are identified by starting and ending records.
     * @param startDataSourceCode Identifies the provenance of the record for the starting entity of the search path.
     * @param startRecordId The unique identifier within the records of the same data source for the starting entity of the search path.
     * @param endDataSourceCode Identifies the provenance of the record for the ending entity of the search path.
     * @param endRecordId The unique identifier within the records of the same data source for the ending entity of the search path.
     * @param maxDegrees The maximum number of degrees in paths between search entities.
     * @param avoidRecordKeys The data source codes and record IDs to avoid when finding a path.
     * @param requiredDataSources The data source code(s) that must be in a path.
     * @param flags Flags used to control information returned. Defaults to SzEngineFlags.SZ_FIND_PATH_DEFAULT_FLAGS.
     * @returns A JSON document as Promise<string>
     */
    findPathByRecordId(
        startDataSourceCode: string,
        startRecordId: string,
        endDataSourceCode: string,
        endRecordId: string,
        maxDegrees: number,
        avoidRecordKeys?: Array<[string, number]>,
        requiredDataSources?: Array<string>, 
        flags: BigInt | number = SzEngineFlags.SZ_FIND_PATH_DEFAULT_FLAGS
    ) {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new FindPathByRecordIdRequest();
            request.setStartdatasourcecode(startDataSourceCode);
            request.setStartrecordid(startRecordId);
            request.setEnddatasourcecode(endDataSourceCode);
            request.setEndrecordid(endRecordId);
            request.setMaxdegrees(maxDegrees);
            if(avoidRecordKeys) { 
                request.setAvoidrecordkeys(recordKeysToAvoidAsJson(avoidRecordKeys)); 
            }
            if(requiredDataSources) { 
                request.setRequireddatasources(requiredDataSourcesAsJson(requiredDataSources)); 
            }
            request.setFlags(bigIntToNumber(flags));
            this.client.findPathByRecordId(request, (err, res: FindPathByRecordIdResponse)=>{
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                let result = res.getResult();
                resolve(result);
            });
        });
    }
    /**
     * Returns the identifier of the currently active Senzing engine configuration.
     * @returns The identifier of the active Senzing Engine configuration.
     */
    getActiveConfigId(): Promise<number | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new GetActiveConfigIdRequest();
            this.client.getActiveConfigId(request, (err, res: GetActiveConfigIdResponse)=>{
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                let result = res.getResult();
                resolve(result);
            });
        });
    }
    /**
     * Returns entity data based on the ID of a resolved identity.
     * @param entityId The unique identifier of an entity.
     * @param flags Flags used to control information returned. Defaults to SzEngineFlags.SZ_ENTITY_DEFAULT_FLAGS.
     * @returns A JSON document as Promise<string>
     */
    getEntityByEntityId(entityId: number, flags: BigInt | number = SzEngineFlags.SZ_ENTITY_DEFAULT_FLAGS): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new GetEntityByEntityIdRequest();
            request.setEntityid(entityId);
            request.setFlags(bigIntToNumber(flags));
            this.client.getEntityByEntityId(request, (err, res: GetEntityByEntityIdResponse)=>{
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                let result = res.getResult();
                resolve(result);
            });
        });
    }
    /**
     * Returns entity data based on the ID of a record which is a member of the entity.
     * @param dataSourceCode Identifies the provenance of the data.
     * @param recordId The unique identifier within the records of the same data source.
     * @param flags Flags used to control information returned. Defaults to SzEngineFlags.SZ_ENTITY_DEFAULT_FLAGS.
     * @returns A JSON document as Promise<string>
     */
    getEntityByRecordId(dataSourceCode: string, recordId: string, flags: BigInt | number = SzEngineFlags.SZ_ENTITY_DEFAULT_FLAGS): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new GetEntityByRecordIdRequest();
            request.setDatasourcecode(dataSourceCode);
            request.setRecordid(recordId);
            request.setFlags(bigIntToNumber(flags));
            this.client.getEntityByRecordId(request, (err, res: GetEntityByRecordIdResponse)=>{
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                let result = res.getResult();
                resolve(result);
            });
        });
    }
    /**
     * returns a JSON document of a single record from the Senzing repository. Can be called as many times as desired and from multiple threads at the same time.
     * @param dataSourceCode Identifies the provenance of the data.
     * @param recordId The unique identifier within the records of the same data source.
     * @param flags Flags used to control information returned. Defaults to SzEngineFlags.SZ_RECORD_DEFAULT_FLAGS.
     * @returns A JSON document of a single record as Promise<string>
     */
    getRecord(dataSourceCode: string, recordId: string, flags: BigInt | number = SzEngineFlags.SZ_RECORD_DEFAULT_FLAGS): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new GetRecordRequest();
            request.setDatasourcecode(dataSourceCode);
            request.setRecordid(recordId);
            request.setFlags(bigIntToNumber(flags));
            this.client.getRecord(request, (err, res: GetRecordResponse)=>{
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                let result = res.getResult();
                resolve(result);
            });
        });
    }
    /**
     * returns the next internally queued redo record from the Senzing repository. The processRedoRecord method is called to process the redo record retrieved by getRedoRecord.
     * @returns A JSON document as Promise<string>.
     */
    getRedoRecord(): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new GetRedoRecordRequest();
            this.client.getRedoRecord(request, (err, res: GetRedoRecordResponse)=>{
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                let result = res.getResult();
                resolve(result);
            });
        });
    }
    /**
     * The get_stats method retrieves workload statistics for the current process. These statistics will automatically reset after retrieval.
     * @returns A JSON document as Promise<string>.
     */
    getStats(): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new GetStatsRequest();
            this.client.getStats(request, (err, res: GetStatsResponse)=>{
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                let result = res.getResult();
                resolve(result);
            });
        });
    }
    /**
     * creates a view of a virtual entity using a list of existing loaded records. The virtual entity is composed of only those records and their features. Entity resolution is not performed.
     * @param recordKeys The data source codes and record IDs identifying records to create the virtual entity from.
     * @param flags Flags used to control information returned. Defaults to SzEngineFlags.SZ_HOW_ENTITY_DEFAULT_FLAGS.
     * @returns A JSON document as Promise<string>.
     */
    getVirtualEntityByRecordId(recordKeys: Array<[string, string | number]>, flags: BigInt | number = SzEngineFlags.SZ_VIRTUAL_ENTITY_DEFAULT_FLAGS): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new GetVirtualEntityByRecordIdRequest();
            request.setRecordkeys(JSON.stringify( recordIdsAsJsonString(recordKeys) ));
            request.setFlags(bigIntToNumber(flags));
            this.client.getVirtualEntityByRecordId(request, (err, res: GetVirtualEntityByRecordIdResponse)=>{
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                let result = res.getResult();
                resolve(result);
            });
        });
    }
    /**
     * Determines and details steps-by-step how records resolved to a single entity. 
     * 
     * In most cases, how provides more detailed information than why as the resolution is detailed step-by-step.
     * @param entityId The unique identifier of an entity.
     * @param flags Flags used to control information returned. Defaults to SzEngineFlags.SZ_HOW_ENTITY_DEFAULT_FLAGS.
     * @returns A JSON document as Promise<string>.
     */
    howEntityByEntityId(entityId: number, flags: BigInt | number = SzEngineFlags.SZ_HOW_ENTITY_DEFAULT_FLAGS): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new HowEntityByEntityIdRequest();
            request.setEntityid(entityId);
            request.setFlags(bigIntToNumber(flags));
            this.client.howEntityByEntityId(request, (err, res: HowEntityByEntityIdResponse)=>{
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                let result = res.getResult();
                resolve(result);
            });
        });
    }
    /**
     * The preprocess_record method tests adding a record into the Senzing datastore.
     * @param recordDefinition A JSON document containing the record to be tested.
     * @param flags Flags used to control information returned. Defaults to 0.
     * @returns A JSON document containing metadata as specified by the flags.
     */
    preprocessRecord(recordDefinition: string, flags: BigInt | number = SzEngineFlags.SZ_RECORD_DEFAULT_FLAGS): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new PreprocessRecordRequest();
            request.setRecorddefinition(recordDefinition);
            request.setFlags(bigIntToNumber(flags));
            this.client.preprocessRecord(request, (err, res: PreprocessRecordResponse)=>{
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                let result = res.getResult();
                resolve(result);
            });
        });
    }
    /**
     * Initializes high resource consumption components of Senzing used in some functions. If this call is not made, these resources are initialized the first time they are needed and can cause unusually long processing times the first time a function is called that requires these resources.
     * @returns Promise<undefined> for async/sync flow support
     */
    primeEngine() {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new PrimeEngineRequest();
            this.client.primeEngine(request, (err, res: PrimeEngineResponse)=>{
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                resolve(undefined);
            });
        });
    }
    /**
     * Called to process the redo record retrieved by getRedoRecord.
     * @param redoRecord 
     * @param flags 
     * @returns Promise<string>
     */
    processRedoRecord(redoRecord: string, flags: BigInt | number = 0): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new ProcessRedoRecordRequest();
            request.setRedorecord(redoRecord);
            request.setFlags(bigIntToNumber(flags));
            this.client.processRedoRecord(request, (err, res: ProcessRedoRecordResponse)=>{
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                let result = res.getResult();
                resolve(result);
            });
        });
    }
    /**
     * The reevaluate_entity method reevaluates the specified entity.
     * @param entityId The unique identifier of an entity.
     * @param flags Flags used to control information returned. Defaults to 0.
     * @returns Promise<string>
     */
    reevaluateEntity(entityId: number, flags: BigInt | number = 0): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new ReevaluateEntityRequest();
            request.setEntityid(entityId);
            request.setFlags(bigIntToNumber(flags));
            this.client.reevaluateEntity(request, (err, res: ReevaluateEntityResponse)=>{
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                let result = res.getResult();
                resolve(result);
            });
        });
    }
    /**
     * The reevaluate_record method reevaluates a specific record.
     * @param dataSourceCode Identifies the provenance of the data.
     * @param recordId The unique identifier within the records of the same data source.
     * @param flags Flags used to control information returned. Defaults to 0.
     * @returns If flags are set to return the WITH_INFO response a JSON document containing the details, otherwise an empty JSON document.
     */
    reevaluateRecord(dataSourceCode: string, recordId: string, flags: BigInt | number = 0): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new ReevaluateRecordRequest();
            request.setDatasourcecode(dataSourceCode);
            request.setRecordid(recordId);
            request.setFlags(bigIntToNumber(flags));
            this.client.reevaluateRecord(request, (err, res: ReevaluateRecordResponse)=>{
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                let result = res.getResult();
                resolve(result);
            });
        });
    }
    reinitialize(configId: number) {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new ReinitializeRequest();
            request.setConfigid(configId);
            this.client.reinitialize(request, (err, res: ReinitializeResponse)=>{
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                resolve(undefined);
            });
        });
    }
    /**
     * The searchByAttributes method retrieves entity data based on a user-specified set of entity attributes.
     * @param attributes A JSON document with the attribute data to search for.
     * @param flags Defaults to SzEngineFlags.SZ_SEARCH_BY_ATTRIBUTES_DEFAULT_FLAGS.
     * @param searchProfile The name of a configured search profile. Defaults to "SEARCH".
     * @returns A JSON document as Promise<string>.
     */
    searchByAttributes(attributes: string | Map<any, any> | {[key: string] : any}, flags: BigInt | number = SzEngineFlags.SZ_SEARCH_BY_ATTRIBUTES_DEFAULT_FLAGS, searchProfile: string = "") : Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new SearchByAttributesRequest();
            request.setAttributes(asString(attributes));
            request.setSearchprofile(searchProfile);
            this.client.searchByAttributes(request, (err, res: SearchByAttributesResponse)=>{
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                resolve(res.getResult());
            });
        });
    }
    /**
     * The why_entities method determines why entities did not resolve or why they do relate.
     * @param entityId1 The entity ID for the starting entity of the search path.
     * @param entityId2 The entity ID for the ending entity of the search path.
     * @param flags Flags used to control information returned. Defaults to SzEngineFlags.SZ_WHY_ENTITY_DEFAULT_FLAGS.
     * @returns A JSON document as Promise<string>.
     */
    whyEntities(entityId1: number, entityId2: number, flags: BigInt | number = SzEngineFlags.SZ_WHY_ENTITIES_DEFAULT_FLAGS) {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new WhyEntitiesRequest();
            request.setEntityid1(entityId1);
            request.setEntityid2(entityId2);
            request.setFlags(bigIntToNumber(flags));
            this.client.whyEntities(request, (err, res: WhyEntitiesResponse)=>{
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                let result = res.getResult();
                resolve(result);
            });
        });
    }
    /**
     * Determines why a record is included in an entity.
     * @param dataSourceCode Identifies the provenance of the data.
     * @param recordId The unique identifier within the records of the same data source.
     * @param flags Flags used to control information returned. Defaults to SzEngineFlags.SZ_WHY_ENTITY_DEFAULT_FLAGS.
     * @returns A JSON document as Promise<string>.
     */
    whyRecordInEntity(dataSourceCode: string, recordId: string, flags: BigInt | number = SzEngineFlags.SZ_WHY_RECORDS_DEFAULT_FLAGS) {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new WhyRecordInEntityRequest();
            request.setDatasourcecode(dataSourceCode);
            request.setRecordid(recordId);
            request.setFlags(bigIntToNumber(flags));
            this.client.whyRecordInEntity(request, (err, res: WhyRecordInEntityResponse)=>{
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                let result = res.getResult();
                resolve(result);
            });
        });
    }
    /**
     * The why_records determines if any two records can or cannot resolve together, or if they relate.
     * @param dataSourceCode1 Identifies the provenance of the data.
     * @param recordId1 The unique identifier within the records of the same data source.
     * @param dataSourceCode2 Identifies the provenance of the data.
     * @param recordId2 The unique identifier within the records of the same data source.
     * @param flags Flags used to control information returned. Defaults to SzEngineFlags.SZ_WHY_ENTITY_DEFAULT_FLAGS
     * @returns A JSON document as Promise<string>.
     */
    whyRecords(
        dataSourceCode1: string, recordId1: string, 
        dataSourceCode2: string, recordId2: string, 
        flags: BigInt | number = SzEngineFlags.SZ_WHY_RECORDS_DEFAULT_FLAGS
    ) {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new WhyRecordsRequest();
            request.setDatasourcecode1(dataSourceCode1);
            request.setDatasourcecode2(dataSourceCode2);
            request.setRecordid1(recordId1);
            request.setRecordid2(recordId2);
            request.setFlags(bigIntToNumber(flags));
            this.client.whyRecords(request, (err, res: WhyRecordsResponse)=>{
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                let result = res.getResult();
                resolve(result);
            });
        });
    }
}