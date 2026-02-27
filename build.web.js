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

// copy source "package.web.json" -> dist "package.json"
// (tsc resolveJsonModule strips unknown fields like "type", so copy from source directly)
fs.cpSync(
    path.join('.', 'src', 'package.web.json'),
    path.join('.', ...'dist/@senzing/sz-sdk-typescript-grpc-web/package.json'.split('/'))
);

// copy js/ts that include "_web_pb" in their names
const foldersToScan = [
    'src',
    'src/szconfig',
    'src/szconfigmanager',
    'src/szdiagnostic',
    'src/szengine',
    'src/szproduct'
]
fs.cpSync(path.join('.','src'), path.join('.', ...'dist/@senzing/sz-sdk-typescript-grpc-web'.split('/')), { recursive: true, filter: (source, dest) => {
    let isFolder = foldersToScan.includes(source);
    return isFolder || !_filesToExclude.includes(source) && source && source.indexOf(`_web_pb`) > -1;
} }, (err) => {
    if (err) {
        console.error(err);
    }
});

// convert CJS patterns in _web_pb.js files to ESM
const distDir = path.join('.', ...'dist/@senzing/sz-sdk-typescript-grpc-web'.split('/'));
const pbFiles = glob.sync(path.join(distDir, '**/*_web_pb.js'));
for (const file of pbFiles) {
    let content = fs.readFileSync(file, 'utf8');

    // convert require('google-protobuf') to ESM import
    content = content.replace(
        /var jspb = require\('google-protobuf'\);/g,
        "import * as jspb from 'google-protobuf';"
    );

    // extract symbol names from goog.exportSymbol('proto.xxx.Name', ...)
    const symbolRegex = /goog\.exportSymbol\('proto\.\w+\.(\w+)'/g;
    const symbols = [];
    let match;
    while ((match = symbolRegex.exec(content)) !== null) {
        symbols.push(match[1]);
    }

    // replace goog.object.extend(exports, proto.xxx) with ESM named exports
    const extendsMatch = content.match(/goog\.object\.extend\(exports, (proto\.\w+)\);/);
    if (extendsMatch && symbols.length > 0) {
        const namespace = extendsMatch[1];
        const namedExports = symbols
            .map(s => `export const ${s} = ${namespace}.${s};`)
            .join('\n');
        content = content.replace(
            /goog\.object\.extend\(exports, proto\.\w+\);/,
            namedExports
        );
    }

    fs.writeFileSync(file, content, 'utf8');
    console.log('Converted to ESM:', file, `(${symbols.length} exports)`);
}