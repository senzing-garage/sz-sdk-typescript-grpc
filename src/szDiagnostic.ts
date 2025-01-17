import * as grpc from '@grpc/grpc-js';
import { CheckDatastorePerformanceRequest, CheckDatastorePerformanceResponse, GetDatastoreInfoRequest, GetDatastoreInfoResponse, GetFeatureRequest, GetFeatureResponse, PurgeRepositoryRequest, PurgeRepositoryResponse, ReinitializeRequest, ReinitializeResponse } from './szdiagnostic/szdiagnostic_pb';
import { SzDiagnosticClient } from './szdiagnostic/szdiagnostic_grpc_pb';
import { SzAbstractDiagnostic } from './abstracts/szAbstractDiagnostic';
import { SzAbstractFactoryOptions } from './szfactorycreator/szFactoryCreator';
import { newException } from './szHelpers';
import { SzError } from './senzing/SzError';
import { CHECK_DATASTORE_PERFORMANCE_RESPONSE } from './types/szDiagnostic';

// --------------- user facing "grpc.SzDiagnostic" inheriting from SzAbstractDiagnostic

/**
 * SzDiagnostic class.
 * 
 * @todo add error surface
 * @todo add logging
 */
export class SzDiagnostic implements SzAbstractDiagnostic {
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
            this.client             = new SzDiagnosticClient(this.connectionString, this.credentials);
        }
    }

    checkDataStorePerformance(secondsToRun: number): Promise<CHECK_DATASTORE_PERFORMANCE_RESPONSE | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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
    getDatastoreInfo(): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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
    getFeature(featureId: number): Promise<string | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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
    purgeRepository(): Promise<undefined | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
                return;
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
    reinitialize(configId: number): Promise<undefined | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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