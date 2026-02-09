import * as grpcWeb from "grpc-web";
import { SzError, SzNoGrpcConnectionError } from "../senzing/SzError";
import {
  DEFAULT_CHANNEL_OPTIONS,
  DEFAULT_CONNECTION_READY_TIMEOUT,
  DEFAULT_CONNECTION_STRING,
  DEFAULT_CREDENTIALS,
  SzGrpcWebEnvironmentOptions,
} from "../szGrpcWebEnvironment";

export abstract class SzGrpcWebBase {
  /** @ignore */
  abstract client: any;

  /** metadata passed to the request context
   * @ignore
   */
  protected _metadata: grpcWeb.Metadata = {};

  private grpcOptions = DEFAULT_CHANNEL_OPTIONS;
  public grpcConnectionReadyTimeOut = DEFAULT_CONNECTION_READY_TIMEOUT;

  protected getDeadlineFromNow(secondsFromNow?: number): Date {
    let retVal = new Date();
    retVal.setSeconds(
      retVal.getSeconds() +
        (secondsFromNow ? secondsFromNow : this.grpcConnectionReadyTimeOut),
    );
    return retVal;
  }

  /**
   * This is essentially a polyfill for the "grpcClient.waitForReady" method that does not exist
   * in the `grpc-web` package. This allows the code inheriting this class to be identical in
   * both the `gRPC` and `gRPC-Web` flavors for each class.
   */
  public waitForReady(deadline: Date, cb: (error: Error | null) => void) {
    cb(null);
  }

  constructor(options: SzGrpcWebEnvironmentOptions) {
    const {
      connectionString,
      credentials,
      client,
      grpcOptions,
      grpcConnectionReadyTimeOut,
    } = options;

    if (grpcConnectionReadyTimeOut) {
      this.grpcConnectionReadyTimeOut = grpcConnectionReadyTimeOut;
    }
  }
}
