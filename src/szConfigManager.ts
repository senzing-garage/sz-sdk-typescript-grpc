import * as grpc from '@grpc/grpc-js';
import { AddConfigRequest, AddConfigResponse, GetConfigRequest, GetConfigResponse, GetConfigsRequest, GetDefaultConfigIdRequest, GetDefaultConfigIdResponse, ReplaceDefaultConfigIdRequest, ReplaceDefaultConfigIdResponse, SetDefaultConfigIdRequest, SetDefaultConfigIdResponse} from './szconfigmanager/szconfigmanager_pb';
import { SzConfigManagerClient } from './szconfigmanager/szconfigmanager_grpc_pb';
import { SzAbstractConfigManager } from './abstracts/szAbstractConfigManager';
import { SzAbstractFactoryOptions } from './szfactorycreator/szFactoryCreator';
import { newException } from './szHelpers';
import { SzError, SzNoGrpcConnectionError } from './senzing/SzError';

// --------------- user facing "grpc.SzConfigManager" inheriting from SzAbstractConfigManager

/**
 * SzConfigManager class.
 * 
 * @name SzConfigManager
 * @class
 */
export class SzConfigManager implements SzAbstractConfigManager {
    private connectionString: string;
    private credentials: grpc.ChannelCredentials;
    private client;
    /** See {@link https://github.com/senzing-garage/knowledge-base/blob/main/lists/senzing-component-ids.md} */
    public productId = "5051";

    /**
     * Adds a Senzing configuration JSON document to the Senzing database.
     * @param configDefinition The Senzing configuration JSON document.
     * @returns {Promise<number | SzError>} A configuration identifier as Promise<number>.
     */
    addConfig(configDefinition: string): Promise<number | SzError> | undefined {
        return new Promise<number | SzError>((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
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
    /**
     * Retrieves a specific Senzing configuration JSON document from the Senzing database.
     * @param configId The configuration identifier of the desired Senzing Engine configuration JSON document to retrieve.
     * @returns {Promise<string>} JSON document containing the Senzing configuration.
     */
    getConfig(configId: number): Promise<string | SzError> | undefined {
        return new Promise<string | SzError>((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
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
    /**
     * Retrieves a list of Senzing configurations from the Senzing database.
     * @returns {Promise<string>} JSON document containing Senzing configurations.
     */
    getConfigs(): Promise<string | SzError> {
        return new Promise<string | SzError>((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
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
    /**
     * Retrieves from the Senzing database the configuration identifier of the default Senzing configuration.
     * @returns {Promise<number>} identifier which identifies the current configuration in use.
     */
    getDefaultConfigId(): Promise<number | SzError> | undefined {
        return new Promise<number | SzError>((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
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
    /**
     * Replaces and sets a new configuration identifier in the Senzing database. 
     * To serialize modifying of the configuration identifier, 
     * 
     * @see replaceDefaultConfigId
     * @param configId The configuration identifier of the Senzing Engine configuration to use as the default.
     * @returns {Promise<undefined | SzError>} for async flow control
     */
    setDefaultConfigId(configId: number): Promise<undefined | SzError> | undefined {
        return new Promise<undefined | SzError>((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new SetDefaultConfigIdRequest();
            request.setConfigid(configId);
            this.client.setDefaultConfigId(request, (err, res: SetDefaultConfigIdResponse) => {
                if(err) {
                    let _err = newException(err.details);
                    reject(_err);
                    throw _err;
                    return;
                }
                //console.log("RESPONSE:\n\r", result);
            });
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
    /**
     * Replaces the old configuration identifier with a new configuration identifier 
     * in the Senzing database. It is like a “compare-and-swap” instruction to serialize 
     * concurrent editing of configuration. If {@param currentDefaultConfigId} is no longer 
     * the “current configuration identifier”, the operation will fail. To simply set 
     * the default configuration ID, use {@link module:SzConfigManager#setSefaultConfigId}.
     * 
     * @param currentDefaultConfigId The configuration identifier to replace.
     * @param newDefaultConfigId  The configuration identifier to use as the default.
     * @returns {Promise<undefined>} for async flow control
     */
    replaceDefaultConfigId(currentDefaultConfigId: number, newDefaultConfigId: number) {
        return new Promise<string>((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
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
            });
        });
    }
}