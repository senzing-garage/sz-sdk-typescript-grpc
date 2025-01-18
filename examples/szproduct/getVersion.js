"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sz_sdk_typescript_grpc_1 = require("../../dist/@senzing/sz-sdk-typescript-grpc");
var szParamFactory = new sz_sdk_typescript_grpc_1.SzAbstractFactory("0.0.0.0:8261");
var szProduct = szParamFactory.createProduct();
szProduct.getVersion().
    then(function (result) {
    console.log("RESPONSE:\n\r", result);
}).
    catch(function (err) {
    console.error(err);
});
