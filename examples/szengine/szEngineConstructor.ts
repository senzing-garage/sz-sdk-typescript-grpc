import { SzEngine } from '@senzing/sz-sdk-typescript-grpc';

/**
 * Example of initializing the SzEngine class without the SzEnvironment syntax sugar
 */
const szEngine                  = new SzEngine({connectionString: `0.0.0.0:8261`});