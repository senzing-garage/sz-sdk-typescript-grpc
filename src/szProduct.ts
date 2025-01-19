import * as grpc from '@grpc/grpc-js';
import { GetVersionRequest, GetVersionResponse, GetLicenseRequest, GetLicenseResponse } from './szproduct/szproduct_pb';
import { SzProductClient } from './szproduct/szproduct_grpc_pb';
import { SzAbstractProduct } from './abstracts/szAbstractProduct';
import { SzAbstractFactoryOptions } from './szfactorycreator/szFactoryCreator';
import { SzError, SzNoGrpcConnectionError } from './senzing/SzError';

// --------------- user facing "grpc.SzProduct" inheriting from SzAbstractProduct

/**
 * SzProduct
 * 
 * @class
 * @name SzProduct
 */
export class SzProduct implements SzAbstractProduct {
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
            this.client             = new SzProductClient(this.connectionString, this.credentials);
        }
    }
    /**
     * Retrieves information about the currently used license.
     * @returns {Promise<{[key: string]: any} | SzError>} JSON document containing Senzing license metadata.
     */
    getLicense(): Promise<{[key: string]: any} | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new GetLicenseRequest();
            this.client.getLicense(request, (err, res: GetLicenseResponse) => {
                if(err) {
                    reject(err)
                    return;
                }
                let result = JSON.parse(res.getResult());
                //console.log("RESPONSE:\n\r", result);
                resolve(result);
            });
        });
    }
    /**
     * Returns the version of Senzing.
     * @returns {Promise<{[key: string]: any} | SzError>} JSON document containing metadata about the Senzing Engine version being used.
     */
    getVersion(): Promise<{[key: string]: any} | SzError> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new GetVersionRequest();
            this.client.getVersion(request, (err, res: GetVersionResponse) => {
                if(err) {
                    reject(err)
                    return;
                }
                let result = JSON.parse(res.getResult());
                //console.log("RESPONSE:\n\r", result);
                resolve(result);
            });
        });
    }
}