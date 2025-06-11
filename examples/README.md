## Running the examples from this repository

1. Install the dependencies required to build from this repositories root directory:

```console
npm install
```

2. Build the package locally:

```
make clean && make
```

3. Create a npm link from the dist package directory so that the examples will reference the package in the `dist/@senzing/sz-sdk-typescript-grpc` as `@senzing/sz-sdk-typescript-grpc`. Go to the `dist/@senzing/sz-sdk-typescript-grpc` folder and type `npm link`.

4. Now go to the examples folder, `cd examples`, and type `npm link @senzing/sz-sdk-typescript-grpc` to link `@senzing/sz-sdk-typescript-grpc` -> `dist/@senzing/sz-sdk-typescript-grpc`.

5. From the examples directory any of the examples can be run by prefixing the relative filepath with `npm run `. For example, to run the `examples/szproduct/getVersion.ts` example simply type `npm run szproduct/getVersion.ts`. To run the getDataSources example type `npm run szconfig/getDataSources.ts`.

## Running the examples from your own project

1.  Create a new TS project. If you already have a project created skip ahead to step 2.

    ```console
    mkdir my-senzing-project && cd my-senzing-project &&
    npx tsc --init
    ```

2.  Add the `@senzing/sz-sdk-typescript-grpc` package to your project.

    ```console
    npm install --save @senzing/sz-sdk-typescript-grpc
    ```

3.  Copy examples and paste example code in to your project
        ```console
    curl -X GET \
     --output ./helloworld.ts \
     https://raw.githubusercontent.com/senzing-garage/sz-sdk-typescript-grpc/refs/heads/main/examples/helloworld/helloworld.ts
    ```
4.  and run:

```console
    npx tsx helloworld.ts
```
