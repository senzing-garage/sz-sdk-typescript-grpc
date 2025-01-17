import * as grpc from '@grpc/grpc-js';
import { AddConfigRequest, AddConfigResponse, GetConfigRequest, GetConfigResponse, GetConfigsRequest, GetDefaultConfigIdRequest, GetDefaultConfigIdResponse, ReplaceDefaultConfigIdRequest, ReplaceDefaultConfigIdResponse, SetDefaultConfigIdRequest, SetDefaultConfigIdResponse} from './szconfigmanager/szconfigmanager_pb';
import { SzConfigManagerClient } from './szconfigmanager/szconfigmanager_grpc_pb';
import { SzAbstractConfigManager } from './abstracts/szAbstractConfigManager';
import { SzAbstractFactoryOptions } from './szfactorycreator/szFactoryCreator';
import { newException } from './szHelpers';
import { SzError } from './senzing/SzError';

// --------------- user facing "grpc.SzConfigManager" inheriting from SzAbstractConfigManager

/**
 * SzConfigManager class.
 * 
 * @todo add error surface
 * @todo add logging
 */
export class SzConfigManager implements SzAbstractConfigManager {
    private connectionString: string;
    private credentials: grpc.ChannelCredentials;
    private client;
    /** See {@link https://github.com/senzing-garage/knowledge-base/blob/main/lists/senzing-component-ids.md} */
    public productId = "5051";

    getConfigs(): Promise<string | SzError> {
        return new Promise<string | SzError>((resolve, reject) => {
            if(!this.client){
                throw new Error('no connection present');
            }

            const request = new GetConfigsRequest();
            this.client.getConfigs(request, (err, res: GetConfigResponse) => {
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                //console.log("RESPONSE:\n\r", result);
                resolve(res.getResult());
            });
            return undefined;
        });
    }
    getDefaultConfigId(): Promise<number | SzError> | undefined {
        return new Promise<number | SzError>((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
                return
            }
            const request = new GetDefaultConfigIdRequest();
            this.client.getDefaultConfigId(request, (err, res: GetDefaultConfigIdResponse) => {
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return
                }
                //console.log("RESPONSE:\n\r", result);
                resolve( res.getResult() );
            });

            return -1;
        });
    }
    setDefaultConfigId(configId: number): void {
        if(!this.client){
            throw new Error('no connection present');
        }
        const request = new SetDefaultConfigIdRequest();
        request.setConfigid(configId);
        this.client.setDefaultConfigId(request, (err, res: SetDefaultConfigIdResponse) => {
            if(err) {
                throw newException(err.details);
                return;
            }
            //console.log("RESPONSE:\n\r", result);
        });
    }

    constructor(parameters: SzAbstractFactoryOptions) {
        const { connectionString, credentials } = parameters;
        this.connectionString   = connectionString;
        this.credentials        = credentials !== undefined? credentials : grpc.credentials.createInsecure();

        if(this.connectionString) {
            this.client             = new SzConfigManagerClient(this.connectionString, this.credentials);
        }
    }

    addConfig(configDefinition: string): Promise<number | SzError> | undefined {
        return new Promise<number | SzError>((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
                return
            }
            const request = new AddConfigRequest();
            this.client.addConfig(request, (err, res: AddConfigResponse) => {
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return
                }
                //console.log("RESPONSE:\n\r", result);
                resolve( res.getResult() );
            });
        });
    }
    getConfig(configId: number): Promise<string | SzError> | undefined {
        return new Promise<string | SzError>((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
                return
            }
            const request = new GetConfigRequest();
            request.setConfigid(configId);
            this.client.getConfig(request, (err, res: GetConfigResponse) => {
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return
                }
                //console.log("RESPONSE:\n\r", result);
                resolve( res.getResult() );
            });
        });
    }
    replaceDefaultConfigId(currentDefaultConfigId: number, newDefaultConfigId: number) {
        return new Promise<string>((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
                return
            }
            const request = new ReplaceDefaultConfigIdRequest();
            request.setCurrentdefaultconfigid(currentDefaultConfigId);
            request.setNewdefaultconfigid(newDefaultConfigId);
            this.client.replaceDefaultConfigId(request, (err, res: ReplaceDefaultConfigIdResponse) => {
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return
                }
                //console.log("RESPONSE:\n\r", result);
                //resolve( res.getResult() );
            });
        });
    }
}