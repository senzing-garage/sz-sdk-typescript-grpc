/**
 * build script takes all the src dir, processes anything it needs to and copies it 
 * to the /dist dir
 */

const fs    = require('fs');
const path  = require('path');
const glob  = require('glob');
const replaceInFile = require('replace-in-file').replaceInFile;

const _filesToExclude = [
    path.join('src','index.ts'),
];

// move tsbuild info file if exists
if(fs.existsSync(path.join('.', ...'dist/@senzing/sz-sdk-typescript-grpc-web/tsconfig.web.tsbuildinfo'.split('/')))) {
    fs.renameSync(
        path.join('.', ...'dist/@senzing/sz-sdk-typescript-grpc-web/tsconfig.web.tsbuildinfo'.split('/')), 
        path.join('.', ...'dist/@senzing/sz-sdk-typescript-grpc-web.tsbuildinfo'.split('/'))
    );
}
// rename "index.web.ts" -> "index.ts"
if(fs.existsSync(path.join('.', ...'dist/@senzing/sz-sdk-typescript-grpc-web/index.web.ts'.split('/')))) {
    fs.renameSync(
        path.join('.', ...'dist/@senzing/sz-sdk-typescript-grpc-web/index.web.ts'.split('/')), 
        path.join('.', ...'dist/@senzing/sz-sdk-typescript-grpc-web/index.ts'.split('/'))
    );
}

// flatten "dist/@senzing/sz-sdk-typescript-grpc-web/src" -> "dist/@senzing/sz-sdk-typescript-grpc-web"
// first
fs.cpSync(path.join('.', ...'dist/@senzing/sz-sdk-typescript-grpc-web/src'.split('/')), path.join('.', ...'dist/@senzing/sz-sdk-typescript-grpc-web'.split('/')), { recursive: true});
fs.rmSync(path.join('.', ...'dist/@senzing/sz-sdk-typescript-grpc-web/src'.split('/')), { recursive: true, force: true });

// rename "package.web.json" -> "package.json"
if(fs.existsSync(path.join('.', ...'dist/@senzing/sz-sdk-typescript-grpc-web/package.web.json'.split('/')))) {
    fs.renameSync(
        path.join('.', ...'dist/@senzing/sz-sdk-typescript-grpc-web/package.web.json'.split('/')), 
        path.join('.', ...'dist/@senzing/sz-sdk-typescript-grpc-web/package.json'.split('/'))
    );
}

// copy js/ts that include "_web_pb" in their names
const foldersToScan = [
    'src',
    'src/szproduct'
]
fs.cpSync(path.join('.','src'), path.join('.', ...'dist/@senzing/sz-sdk-typescript-grpc-web'.split('/')), { recursive: true, filter: (source, dest) => {
    console.log(`${source.indexOf(`_web_pb`) > -1}|"${source}" contains "_web_pb"`);
    let isFolder = foldersToScan.includes(source);
    return isFolder || !_filesToExclude.includes(source) && source && source.indexOf(`_web_pb`) > -1;
} }, (err) => {
    if (err) {
        console.error(err);
    }
});