import { SzGrpcEnvironment, SzEngineFlags, SzGrpcConfig } from '@senzing/sz-sdk-typescript-grpc';

const szEnvironment = new SzGrpcEnvironment({connectionString: `0.0.0.0:8261`});
const FLAGS = SzEngineFlags.SZ_WITH_INFO;

const TRUTHSET_BASE_URL = 'https://raw.githubusercontent.com/Senzing/code-snippets-v4/main/resources/data/truthset';
const JSONL_FILES = ['customers.jsonl', 'reference.jsonl', 'watchlist.jsonl'];
const DATA_SOURCES = ['CUSTOMERS', 'REFERENCE', 'WATCHLIST'];

async function fetchJsonlFile(filename: string): Promise<string> {
    const url = `${TRUTHSET_BASE_URL}/${filename}`;
    console.log(`Fetching ${url}...`);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }
    return response.text();
}

function detectLineEnding(content: string): string {
    if (content.includes('\r\n')) return '\r\n';
    if (content.includes('\r')) return '\r';
    return '\n';
}

async function loadRecords(config: SzGrpcConfig, registeredDataSources: Set<string>) {
    let totalRecords = 0;
    let successCount = 0;
    let errorCount = 0;
    let newDataSourcesCount = 0;

    for (const file of JSONL_FILES) {
        const content = await fetchJsonlFile(file);
        const lineEnding = detectLineEnding(content);
        const lines = content.trim().split(lineEnding);

        console.log(`\nLoading ${lines.length} records from ${file}...`);

        for (const line of lines) {
            if (!line.trim()) continue;

            try {
                const record = JSON.parse(line);
                const dataSource = record.DATA_SOURCE;
                const recordId = record.RECORD_ID;

                if (!dataSource) {
                    console.error(`  Skipping record ${recordId}: missing DATA_SOURCE`);
                    errorCount++;
                    totalRecords++;
                    continue;
                }

                if (!registeredDataSources.has(dataSource)) {
                    console.log(`  Registering new data source: ${dataSource}`);
                    await config.registerDataSource(dataSource);
                    await szEnvironment.configManager.setDefaultConfig(config.definition);
                    registeredDataSources.add(dataSource);
                    newDataSourcesCount++;
                }

                await szEnvironment.engine.addRecord(dataSource, recordId, record, FLAGS)
                    .then((resp) => {
                        console.log(`  Loaded: ${dataSource}:${recordId}`);
                        successCount++;
                    });
            } catch (err) {
                console.error(`  Error loading record: ${err}`);
                errorCount++;
            }
            totalRecords++;
        }
    }

    console.log(`\n--- Summary ---`);
    console.log(`Total records processed: ${totalRecords}`);
    console.log(`Successfully loaded: ${successCount}`);
    console.log(`New data sources registered: ${newDataSourcesCount}`);
    console.log(`Errors: ${errorCount}`);
}

console.log(`\nSetting up data sources: ${DATA_SOURCES.join(', ')}...`);
szEnvironment.configManager.createConfig().then((config: SzGrpcConfig) => {
    config.registerDataSources(DATA_SOURCES).then((results) => {
        config.getDataSourceRegistry().then((dataSources) => {
            const registeredDataSources = new Set(dataSources.map((ds) => ds.DSRC_CODE));
            szEnvironment.configManager.setDefaultConfig(config.definition).then((configId) => {
                console.log(`Data sources configured (configId: ${configId}).`);
                console.log(`Registered data sources: ${[...registeredDataSources].join(', ')}`);
                loadRecords(config, registeredDataSources);
            });
        });
    });
}).catch((err) => {
    console.error(`Error setting up data sources: ${err}`);
});
