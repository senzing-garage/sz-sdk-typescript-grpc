import * as grpc from '@grpc/grpc-js';
import { AddDataSourceRequest, AddDataSourceResponse, CloseConfigRequest, CloseConfigResponse, CreateConfigRequest, CreateConfigResponse, DeleteDataSourceRequest, DeleteDataSourceResponse, ExportConfigRequest, ExportConfigResponse, GetDataSourcesRequest, GetDataSourcesResponse, ImportConfigRequest, ImportConfigResponse } from './szconfig/szconfig_pb';
import { SzConfigClient } from './szconfig/szconfig_grpc_pb';
import { SzAbstractConfig } from './abstracts/szAbstractConfig';
import { SzAbstractFactoryOptions } from './szfactorycreator/szFactoryCreator';
import { newException } from './szHelpers';
import { SzError, SzNoGrpcConnectionError } from './senzing/SzError';
import { ADD_DATASOURCE_RESPONSE } from './types/szConfig';

/**
 * SzConfig
 * 
 * @class
 * @name SzConfig
 */
export class SzConfig implements SzAbstractConfig {
    private connectionString: string;
    private credentials: grpc.ChannelCredentials;
    private client;
    /** See {@link https://github.com/senzing-garage/knowledge-base/blob/main/lists/senzing-component-ids.md} */
    public productId = "5050";

    constructor(parameters: SzAbstractFactoryOptions) {
        const { connectionString, credentials } = parameters;
        this.connectionString   = connectionString;
        this.credentials        = credentials !== undefined? credentials : grpc.credentials.createInsecure();

        if(this.connectionString) {
            this.client             = new SzConfigClient(this.connectionString, this.credentials);
        }
    }
    /**
     * Adds a data source to an existing in-memory configuration.
     * @param configHandle An identifier of an in-memory configuration. Usually created by the {@link module:SzConfig#createConfig} or {@link module:SzConfig#importConfig} methods.
     * @param dataSourceCode Name of data source code to add.
     * @returns {Promise<string>} JSON document listing the newly created data source
     */
    addDataSource(configHandle: number, dataSourceCode: string) {
        return new Promise<string>((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }
            const request = new AddDataSourceRequest();
            request.setConfighandle(configHandle);
            request.setDatasourcecode(dataSourceCode);

            this.client.addDataSource(request, (err, res: AddDataSourceResponse) => {
                if(err) {
                    reject( newException(err.details) )
                    return;
                }
                let result = res.getResult();
                resolve(result);
            });
        });
    }
    /**
     * Cleans up the Senzing SzConfig object pointed to by the config_handle.
     * @param configHandle An identifier of an in-memory configuration. Usually created by the {@link module:SzConfig#createConfig} or {@link module:SzConfig#importConfig} methods.
     * @returns {Promise<undefined | SzError>} for async flow control.
     */
    closeConfig(configHandle: number) {
        return new Promise<boolean | undefined>((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }

            const request = new CloseConfigRequest();
            request.setConfighandle(configHandle);
            this.client.closeConfig(request, (err, res: CloseConfigResponse) => {
                if(err) {
                    reject( newException(err.details) )
                    return;
                }
                resolve(undefined);
            });
        });
    }
    /**
     * Creates an in-memory Senzing configuration from the g2config.json template configuration 
     * file located in the PIPELINE.RESOURCEPATH path. A handle is returned to identify 
     * the in-memory configuration. The handle is used by the {@link module:SzConfig#addDataSource}, 
     * {@link module:SzConfig#listDataSources}, {@link module:SzConfig#deleteDataSource}, 
     * and {@link module:SzConfig#exportConfig} methods. 
     * The handle is terminated by the {@link module:SzConfig#closeConfig} method.
     * @returns {Promise<number | SzError>} pointer to an in-memory Senzing configuration
     */
    createConfig(): Promise<number | SzError> {
        return new Promise<number | SzError>((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }

            const request = new CreateConfigRequest();
            this.client.createConfig(request, (err, res: CreateConfigResponse) => {
                if(err) {
                    reject( newException(err.details) );
                    return;
                }
                //console.log("RESPONSE:\n\r", result);
                resolve(res.getResult() as number);
            });
        });
    }
    /**
     * Removes a data source from an existing in-memory configuration.
     * @param configHandle An identifier of an in-memory configuration. Usually created by the {@link module:SzConfig#createConfig} 
     * or {@link module:SzConfig#load} methods.
     * @param dataSourceCode Name of data source code to delete.
     * @returns {Promise<undefined | SzError>} for async flow control
     */
    deleteDataSource(configHandle: number, dataSourceCode: string) {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }

            const request = new DeleteDataSourceRequest();
            request.setConfighandle(configHandle);
            request.setDatasourcecode(dataSourceCode);

            this.client.deleteDataSource(request, (err, res: DeleteDataSourceResponse) => {
                if(err) {
                    reject( newException(err.details) )
                    return;
                }
                //console.log("RESPONSE:\n\r", result);
                resolve(true);
            });
        });
    }
    /**
     * Creates a JSON string representation of the Senzing SzConfig object.
     * @param configHandle  An identifier of an in-memory configuration. Usually created by the {@link module:SzConfig#createConfig} or {@link module:SzConfig#importConfig} methods.
     * @returns {Promise<string>} containing a JSON Document representation of the Senzing SzConfig object.
     */
    exportConfig(configHandle: number) {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }

            const request = new ExportConfigRequest();
            request.setConfighandle(configHandle);
            this.client.exportConfig(request, (err, res: ExportConfigResponse) => {
                if(err) {
                    reject( newException(err.details) )
                    return;
                }
                //console.log("RESPONSE:\n\r", result);
                resolve(res.getResult());
            });
        });
    }
    /**
     * Returns a JSON document of data sources contained in an in-memory configuration.
     * @param configHandle An identifier of an in-memory configuration. Usually created by the {@link module:SzConfig#createConfig} or {@link module:SzConfig#importConfig} methods.
     * @returns {Promise<string[]>} containing a JSON document listing all of the data sources.
     */
    getDataSources(configHandle: number): Promise<string[]> {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }

            const request = new GetDataSourcesRequest();
            request.setConfighandle(configHandle);
            this.client.getDataSources(request, (err, res: GetDataSourcesResponse) => {
                if(err) {
                    reject( newException(err.details) )
                    return;
                }
                //console.log("RESPONSE:\n\r", result);
                resolve(JSON.parse(res.getResult()));
            });
        });
    }
    /**
     * Initializes an in-memory Senzing SzConfig object from a 
     * JSON string. A handle is returned to identify the in-memory configuration. 
     * The handle is used by the {@link module:SzConfig#addDataSource}, {@link module:SzConfig#getDataSources}, 
     * {@link module:SzConfig#deleteDataSource}, and {@link module:SzConfig#save} methods. 
     * The handle is terminated by the {@link module:SzConfig#close} method.
     * @param configDefinition 
     * @returns {Promise<number>}
     */
    importConfig(configDefinition: string) {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject(new SzNoGrpcConnectionError());
                return
            }

            const request = new ImportConfigRequest();
            request.setConfigdefinition(configDefinition);
            this.client.importConfig(request, (err, res: ImportConfigResponse) => {
                if(err) {
                    reject( newException(err.details) )
                    return;
                }
                resolve(res.getResult() as number);
            });
        });
    }
}