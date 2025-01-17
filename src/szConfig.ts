import * as grpc from '@grpc/grpc-js';
import { AddDataSourceRequest, AddDataSourceResponse, CloseConfigRequest, CloseConfigResponse, CreateConfigRequest, CreateConfigResponse, DeleteDataSourceRequest, DeleteDataSourceResponse, ExportConfigRequest, ExportConfigResponse, GetDataSourcesRequest, GetDataSourcesResponse, ImportConfigRequest, ImportConfigResponse } from './szconfig/szconfig_pb';
import { SzConfigClient } from './szconfig/szconfig_grpc_pb';
import { SzAbstractConfig } from './abstracts/szAbstractConfig';
import { SzAbstractFactoryOptions } from './szfactorycreator/szFactoryCreator';
import { newException } from './szHelpers';
import { SzError } from './senzing/SzError';
import { ADD_DATASOURCE_RESPONSE } from './types/szConfig';

// --------------- user facing "grpc.SzConfig" inheriting from SzAbstractConfig

/**
 * SzConfig class.
 * 
 * @todo add error surface
 * @todo add logging
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

    addDataSource(configHandle: number, dataSourceCode: string) {
        return new Promise<ADD_DATASOURCE_RESPONSE | SzError>((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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
                let result = JSON.parse(res.getResult()) as unknown as ADD_DATASOURCE_RESPONSE;
                //console.log("RESPONSE:\n\r", result);
                resolve(result);
            });
        });
    }

    closeConfig(configHandle: number) {
        return new Promise<boolean | undefined>((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
                return
            }

            const request = new CloseConfigRequest();
            request.setConfighandle(configHandle);
            this.client.closeConfig(request, (err, res: CloseConfigResponse) => {
                if(err) {
                    reject( newException(err.details) )
                    return;
                }
                //console.log("RESPONSE:\n\r", result);
                resolve(true);
            });
        });
    }
    createConfig(): Promise<number | SzError> {
        return new Promise<number | SzError>((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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
    deleteDataSource(configHandle: number, dataSourceCode: string) {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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
    exportConfig(configHandle: number) {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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
                resolve(JSON.parse(res.getResult()));
            });
        });
    }
    getDataSources(configHandle: number) {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
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
    importConfig(configDefinition: string) {
        return new Promise((resolve, reject) => {
            if(!this.client){
                reject('no connection present');
                return
            }

            const request = new ImportConfigRequest();
            request.setConfigdefinition(configDefinition);
            this.client.importConfig(request, (err, res: ImportConfigResponse) => {
                if(err) {
                    reject( newException(err.details) )
                    return;
                }
                //console.log("RESPONSE:\n\r", result);
                resolve(res.getResult() as number);
            });
        });
    }
}