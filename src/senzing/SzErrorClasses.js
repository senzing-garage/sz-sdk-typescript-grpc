"use strict";
// ----------------------------------------------------------------------------
// Base SzError
// ----------------------------------------------------------------------------
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SzUnhandledError = exports.SzNotInitializedError = exports.SzLicenseError = exports.SzDatabaseError = exports.SzRetryTimeoutExceededError = exports.SzDatabaseConnectionLostError = exports.SzUnknownDataSourceError = exports.SzNotFoundError = exports.SzNoGrpcConnectionError = exports.SzNotYetImplementedError = exports.SzUnrecoverableError = exports.SzRetryableError = exports.SzReplaceConflictError = exports.SzConfigurationError = exports.SzBadInputError = exports.SzError = void 0;
/** Base exception for Sz related javascript code.
 * @group Errors
 * @hideconstructor
*/
var SzError = /** @class */ (function (_super) {
    __extends(SzError, _super);
    function SzError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SzError;
}(Error));
exports.SzError = SzError;
// ----------------------------------------------------------------------------
// Category exceptions
// - These exceptions represent categories of actions that can be taken by
//   the calling program.
// ----------------------------------------------------------------------------
/**
 * The user-supplied input contained an error.
 * @group Errors
 * @hideconstructor
 */
var SzBadInputError = /** @class */ (function (_super) {
    __extends(SzBadInputError, _super);
    function SzBadInputError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SzBadInputError;
}(SzError));
exports.SzBadInputError = SzBadInputError;
/**
 * The program can provide a remedy and continue.
 * @group Errors
 * @hideconstructor
 */
var SzConfigurationError = /** @class */ (function (_super) {
    __extends(SzConfigurationError, _super);
    function SzConfigurationError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SzConfigurationError;
}(SzError));
exports.SzConfigurationError = SzConfigurationError;
/** The program can provide a remedy and continue.
 * @group Errors
 * @hideconstructor
*/
var SzReplaceConflictError = /** @class */ (function (_super) {
    __extends(SzReplaceConflictError, _super);
    function SzReplaceConflictError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SzReplaceConflictError;
}(SzError));
exports.SzReplaceConflictError = SzReplaceConflictError;
/** The program can provide a remedy and continue.
 * @hideconstructor
 * @group Errors
*/
var SzRetryableError = /** @class */ (function (_super) {
    __extends(SzRetryableError, _super);
    function SzRetryableError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SzRetryableError;
}(SzError));
exports.SzRetryableError = SzRetryableError;
/** System failure, can't continue.
 * @hideconstructor
 * @group Errors
*/
var SzUnrecoverableError = /** @class */ (function (_super) {
    __extends(SzUnrecoverableError, _super);
    function SzUnrecoverableError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SzUnrecoverableError;
}(SzError));
exports.SzUnrecoverableError = SzUnrecoverableError;
/** Temporary Error for non-dev-complete feature
 * @hideconstructor
 * @group Errors
*/
var SzNotYetImplementedError = /** @class */ (function (_super) {
    __extends(SzNotYetImplementedError, _super);
    function SzNotYetImplementedError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.message = "Feature Not Yet Implemented";
        return _this;
    }
    return SzNotYetImplementedError;
}(SzError));
exports.SzNotYetImplementedError = SzNotYetImplementedError;
/** GRPC only error that is handed back when connection is not present
 * @hideconstructor
 * @group Errors
*/
var SzNoGrpcConnectionError = /** @class */ (function (_super) {
    __extends(SzNoGrpcConnectionError, _super);
    function SzNoGrpcConnectionError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.message = "No Connection Configured";
        return _this;
    }
    return SzNoGrpcConnectionError;
}(SzError));
exports.SzNoGrpcConnectionError = SzNoGrpcConnectionError;
// ----------------------------------------------------------------------------
// Detail exceptions for SzBadInputException
// - Processing did not complete.
// - These exceptions are "per record" exceptions.
// - The record should be recorded as "bad".  (logged, queued as failure)
// - Processing may continue.
// ----------------------------------------------------------------------------
/** "Not found
 * @group Errors
 * @hideconstructor
*/
var SzNotFoundError = /** @class */ (function (_super) {
    __extends(SzNotFoundError, _super);
    function SzNotFoundError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SzNotFoundError;
}(SzBadInputError));
exports.SzNotFoundError = SzNotFoundError;
/** Unknown DataSource
 * @group Errors
 * @hideconstructor
*/
var SzUnknownDataSourceError = /** @class */ (function (_super) {
    __extends(SzUnknownDataSourceError, _super);
    function SzUnknownDataSourceError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SzUnknownDataSourceError;
}(SzBadInputError));
exports.SzUnknownDataSourceError = SzUnknownDataSourceError;
// ----------------------------------------------------------------------------
// Detail exceptions for SzRetryableException
// - Processing did not complete.
// - These exceptions may be remedied programmatically.
// - The call to the Senzing method should be retried.
// - Processing may continue.
// ----------------------------------------------------------------------------
/** Database connection lost
 * @group Errors
 * @hideconstructor
*/
var SzDatabaseConnectionLostError = /** @class */ (function (_super) {
    __extends(SzDatabaseConnectionLostError, _super);
    function SzDatabaseConnectionLostError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SzDatabaseConnectionLostError;
}(SzRetryableError));
exports.SzDatabaseConnectionLostError = SzDatabaseConnectionLostError;
/** Retry timeout exceeded time limit
 * @group Errors
 * @hideconstructor
*/
var SzRetryTimeoutExceededError = /** @class */ (function (_super) {
    __extends(SzRetryTimeoutExceededError, _super);
    function SzRetryTimeoutExceededError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SzRetryTimeoutExceededError;
}(SzRetryableError));
exports.SzRetryTimeoutExceededError = SzRetryTimeoutExceededError;
// ----------------------------------------------------------------------------
// Detail exceptions for SzUnrecoverableException
// - Processing did not complete.
// - These exceptions cannot be remedied programmatically.
// - Processing cannot continue.
// ----------------------------------------------------------------------------
/** Database exception
 * @group Errors
 * @hideconstructor
*/
var SzDatabaseError = /** @class */ (function (_super) {
    __extends(SzDatabaseError, _super);
    function SzDatabaseError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SzDatabaseError;
}(SzUnrecoverableError));
exports.SzDatabaseError = SzDatabaseError;
/** License exception
 * @hideconstructor
 * @group Errors
*/
var SzLicenseError = /** @class */ (function (_super) {
    __extends(SzLicenseError, _super);
    function SzLicenseError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SzLicenseError;
}(SzUnrecoverableError));
exports.SzLicenseError = SzLicenseError;
/** Not initialized
 * @hideconstructor
 * @group Errors
*/
var SzNotInitializedError = /** @class */ (function (_super) {
    __extends(SzNotInitializedError, _super);
    function SzNotInitializedError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SzNotInitializedError;
}(SzUnrecoverableError));
exports.SzNotInitializedError = SzNotInitializedError;
/** Could not handle exception
 * @hideconstructor
 * @group Errors
*/
var SzUnhandledError = /** @class */ (function (_super) {
    __extends(SzUnhandledError, _super);
    function SzUnhandledError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SzUnhandledError;
}(SzUnrecoverableError));
exports.SzUnhandledError = SzUnhandledError;
