# sz-sdk-typescript-grpc

If you are beginning your journey with [Senzing],
please start with [Senzing Quick Start guides].

You are in the [Senzing Garage] where projects are "tinkered" on.
Although this GitHub repository may help you understand an approach to using Senzing,
it's not considered to be "production ready" and is not considered to be part of the Senzing product.
Heck, it may not even be appropriate for your application of Senzing!

## :warning: WARNING: sz-sdk-typescript-grpc is still in development :warning: \_

At the moment, this is "work-in-progress" with Semantic Versions of `0.n.x`.
Although it can be reviewed and commented on,
the recommendation is not to use it yet.

## Synopsis

The Senzing `sz-sdk-typescript-grpc` package provides a TypeScript Software Development Kit adhering to the abstract classes of [sz-sdk-typescript]
that communicates with a [Senzing gRPC server].

[![Npm Badge]][Npm version]
[![License Badge]][License]

## Overview

The Senzing `sz-sdk-typescript-grpc` packages enable TypeScript or NodeJS to call Senzing library functions
across a network to a [Senzing gRPC server].

## Documentation

The Class and method documentation can be found at [Documentation].

## Use

The following example shows how to start a Senzing gRPC server Docker container
and access it using the `@senzing/sz-sdk-typescript-grpc` package.

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

   **Note:** In this example, `SENZING_TOOLS_DATABASE_URL` specifies a file _inside_ the container.
   Thus the database is temporal and will be deleted when the container is killed.

1. In a separate window create a new project directory and initialize it with npm:

   ```console
   mkdir my-new-senzing-ts-project &&
   cd my-new-senzing-ts-project &&
   npx tsc --init
   ```

1. Add the `@senzing/sz-sdk-typescript-grpc` package to your project:

   ```console
   npm install --save @senzing/sz-sdk-typescript-grpc
   ```

1. Create a new TS file:

   1. Option #1: Download the helloworld example from Github:

   ```console
   curl -X GET \
   --output ./helloworld.ts \
   https://raw.githubusercontent.com/senzing-garage/sz-sdk-typescript-grpc/refs/heads/main/examples/helloworld/helloworld.ts
   ```

   2. Option #2: create a file from scratch:

   ```console
   touch helloworld.ts
   ```

   and paste the following in to the file:

   ```typescript
   import { SzGrpcEnvironment } from "@senzing/sz-sdk-typescript-grpc";
   const szEnvironment = new SzGrpcEnvironment({
     connectionString: `0.0.0.0:8261`,
   });

   szEnvironment.product
     .getVersion()
     .then((result) => {
       console.log("RESPONSE:\n\r", result);
     })
     .catch((err) => {
       console.error(err);
     });
   ```

1. Run the ts file you created on the last step:

   ```console
       npx tsx helloworld.ts
   ```

## Development

1. Clone the repository:

   ```console
   git clone https://github.com/senzing-garage/sz-sdk-typescript-grpc.git &&
   cd sz-sdk-typescript-grpc
   ```

2. Install dependencies

   ```console
   npm install
   ```

3. Make distributable npm package:

   ```console
   make clean && make
   ```

4. The previous step will have created a new file in the `dist/@senzing` directory. The file will be in the format `dist/@senzing/senzing-sz-sdk-typescript-grpc-X.X.X.tgz`. This file can be imported for use in local projects without pulling the public version from npm.

### Link your dist package to Dev Env

You may want to use NPM Link to force node to pull the code from your dist package when it encounters references to `@senzing/sz-sdk-typescript-grpc`.

1. Go to the `dist/@senzing/sz-sdk-typescript-grpc` folder and type `npm link`.

2. Go back to the root folder, `cd ../../`, and type `npm link @senzing/sz-sdk-typescript-grpc` to link `@senzing/sz-sdk-typescript-grpc` -> `dist/@senzing/sz-sdk-typescript-grpc`.

[Documentation]: https://garage.senzing.com/sz-sdk-typescript-grpc
[Npm Badge]: https://badge.fury.io/js/@senzing%2Fsz-sdk-typescript-grpc.svg
[Npm version]: https://www.npmjs.com/package/@senzing/sz-sdk-typescript-grpc
[Examples]: examples/README.md
[License Badge]: https://img.shields.io/badge/License-Apache2-brightgreen.svg
[License]: https://github.com/senzing-garage/sz-sdk-typescript-grpc/blob/main/LICENSE
[Senzing Garage]: https://github.com/senzing-garage
[Senzing gRPC server]: https://github.com/senzing-garage/sz-sdk-java-grpc
[Senzing Quick Start guides]: https://docs.senzing.com/quickstart/
[Senzing]: https://senzing.com/
