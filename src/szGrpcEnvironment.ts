import * as grpc from '@grpc/grpc-js';
import { SzEnvironment, SzEnvironmentOptions } from './abstracts/szEnviroment';
import { SzGrpcConfig } from './szGrpcConfig';
import { SzConfigClient } from './szconfig/szconfig_grpc_pb';
import { SzGrpcConfigManager } from './szGrpcConfigManager';
import { SzConfigManagerClient } from './szconfigmanager/szconfigmanager_grpc_pb';
import { SzGrpcDiagnostic } from './szGrpcDiagnostic';
import { SzDiagnosticClient } from './szdiagnostic/szdiagnostic_grpc_pb';
import { SzGrpcEngine } from './szGrpcEngine';
import { SzEngineClient } from './szengine/szengine_grpc_pb';
import { SzGrpcProduct } from './szGrpcProduct';
import { SzProductClient } from './szproduct/szproduct_grpc_pb';

export const DEFAULT_CONNECTION_STRING: string = `0.0.0.0:8261`;
export const DEFAULT_CREDENTIALS = grpc.credentials.createInsecure();
export const DEFAULT_CHANNEL_OPTIONS = {
    "grpc.keepalive_time_ms": 1500,
    "grpc.keepalive_timeout_ms": 1500,
    "grpc.client_idle_timeout_ms": 1500
}
export const DEFAULT_CONNECTION_READY_TIMEOUT = 1000;

export interface SzGrpcEnvironmentOptions extends SzEnvironmentOptions { 
    connectionString?: string, 
    credentials?: grpc.ChannelCredentials,
    grpcOptions?: grpc.ChannelOptions,
    client?: any,
    grpcConnectionReadyTimeOut?: number
}

// ----- concrete options with options only accepting the correct type of client
// ----- that matches the class being instantiated

// from grpc package
export class SzGrpcEnvironment extends SzEnvironment {

    // ---------------- private properties used in public read-only getters ----------------
    protected _config: SzGrpcConfig | undefined;
    protected _configManager: SzGrpcConfigManager | undefined;
    protected _diagnostic: SzGrpcDiagnostic | undefined;
    protected _engine: SzGrpcEngine | undefined;
    protected _product: SzGrpcProduct | undefined;
    
    // ------------------------------ grpc specific properties -----------------------------
    private _connectionString: string             = DEFAULT_CONNECTION_STRING;
    private _credentials: grpc.ChannelCredentials = DEFAULT_CREDENTIALS;
    private _grpcOptions: grpc.ChannelOptions     = DEFAULT_CHANNEL_OPTIONS;
    private _configClient: SzConfigClient | undefined; 
    private _configManagerClient: SzConfigManagerClient | undefined; 
    private _diagnosticClient: SzDiagnosticClient | undefined; 
    private _engineClient: SzEngineClient | undefined; 
    private _productClient: SzProductClient | undefined;

    // ----------------------------- lazy getters (read only) ------------------------------
    // --------------------------- will lazy load on first access --------------------------
    public getConfig() {
        if(!this._config || !this._configClient) {
            // create new grpc client
            if(!this._configClient) this._configClient = new SzConfigClient(this.connectionString, this.credentials, this._grpcOptions);

            // create new config manager with ref to client
            if(!this._config) this._config = new SzGrpcConfig({ client: this._configClient, grpcOptions: this._grpcOptions });
        }
        return this._config;
    }
    public getConfigManager() {
        if(!this._configManager || !this._configManagerClient) {
            // create new grpc client
            if(!this._configManagerClient) this._configManagerClient = new SzConfigManagerClient(this.connectionString, this.credentials, this._grpcOptions );

            // create new config manager with ref to client
            if(!this._configManager) this._configManager = new SzGrpcConfigManager({ client: this._configManagerClient, grpcOptions: this._grpcOptions });
        }
        return this._configManager;
    }
    public getDiagnostic() {
        if(!this._diagnostic || !this._diagnosticClient) {
            // create new grpc client
            if(!this._diagnosticClient) this._diagnosticClient = new SzDiagnosticClient(this.connectionString, this.credentials, this._grpcOptions);

            // create new diagnostic with ref to client
            if(!this._diagnostic) this._diagnostic = new SzGrpcDiagnostic({ client: this._diagnosticClient, grpcOptions: this._grpcOptions });
        }
        return this._diagnostic;
    }
    public getEngine() {
        if(!this._engine || !this._engineClient) {
            // create new grpc client
            if(!this._engineClient) this._engineClient = new SzEngineClient(this.connectionString, this.credentials, this._grpcOptions);

            // create new engine with ref to client
            if(!this._engine) this._engine = new SzGrpcEngine({ client: this._engineClient, grpcOptions: this._grpcOptions });
        }
        return this._engine;
    }
    public getProduct() {
        if(!this._product || !this._productClient) {
            // create new grpc client
            if(!this._productClient) this._productClient = new SzProductClient(this.connectionString, this.credentials, this._grpcOptions);

            // create new product with ref to client
            if(!this._product) this._product = new SzGrpcProduct({ client: this._productClient, grpcOptions: this._grpcOptions });
        }
        return this._product;
    }

    // -------------------------------- start alias getters --------------------------------
    public get connectionString() {
        return this._connectionString;
    }
    public set connectionString(value: string) {
        let oldValue = this._connectionString;
        if(value !== oldValue) {
            this._connectionString = value;

            // update any existing client connections
            if(this._configClient) {
                this._configClient = new SzConfigClient(this.connectionString, this.credentials, this._grpcOptions);
                if(this._config) {
                    this._config.client = this._configClient;
                }
            }
        }
        this._connectionString = value;
    }
    public get credentials() {
        return this._credentials;
    }
    public set credentials(value) {
        let oldValue = this._credentials;
        if(value !== oldValue) {
            // update any existing client connections
        }
        this._credentials = value;
    }
    public get grpcOptions() {
        return this._grpcOptions;
    }
    public set grpcOptions(value) {
        let oldValue = this._grpcOptions;
        if(JSON.stringify(oldValue) !== JSON.stringify(value)) {
            // grpc option(s) have changed, reinit client connectsion
        }
        this._grpcOptions = value;
    }
    public get config() {
        return this.getConfig();
    }
    public get configManager() {
        return this.getConfigManager();
    }
    public get diagnostic() {
        return this.getDiagnostic();
    }
    public get engine() {
        return this.getEngine();
    }
    public get product() {
        return this.getProduct();
    }
    // --------------------------------- end alias getters --------------------------------


    constructor(parameters: SzGrpcEnvironmentOptions) {
        super(parameters);

        // store grpc specific connection params for lazy client init
        // in getters
        const { connectionString, credentials, grpcOptions } = parameters;
        if(connectionString)    this.connectionString   = connectionString;
        if(credentials)         this.credentials        = credentials ;
        if(grpcOptions)         this.grpcOptions        = grpcOptions ;
    }

    public reinitialize(configId: number) {

        if(this._diagnostic) {
            this._diagnosticClient?.close
            this._diagnostic.reinitialize(configId);
        }
        if(this._engine) {
            this._engine.reinitialize(configId);
        }
        /*
        if(!this._engine) {
            throw new Error(`no engine instance to reinitialize`);
        }
        if(!this._diagnostic) {
            throw new Error(`no diagnostic instance to reinitialize`);
        }*/
    }
}