import * as grpc from '@grpc/grpc-js';
import { CheckDatastorePerformanceRequest, CheckDatastorePerformanceResponse, GetDatastoreInfoRequest, GetDatastoreInfoResponse, GetFeatureRequest, GetFeatureResponse, PurgeRepositoryRequest, PurgeRepositoryResponse, ReinitializeRequest, ReinitializeResponse } from './szdiagnostic/szdiagnostic_pb';
import { SzDiagnosticClient } from './szdiagnostic/szdiagnostic_grpc_pb';
import { SzAbstractDiagnostic } from './abstracts/szAbstractDiagnostic';
import { SzAbstractFactoryOptions } from './szfactorycreator/szFactoryCreator';
import { newException } from './szHelpers';
import { SzError, SzNoGrpcConnectionError } from './senzing/SzError';
import { CHECK_DATASTORE_PERFORMANCE_RESPONSE } from './types/szDiagnostic';

// --------------- user facing "grpc.SzDiagnostic" inheriting from SzAbstractDiagnostic

/**
 * SzDiagnostic
 * @class
 * @name SzDiagnostic
 */
export class SzDiagnostic implements SzAbstractDiagnostic {
    private connectionString: string;
    private credentials: grpc.ChannelCredentials;
    private client;
    /** See {@link https://github.com/senzing-garage/knowledge-base/blob/main/lists/senzing-component-ids.md} */
    public productId = "5052";

    constructor(parameters: SzAbstractFactoryOptions) {
        const { connectionString, credentials } = parameters;
        this.connectionString   = connectionString;
        this.credentials        = credentials !== undefined? credentials : grpc.credentials.createInsecure();

        if(this.connectionString) {
            this.client             = new SzDiagnosticClient(this.connectionString, this.credentials);
        }
    }
    /**
     * Performs inserts to determine rate of insertion.
     * @param secondsToRun Duration of the test in seconds.
     * @returns {Promise<CHECK_DATASTORE_PERFORMANCE_RESPONSE | SzError>} A JSON document
     */
    checkDataStorePerformance(secondsToRun: number): Promise<CHECK_DATASTORE_PERFORMANCE_RESPONSE | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new CheckDatastorePerformanceRequest();
            request.setSecondstorun(secondsToRun);
            this.client.checkDatastorePerformance(request, (err, res: CheckDatastorePerformanceResponse) => {
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                let result = JSON.parse(res.getResult()) as CHECK_DATASTORE_PERFORMANCE_RESPONSE;
                //console.log("RESPONSE:\n\r", result, res.getResult().toString());
                resolve(result);
            });
        });
    }
    /**
     * Returns details of the datastore currently in use by Senzing.
     * @returns {Promise<string | SzError>}
     */
    getDatastoreInfo(): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new GetDatastoreInfoRequest();
            this.client.getDatastoreInfo(request, (err, res: GetDatastoreInfoResponse) => {
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                let result = res.getResult();
                //console.log("RESPONSE:\n\r", result);
                resolve(result);
            });
        });
    }
    /**
     * Returns diagnostic information of a feature. Not recommended for use.
     * @experimental
     * @param featureId The identifier of the feature to describe.
     * @returns {Promise<string | SzError>} A string containing a JSON document
     */
    getFeature(featureId: number): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new GetFeatureRequest();
            request.setFeatureid(featureId);
            this.client.getFeature(request, (err, res: GetFeatureResponse) => {
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                let result = res.getResult();
                //console.log("RESPONSE:\n\r", result);
                resolve(result);
            });
        });
    }
    /**
     * Removes every record in the Senzing repository.
     * @returns {Promise<undefined | SzError>} for async flow control.
     */
    purgeRepository(): Promise<undefined | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new PurgeRepositoryRequest();
            this.client.purgeRepository(request, (err, res: PurgeRepositoryResponse) => {
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
     * Not intended for external use but not explicitly private either.
     * @internal
     * @param configId 
     */
    reinitialize(configId: number): Promise<undefined | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new ReinitializeRequest();
            request.setConfigid(configId);
            this.client.reinitialize(request, (err, res: ReinitializeResponse) => {
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
}