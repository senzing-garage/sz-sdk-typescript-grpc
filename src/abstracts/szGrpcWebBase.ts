import { SzError, SzNoGrpcConnectionError } from '../senzing/SzError';
import { DEFAULT_CHANNEL_OPTIONS, DEFAULT_CONNECTION_READY_TIMEOUT, DEFAULT_CONNECTION_STRING, DEFAULT_CREDENTIALS, SzGrpcWebEnvironmentOptions } from '../szGrpcWebEnvironment';

export abstract class SzGrpcWebBase {
    private grpcOptions                 = DEFAULT_CHANNEL_OPTIONS; 
    public grpcConnectionReadyTimeOut   = DEFAULT_CONNECTION_READY_TIMEOUT;

    protected getDeadlineFromNow(secondsFromNow?: number): Date {
        let retVal  = new Date();
        retVal.setSeconds(retVal.getSeconds() + (secondsFromNow ? secondsFromNow : this.grpcConnectionReadyTimeOut));
        return retVal;
    }

    constructor(options: SzGrpcWebEnvironmentOptions) {
        const { connectionString, credentials, client, grpcOptions, grpcConnectionReadyTimeOut } = options;
        
        if(grpcConnectionReadyTimeOut) {
            this.grpcConnectionReadyTimeOut = grpcConnectionReadyTimeOut;
        }
    }
}