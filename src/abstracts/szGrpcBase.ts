import * as grpc from '@grpc/grpc-js';
import { SzError, SzNoGrpcConnectionError } from '../senzing/SzError';
import { DEFAULT_CHANNEL_OPTIONS, DEFAULT_CONNECTION_READY_TIMEOUT, DEFAULT_CONNECTION_STRING, DEFAULT_CREDENTIALS, SzGrpcEnvironmentOptions } from '../szGrpcEnvironment';

export abstract class SzGrpcBase {
    /** @ignore */
    abstract client: any;

    /** metadata passed to the request context 
     * @ignore
    */
    protected _metadata: grpc.Metadata    = new grpc.Metadata({waitForReady: true});

    private grpcOptions                 = DEFAULT_CHANNEL_OPTIONS; 
    public grpcConnectionReadyTimeOut   = DEFAULT_CONNECTION_READY_TIMEOUT;

    protected getDeadlineFromNow(secondsFromNow?: number): Date {
        let retVal  = new Date();
        retVal.setSeconds(retVal.getSeconds() + (secondsFromNow ? secondsFromNow : this.grpcConnectionReadyTimeOut));
        return retVal;
    }

    /** 
     * Wait for the client to be ready. The callback will be called when the client has successfully connected to the server, and it will be called with an error if the attempt to connect to the server has unrecoverablly failed or if the deadline expires. This function will make the channel start connecting if it has not already done so. 
     */
    public waitForReady(deadline: Date, cb: (error: Error | null) => void) {
        return this.client?.waitForReady(deadline, cb);
    }

    constructor(options: SzGrpcEnvironmentOptions) {
        const { connectionString, credentials, client, grpcOptions, grpcConnectionReadyTimeOut } = options;
        
        if(grpcConnectionReadyTimeOut) {
            this.grpcConnectionReadyTimeOut = grpcConnectionReadyTimeOut;
        }
    }
}