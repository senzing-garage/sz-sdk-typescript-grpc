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

// -------------- sane defaults for initializing when arguments not provided --------------
/** default connection string to initialize with if none provided */
export const DEFAULT_CONNECTION_STRING: string = `0.0.0.0:8261`;
/** default channel credentials to initialize with if none provided */
export const DEFAULT_CREDENTIALS = grpc.credentials.createInsecure();
/** defualt channel options if none provided 
* @see https://github.com/grpc/grpc/blob/618a3f561d4a93f263cca23abad086ed8f4d5e86/include/grpc/impl/codegen/grpc_types.h#L142 
*/
export const DEFAULT_CHANNEL_OPTIONS = {
    "grpc.keepalive_time_ms": 1500,
    "grpc.keepalive_timeout_ms": 3000,
    "grpc.client_idle_timeout_ms": 5000
}
/** default time in seconds to wait for connection/reconnection to service(s) */
export const DEFAULT_CONNECTION_READY_TIMEOUT = 1;

/** @group SzGrpcEnvironment */
export interface SzGrpcEnvironmentOptions extends SzEnvironmentOptions { 
    /** the grpc connection string. `${HOST}:${PORT}` */
    connectionString?: string, 
    /** 
     * channel credentials to use for authentication. defaults to "grpc.credentials.createInsecure()"
     * @see https://grpc.io/docs/guides/auth/
     */
    credentials?: grpc.ChannelCredentials,
    /** @see https://github.com/grpc/grpc/blob/618a3f561d4a93f263cca23abad086ed8f4d5e86/include/grpc/impl/codegen/grpc_types.h#L142 */
    grpcOptions?: grpc.ChannelOptions,
    /** 
     * this will be an instance of any of the Senzing grpc client modules generated from the protoc 
     * This will be overriden in the derived class with the specific client type that applies to that class 
    */
    client?: any,
    /** the amount to wait in seconds before giving up on establishing a connection to the grpc server */
    grpcConnectionReadyTimeOut?: number,
    /** used for CI testing 
     * @ignore
    */
    isTestEnvironment?: boolean
}

// ----- concrete options with options only accepting the correct type of client
// ----- that matches the class being instantiated
/**
 * SzGrpcEnvironment
 * Creates a new Senzing Environment instance for use with creating and calling the gRpc modules 
 * and methods.
 * @group SzGrpcEnvironment
 */
export class SzGrpcEnvironment extends SzEnvironment {

    // ---------------- private properties used in public read-only getters ----------------
    /** 
     * instance of {@link SzGrpcConfig}.
     * autocreated when user calls {@link getConfig} on first attempt.
     * @ignore
    */
    protected _config: SzGrpcConfig | undefined;
    /** 
     * instance of {@link SzGrpcConfigManager}.
     * autocreated when user calls {@link getConfigManager} on first attempt.
     * @ignore
    */
    protected _configManager: SzGrpcConfigManager | undefined;
    /** 
     * instance of {@link SzGrpcDiagnostic}.
     * autocreated when user calls {@link getDiagnostic} on first attempt.
     * @ignore
    */
    protected _diagnostic: SzGrpcDiagnostic | undefined;
    /** 
     * instance of {@link SzGrpcEngine}
     * autocreated when user calls {@link getEngine} on first attempt.
     * @ignore
    */
    protected _engine: SzGrpcEngine | undefined;
    /** 
     * instance of {@link SzGrpcProduct}.
     * autocreated when user calls {@link getProduct} on first attempt.
     * @ignore
    */
    protected _product: SzGrpcProduct | undefined;
    
    // ------------------------------ grpc specific properties -----------------------------
    /** the grpc connection string. `${HOST}:${PORT}` 
     * @ignore */
    private _connectionString: string             = DEFAULT_CONNECTION_STRING;
    /** 
     * channel credentials to use for authentication. defaults to "grpc.credentials.createInsecure()"
     * @see https://grpc.io/docs/guides/auth/
     * @ignore */
    private _credentials: grpc.ChannelCredentials = DEFAULT_CREDENTIALS;
    /** 
     * @see https://github.com/grpc/grpc/blob/618a3f561d4a93f263cca23abad086ed8f4d5e86/include/grpc/impl/codegen/grpc_types.h#L142 
     * @ignore
    */
    private _grpcOptions: grpc.ChannelOptions     = DEFAULT_CHANNEL_OPTIONS;
    /** 
     * instance of the gRPC client used for connecting to services in {@link SzGrpcConfig}.
     * autocreated when user calls {@link getConfig} on first attempt.
     * @ignore
    */
    private _configClient: SzConfigClient | undefined;
    /** 
     * instance of the gRPC client used for connecting to services in {@link SzGrpcConfigManager}.
     * autocreated when user calls {@link getConfigManager} on first attempt.
     * @ignore
    */
    private _configManagerClient: SzConfigManagerClient | undefined; 
    /** 
     * instance of the gRPC client used for connecting to services in {@link SzGrpcDiagnostic}.
     * autocreated when user calls {@link getDiagnostic} on first attempt.
     * @ignore
    */
    private _diagnosticClient: SzDiagnosticClient | undefined; 
    /** 
     * instance of the gRPC client used for connecting to services in {@link SzGrpcEngine}.
     * autocreated when user calls {@link getEngine} on first attempt.
     * @ignore
    */
    private _engineClient: SzEngineClient | undefined; 
    /** 
     * instance of the gRPC client used for connecting to services in {@link SzGrpcProduct}.
     * autocreated when user calls {@link getProduct} on first attempt.
     * @ignore
    */
    private _productClient: SzProductClient | undefined;

    // ----------------------------- lazy getters (read only) ------------------------------
    // --------------------------- will lazy load on first access --------------------------
    /** 
     * Gets the currently active configuration ID for the {@link SzGrpcEnvironment}.
     * 
     * @return {Promise<number>} The currently active configuration ID.
    */
    public getActiveConfigId() {
        return this.engine.getActiveConfigId();
    }

    /** 
     * instance of {@link SzGrpcConfig}.
     * autocreates the class instance on first call if not already created.
     * @return {SzGrpcConfig}
    */
    public getConfig() {
        if(!this._config || !this._configClient) {
            // create new grpc client
            if(!this._configClient) this._configClient = new SzConfigClient(this.connectionString, this.credentials, this._grpcOptions);

            // create new config manager with ref to client
            if(!this._config) this._config = new SzGrpcConfig({ client: this._configClient, grpcOptions: this._grpcOptions });
        }
        return this._config;
    }
    /** 
     * instance of {@link SzGrpcConfigManager}.
     * autocreates the class instance on first call if not already created.
     * @return {SzGrpcConfigManager}
    */
    public getConfigManager() {
        if(!this._configManager || !this._configManagerClient) {
            // create new grpc client
            if(!this._configManagerClient) this._configManagerClient = new SzConfigManagerClient(this.connectionString, this.credentials, this._grpcOptions );

            // create new config manager with ref to client
            if(!this._configManager) this._configManager = new SzGrpcConfigManager({ client: this._configManagerClient, grpcOptions: this._grpcOptions });
        }
        return this._configManager;
    }
    /** 
     * instance of {@link SzGrpcDiagnostic}.
     * autocreates the class instance on first call if not already created.
     * @return {SzGrpcDiagnostic}
    */
    public getDiagnostic() {
        if(!this._diagnostic || !this._diagnosticClient) {
            // create new grpc client
            if(!this._diagnosticClient) this._diagnosticClient = new SzDiagnosticClient(this.connectionString, this.credentials, this._grpcOptions);

            // create new diagnostic with ref to client
            if(!this._diagnostic) this._diagnostic = new SzGrpcDiagnostic({ client: this._diagnosticClient, grpcOptions: this._grpcOptions });
        }
        return this._diagnostic;
    }
    /** 
     * instance of {@link SzGrpcEngine}.
     * autocreates the class instance on first call if not already created.
     * @return {SzGrpcDiagnostic}
    */
    public getEngine() {
        if(!this._engine || !this._engineClient) {
            // create new grpc client
            if(!this._engineClient) this._engineClient = new SzEngineClient(this.connectionString, this.credentials, this._grpcOptions);

            // create new engine with ref to client
            if(!this._engine) this._engine = new SzGrpcEngine({ client: this._engineClient, grpcOptions: this._grpcOptions });
        }
        return this._engine;
    }
    /** 
     * instance of {@link SzGrpcDiagnostic}.
     * autocreates the class instance on first call if not already created.
     * @return {SzGrpcDiagnostic}
    */
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
    /** 
     * the grpc connection string. `${HOST}:${PORT}` 
     * @readonly
     */
    public get connectionString() {
        return this._connectionString;
    }
    /** 
     * channel credentials to use for authentication. defaults to "grpc.credentials.createInsecure()"
     * @see https://grpc.io/docs/guides/auth/
     * @readonly
     */
    public get credentials() {
        return this._credentials;
    }
    public get grpcOptions() {
        return this._grpcOptions;
    }
    /** 
     * getter alias of {@link getConfig}.  Syntax sugar for using {@link getConfig} as if it were a property ie `MySenzingEnvironment.config.createConfig()`.
     * @return {SzGrpcConfig}
    */
    public get config() {
        return this.getConfig();
    }
    /** 
     * getter alias of {@link getConfigManager}.  Syntax sugar for using {@link getConfigManager} as if it were a property ie `MySenzingEnvironment.configManager.getDefaultConfigId()`.
     * @return {SzGrpcConfigManager}
    */
    public get configManager() {
        return this.getConfigManager();
    }
    /** 
     * getter alias of {@link getDiagnostic}.  Syntax sugar for using {@link getDiagnostic} as if it were a property ie `MySenzingEnvironment.diagnostic.getDatastoreInfo()`.
     * @return {SzGrpcDiagnostic}
    */
    public get diagnostic() {
        return this.getDiagnostic();
    }
    /** 
     * getter alias of {@link getEngine}.  Syntax sugar for using {@link getEngine} as if it were a property ie `MySenzingEnvironment.engine.getActiveConfigId()`.
     * @return {SzGrpcEngine}
    */
    public get engine() {
        return this.getEngine();
    }
    /** 
     * getter alias of {@link getProduct}.  Syntax sugar for using {@link getProduct} as if it were a property ie `MySenzingEnvironment.product.getVersion()`.
     * @return {SzGrpcProduct}
    */
    public get product() {
        return this.getProduct();
    }
    // --------------------------------- end alias getters --------------------------------


    constructor(parameters: SzGrpcEnvironmentOptions) {
        super(parameters);

        // store grpc specific connection params for lazy client init
        // in getters
        const { connectionString, credentials, grpcOptions } = parameters;
        if(connectionString)    this._connectionString   = connectionString;
        if(credentials)         this._credentials        = credentials ;
        if(grpcOptions)         this._grpcOptions        = grpcOptions ;
    }
    /**
     * Reinitializes the {@link SzGrpcEngine} with the specified configuration ID.
     * Used by {@link SzGrpcEnvironment}. Not intended to be called directly by end-users.
     * 
     * @param configId 
     * @ignore
    */
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