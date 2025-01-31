import { SzAbstractFactory as szAbstractFactoryCreator, SzEngineFlags } from '../../dist/@senzing/sz-sdk-typescript-grpc';
import https from 'https';
import fs from  'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename        = fileURLToPath(import.meta.url);   // get the resolved path to the file
const __dirname         = path.dirname(__filename);         // get the name of the directory

// set up senzing modules
const szAbstractFactory = new szAbstractFactoryCreator(`0.0.0.0:8261`);
const szConfig          = szAbstractFactory.createConfig();
const szConfigManager   = szAbstractFactory.createConfigManager();
const szDiagnostic      = szAbstractFactory.createDiagnostic();
const szEngine          = szAbstractFactory.createEngine();

const DATA_SOURCE_CODE = "TEST";
const FLAGS            = SzEngineFlags.SZ_WITH_INFO; 

const home_path = "./"
const truthSetUrlPrefix = "https://raw.githubusercontent.com/Senzing/truth-sets/refs/heads/main/truthsets/demo/"
const truthSetFilenames = [
    "customers.json",
    "reference.json",
    "watchlist.json",
]

function getRemoteFile(file, url) {
    return new Promise((resolve, reject) => {
        let scriptPath      = __dirname;
        let localFilePath   = path.join(__dirname, file);
        //console.log(`writing to ${localFilePath}`);
        let localFile   = fs.createWriteStream(localFilePath);
        const request = https.get(url, function(response) {
            var len = parseInt(response.headers['content-length'] as string, 10);
            var cur = 0;
            var total = len / 1048576; //1048576 - bytes in 1 Megabyte
    
            response.on('end', function() {
                console.log(`Downloaded "${file}"`);
                resolve(file);
            });
    
            response.pipe(localFile);
        });
    })
}

function getDataSourcesInFile(file): Promise<string[]> {
    return new Promise((resolve, reject) => {
        let DISCOVERED_SOURCES: string[] = [];
        let scriptPath      = __dirname;
        let localFilePath   = path.join(__dirname, file);
        const rl = readline.createInterface({
            input: fs.createReadStream(localFilePath),
            crlfDelay: Infinity
        });
        rl.on('line', (line) => {
            try {
              const jsonObject = JSON.parse(line);
              let recordDs = jsonObject["DATA_SOURCE"] as unknown as string;
              if(recordDs && recordDs !== undefined && !DISCOVERED_SOURCES.includes(recordDs)) {
                DISCOVERED_SOURCES.push(recordDs);
              }
              //console.log(jsonObject); // Process the JSON object
            } catch (error) {
              console.error('Error parsing JSON:', error);
            }
        });
        rl.on('close', () => {
            //console.log('Finished reading file.');
            resolve(DISCOVERED_SOURCES);
        });
        /*fs.readFile(localFilePath, 'utf-8', (err, data)=>{
            if (err) {
                console.error(err);
                return;
            }
            try {
                const jsonData = JSON.parse(data);

                console.log(jsonData);
            } catch (parseError) {
                console.error('Error parsing JSON:', parseError);
            }
        })*/
    });
}

// get the remote files
let fileDownloads = truthSetFilenames.map((fileName) => {
    const remotePath = truthSetUrlPrefix + fileName;
    return getRemoteFile(fileName, remotePath);
});

Promise.all(fileDownloads).then((values) => {
    // okay, we got all the files

    // discover datasources in the files
    let DATA_SOURCES : string[] = [];
    Promise.all(truthSetFilenames.map((fileName) => {
        return getDataSourcesInFile(fileName);
    })).then((discoveredSources) => {
        DATA_SOURCES = [ ...new Set(discoveredSources.flat()) ];
        console.log('discovered sources: \n\r', DATA_SOURCES);

        // update senzing config with new datasources
        szConfigManager.getDefaultConfigId()?.then((oldConfigId) => {
            console.log(`default config id: ${oldConfigId}`);

            
            szConfigManager.getConfig(oldConfigId as number)?.then(
                (oldJsonConfig) => {
                    //console.log(`current config: \n\r`, oldJsonConfig);
                    szConfig.importConfig(oldJsonConfig as string).then((configHandle) => {
                        Promise.all(DATA_SOURCES.map((dsCode) => {
                            return szConfig.addDataSource(configHandle as number, dsCode);                        
                        })).then((dataSourcesCreated) => {
                            console.log(`added datasources(${DATA_SOURCES}) to ${configHandle as number}`);
                        });
                    })
                    /*
                    szConfig.importConfig(oldJsonConfig as string).then((configHandle) => {
                        Promise.all(DATA_SOURCES.map((dsCode) => {
                            return szConfig.addDataSource(configHandle as number, dsCode);                        
                        })).then((dataSourcesCreated) => {
                            console.log(`added datasources(${DATA_SOURCES}) to ${configHandle as number}`);

                            // make config changes persistent
                            szConfig.exportConfig(configHandle as number).then((newJsonConfig) => {
                                console.log('new exported config: \n\r', newJsonConfig);
                                //szConfigManager.addConfig(newJsonConfig as string)?.then((newConfigId) => {
                                //    szConfigManager.replaceDefaultConfigId(oldConfigId as number, newConfigId as number)
                                //    szAbstractFactory.reinitialize(newConfigId as number);
                                //})
                            });
                        })
                    })*/
                }
            )

        })
    })
});