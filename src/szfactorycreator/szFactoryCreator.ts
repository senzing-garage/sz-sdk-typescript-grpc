import * as grpc from '@grpc/grpc-js';
//import { SzProduct } from '../szProduct';
import { SzAbstractProduct } from '../abstracts/szAbstractProduct';
import { SzAbstractFactory as SzAbstractFactoryAbstract } from '../abstracts/szAbstractFactory';
import { SzProduct as SzProductGrpc } from '../szProduct';
import { SzConfig as SzConfigGrpc } from '../szConfig';
import { SzConfigManager as SzConfigManagerGrpc } from '../szConfigManager';
import { SzDiagnostic as SzDiagnosticGrpc } from '../szDiagnostic';
import { SzEngine as SzEngineGrpc } from '../szEngine';

// from "https://github.com/senzing-garage/sz-sdk-python/blob/main/src/senzing/szabstractfactory.py"
export interface SzAbstractFactoryOptions { 
    connectionString: string, 
    credentials?: grpc.ChannelCredentials
}

// from grpc package
export class SzAbstractFactory extends SzAbstractFactoryAbstract{
    //private channel: grpc.Channel = undefined;
    private connectionStr: string;

    constructor(connectionString: string) {
        // create gRPC client connection
        super();
        this.connectionStr = connectionString;
    }

    public createConfig(): SzConfigGrpc {
        return new SzConfigGrpc({ connectionString: this.connectionStr })
    }
    public createConfigManager(): SzConfigManagerGrpc {
        return new SzConfigManagerGrpc({ connectionString: this.connectionStr });
    }
    public createDiagnostic(): SzDiagnosticGrpc {
        return new SzDiagnosticGrpc({ connectionString: this.connectionStr });
    }
    public createEngine(): SzEngineGrpc {
        return new SzEngineGrpc({ connectionString: this.connectionStr });
    }

    override createProduct(): SzProductGrpc {
        return new SzProductGrpc({ connectionString: this.connectionStr });
    }

    public reinitialize(configId: number) {
        const szDiagnostic  = new SzDiagnosticGrpc({ connectionString: this.connectionStr });
        const szEngine      = new SzEngineGrpc({ connectionString: this.connectionStr });

        szDiagnostic.reinitialize(configId);
        szEngine.reinitialize(configId);
    }
}