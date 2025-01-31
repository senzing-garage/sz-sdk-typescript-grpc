// ----------------------------------------------------------------------------
// Base SzError
// ----------------------------------------------------------------------------

/** Base exception for Sz related javascript code. */
export class SzError extends Error {}

// ----------------------------------------------------------------------------
// Category exceptions
// - These exceptions represent categories of actions that can be taken by
//   the calling program.
// ----------------------------------------------------------------------------

/** The user-supplied input contained an error. */
export class SzBadInputError extends SzError {}

/** The program can provide a remedy and continue. */
export class SzConfigurationError extends SzError {}

/** The program can provide a remedy and continue. */
export class SzReplaceConflictError extends SzError {}

/** The program can provide a remedy and continue.*/
export class SzRetryableError extends SzError {}

/** System failure, can't continue. */
export class SzUnrecoverableError extends SzError {}

/** Temporary Error for non-dev-complete feature */
export class SzNotYetImplementedError extends SzError {
    override message = "Feature Not Yet Implemented";
}

/** GRPC only error that is handed back when connection is not present */
export class SzNoGrpcConnectionError extends SzError {
    override message = "No Connection Configured";
}

// ----------------------------------------------------------------------------
// Detail exceptions for SzBadInputException
// - Processing did not complete.
// - These exceptions are "per record" exceptions.
// - The record should be recorded as "bad".  (logged, queued as failure)
// - Processing may continue.
// ----------------------------------------------------------------------------

/** "Not found */
export class SzNotFoundError extends SzBadInputError {}

/** Unknown DataSource */
export class SzUnknownDataSourceError extends SzBadInputError {}


// ----------------------------------------------------------------------------
// Detail exceptions for SzRetryableException
// - Processing did not complete.
// - These exceptions may be remedied programmatically.
// - The call to the Senzing method should be retried.
// - Processing may continue.
// ----------------------------------------------------------------------------

/** Database connection lost */
export class SzDatabaseConnectionLostError extends SzRetryableError {}

/** Retry timeout exceeded time limit */
export class SzRetryTimeoutExceededError extends SzRetryableError {}

// ----------------------------------------------------------------------------
// Detail exceptions for SzUnrecoverableException
// - Processing did not complete.
// - These exceptions cannot be remedied programmatically.
// - Processing cannot continue.
// ----------------------------------------------------------------------------

/** Database exception*/
export class SzDatabaseError extends SzUnrecoverableError {}

/** License exception */
export class SzLicenseError extends SzUnrecoverableError {}

/** Not initialized */
export class SzNotInitializedError extends SzUnrecoverableError {}

/** Could not handle exception */
export class SzUnhandledError extends SzUnrecoverableError {}