import * as grpc from '@grpc/grpc-js';
import { AddRecordRequest, AddRecordResponse, CloseExportRequest, CloseExportResponse, CountRedoRecordsRequest, CountRedoRecordsResponse, DeleteRecordRequest, DeleteRecordResponse, ExportJsonEntityReportRequest, ExportJsonEntityReportResponse, FetchNextRequest, FetchNextResponse, FindInterestingEntitiesByEntityIdRequest, FindInterestingEntitiesByEntityIdResponse, FindInterestingEntitiesByRecordIdRequest, FindInterestingEntitiesByRecordIdResponse, FindNetworkByEntityIdRequest, FindNetworkByEntityIdResponse, FindNetworkByRecordIdRequest, FindNetworkByRecordIdResponse, FindPathByEntityIdRequest, FindPathByEntityIdResponse, FindPathByRecordIdRequest, FindPathByRecordIdResponse, GetActiveConfigIdRequest, GetActiveConfigIdResponse, GetEntityByEntityIdRequest, GetEntityByEntityIdResponse, GetEntityByRecordIdRequest, GetEntityByRecordIdResponse, GetRecordRequest, GetRecordResponse, GetRedoRecordRequest, GetRedoRecordResponse, GetStatsRequest, GetStatsResponse, GetVirtualEntityByRecordIdRequest, GetVirtualEntityByRecordIdResponse, HowEntityByEntityIdRequest, HowEntityByEntityIdResponse, PreprocessRecordRequest, PreprocessRecordResponse, PrimeEngineRequest, PrimeEngineResponse, ProcessRedoRecordRequest, ProcessRedoRecordResponse, ReevaluateEntityRequest, ReevaluateEntityResponse, ReevaluateRecordRequest, ReevaluateRecordResponse, ReinitializeRequest, ReinitializeResponse, SearchByAttributesRequest, SearchByAttributesResponse, StreamExportJsonEntityReportRequest, StreamExportJsonEntityReportResponse, WhyEntitiesRequest, WhyEntitiesResponse, WhyRecordInEntityRequest, WhyRecordInEntityResponse, WhyRecordsRequest, WhyRecordsResponse } from './szengine/szengine_pb';
import { SzEngineClient } from './szengine/szengine_grpc_pb';
import { SzAbstractEngine } from './abstracts/szAbstractEngine';
import { SzAbstractFactoryOptions } from './szfactorycreator/szFactoryCreator';
import { asString, bigIntToNumber, entityIdsAsJsonString, entityIdsToAvoidAsJson, newException, recordIdsAsJsonString, recordKeysToAvoidAsJson, requiredDataSourcesAsJson } from './szHelpers';
import { SzError } from './senzing/SzError';
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
    public productId = "5056";

    constructor(parameters: SzAbstractFactoryOptions) {
        const { connectionString, credentials } = parameters;
        this.connectionString   = connectionString;
        this.credentials        = credentials !== undefined? credentials : grpc.credentials.createInsecure();

        if(this.connectionString) {
            this.client             = new SzEngineClient(this.connectionString, this.credentials);
        }
    }
    /**
     * The add_record method adds a record into the Senzing repository. Can be called as many times as desired and from multiple threads at the same time.
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
     * The close_export method closes the exported document created by export_json_entity_report. It is part of the export_json_entity_report, fetch_next, close_export lifecycle of a list of sized
     * @param exportHandle A handle created by export_json_entity_report or export_csv_entity_report.
     * @returns Promise<undefined> for better support of async waiting
     */
    closeExport(exportHandle: number) {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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
     * The count_redo_records method returns the number of records in need of redo-ing.
     * @returns The number of redo records in Senzing’s redo queue.
     */
    countRedoRecords(): Promise<number | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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
     * The delete_record method deletes a record from the Senzing repository.
     * @param dataSourceCode Identifies the provenance of the data
     * @param recordId The unique identifier within the records of the same data source.
     * @param flags Flags used to control information returned. Defaults to 0.
     * @returns 
     */
    deleteRecord(dataSourceCode: string, recordId: string, flags: BigInt | number = 0): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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

    exportCsvEntityReport() {}
    exportCsvEntityReportIterator() {}
    /** starts export and provides a report handle that can be used with "fetchNext" */
    /*exportJsonEntityReport(flags = SzEngineFlags.SZ_EXPORT_DEFAULT_FLAGS): Promise<number | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
                return
            }
            const request = new ExportJsonEntityReportRequest();
            request.setFlags(flags);
            console.log(`flags: `, flags);

            this.client.exportJsonEntityReport(request, (err, res: ExportJsonEntityReportResponse) => {
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
    }*/
    exportJsonEntityReport(flags: BigInt | number = SzEngineFlags.SZ_EXPORT_DEFAULT_FLAGS) {
        return new Promise(async (resolve, reject) => {
            const request = new StreamExportJsonEntityReportRequest();
            request.setFlags(bigIntToNumber(flags));
            console.log(`flags: ${flags}`,);
            if(!this.client){
                throw newException("no connection present");
                return
            }
            let result = "";
            const call = this.client.streamExportJsonEntityReport(request);
            /*for await (const response of call) {
                console.log(`what is this? \n`, response, '\n');
            }*/
            call.on("data", (frag: any) => {
                console.log(`added Frag to result\n\r`, frag);
            })
            call.forEach((item: string) => {
                result += item;
                console.log(`added item to result\n\r`, item);
            }).then(()=>{
                console.log('Hi!\n\r', result);
                resolve(result);
            })

            setTimeout(()=>{
                //resolve('HI!');
            },10000);
            /*call.forEach((item) => {
                console.log(`what is this? \n`, item, '\n');
                result += item;
            }).then(()=>{
                resolve(result);
            });*/

            /*call.forEach((item) => {
                result += item;
            })*/
            
            //return call;
        });
    }
    exportJsonEntityReportIterator() {

    }
    async fetchNext(exportHandle: number): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
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
        });
    }
    findInterestingEntitiesByEntityId(entityId: number, flags: BigInt | number = SzEngineFlags.SZ_ENTITY_DEFAULT_FLAGS): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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
                reject('no connection present');
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
    findNetworkByEntityId(entityIds: string | Array<number | string>, maxDegrees?: number, buildOutDegrees?: number, buildOutMaxEntities?: number, flags: BigInt | number = SzEngineFlags.SZ_FIND_NETWORK_DEFAULT_FLAGS) {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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
    findNetworkByRecordId(recordKeys: Array<[string, string | number]>, maxDegrees?: number, buildOutDegrees?: number, buildOutMaxEntities?: number, flags: BigInt | number = SzEngineFlags.SZ_FIND_NETWORK_DEFAULT_FLAGS) {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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
    // TODO Should accept both entity and record IDs in V4, test
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
                reject('no connection present');
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
                reject('no connection present');
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
    getActiveConfigId(): Promise<number | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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

    getEntityByEntityId(entityId: number, flags: BigInt | number = SzEngineFlags.SZ_ENTITY_DEFAULT_FLAGS): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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
    getEntityByRecordId(dataSource: string, recordId: string, flags: BigInt | number = SzEngineFlags.SZ_ENTITY_DEFAULT_FLAGS): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
                return
            }
            const request = new GetEntityByRecordIdRequest();
            request.setDatasourcecode(dataSource);
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
    getRecord(dataSource: string, recordId: string, flags: BigInt | number = SzEngineFlags.SZ_RECORD_DEFAULT_FLAGS): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
                return
            }
            const request = new GetRecordRequest();
            request.setDatasourcecode(dataSource);
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
    getRedoRecord(): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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
    getStats(): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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
    getVirtualEntityByRecordId(recordKeys: Array<[string, string | number]>, flags: BigInt | number = SzEngineFlags.SZ_VIRTUAL_ENTITY_DEFAULT_FLAGS): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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
    howEntityByEntityId(entityId: number, flags: BigInt | number = SzEngineFlags.SZ_HOW_ENTITY_DEFAULT_FLAGS): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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
    preprocessRecord(recordDefinition: string, flags: BigInt | number = SzEngineFlags.SZ_RECORD_DEFAULT_FLAGS): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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
    primeEngine() {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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
    processRedoRecord(redoRecord: string, flags: BigInt | number = 0): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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
    reevaluateEntity(entityId: number, flags: BigInt | number = 0): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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
    reevaluateRecord(dataSourceCode: string, recordId: string, flags: BigInt | number = 0): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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
                reject('no connection present');
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
    searchByAttributes(attributes: string | Map<any, any> | {[key: string] : any}, flags: BigInt | number = SzEngineFlags.SZ_SEARCH_BY_ATTRIBUTES_DEFAULT_FLAGS, searchProfile: string = "") : Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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
    whyEntities(entityId1: number, entityId2: number, flags: BigInt | number = SzEngineFlags.SZ_WHY_ENTITIES_DEFAULT_FLAGS) {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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
    whyRecordInEntity(dataSourceCode: string, recordId: string, flags: BigInt | number = SzEngineFlags.SZ_WHY_RECORDS_DEFAULT_FLAGS) {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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
    whyRecords(
        dataSourceCode1: string, recordId1: string, 
        dataSourceCode2: string, recordId2: string, 
        flags: BigInt | number = SzEngineFlags.SZ_WHY_RECORDS_DEFAULT_FLAGS
    ) {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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