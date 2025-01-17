# sz-sdk-typescript-grpc


If you are beginning your journey with [Senzing],
please start with [Senzing Quick Start guides].

You are in the [Senzing Garage] where projects are "tinkered" on.
Although this GitHub repository may help you understand an approach to using Senzing,
it's not considered to be "production ready" and is not considered to be part of the Senzing product.
Heck, it may not even be appropriate for your application of Senzing!

## :warning: WARNING: sz-sdk-typescript-grpc is still in development :warning: _

At the moment, this is "work-in-progress" with Semantic Versions of `0.n.x`.
Although it can be reviewed and commented on,
the recommendation is not to use it yet.


## Synopsis

The Senzing `sz-sdk-typescript-grpc` package provides a TypeScript Software Development Kit adhering to the abstract classes of [sz-sdk-typescript]
that communicates with a [Senzing gRPC server].

## Overview

The Senzing `sz-sdk-typescript-grpc` packages enable TypeScript or NodeJS to call Senzing library functions
across a network to a [Senzing gRPC server].

The `sz-sdk-typescript-grpc` package implements the following [sz-sdk-typescript] interfaces:

1. [SzConfig]
1. [SzConfigMgr]
1. [SzDiagnostic]
1. [SzEngine]
1. [SzProduct]


## Use

The following example shows how to start a Senzing gRPC server Docker container
and access it using the `senzing_grpc` Python package.

1. Run a Senzing gRPC service using Docker.
   Example:

    ```console
    docker run \
      --env SENZING_TOOLS_COMMAND=serve-grpc \
      --env SENZING_TOOLS_DATABASE_URL=sqlite3://na:na@nowhere/tmp/sqlite/G2C.db \
      --env SENZING_TOOLS_ENABLE_ALL=true \
      --name senzing-tools-serve-grpc \
      --publish 8261:8261 \
      --pull always \
      --rm \
      senzing/senzing-tools
    ```

   **Note:** In this example, `SENZING_TOOLS_DATABASE_URL` specifies a file *inside* the container.
   Thus the database is temporal and will be deleted when the container is killed.

1. In a separate window create a new project directory and initialize it with npm:

    ```console
    mkdir my-new-senzing-ts-project &&
    cd my-new-senzing-ts-project && 
    npm init -y && 
    npm install --save-dev typescript
    ```

    Create the tsconfig file if you haven't already:
    ```console
    touch tsconfig.json
    ```

    and paste in the following:
    ```json
    {
        "compilerOptions": {
            "module": "commonjs",
            "esModuleInterop": true,
            "target": "es2020",
            "moduleResolution": "node",
            "sourceMap": true,
            "outDir": "dist"
        },
        "lib": ["es2020"]
    }
    ```

1. Add the `sz-sdk-typescript-grpc` package to your project:

    ```console
    npm install --save @senzing/sz-sdk-typescript-grpc
    ```

1. Create a new TS file:

    ```console
    touch main.ts
    ```
    
    and paste the following in to the file:
    ```typescript
    import { SzAbstractFactory } from '@senzing/sz-sdk-nodejs-grpc';

    const szParamFactory = new SzAbstractFactory(`0.0.0.0:8261`);
    const szProduct      = szParamFactory.createProduct();

    szProduct.getVersion().
        then((result)=>{
            console.log("RESPONSE:\n\r", result);
        }).
        catch((err)=>{
            console.error(err);
        });
    ```

1. Run the new ts file you created on the last step:

    ```console
        tsx main.ts
    ```
