
// ---------------  abstract diagnostic from main package
export interface SzEngine {
    addRecord(dataSourceCode: string, recordId: string, recordDefinition: string, flags: number): void;
    closeExportReport(exportHandle: number): void;
    countRedoRecords(): void;
    deleteRecord(dataSourceCode: string, recordId: string, flags: number): void;
    exportCsvEntityReport(csv_column_list: string, flags: number): void;
    exportCsvEntityReportIterator(csv_column_list: string, flags: number): void;
    exportJsonEntityReport(flags: number): void;
    exportJsonEntityReportIterator(flags: number): void;
    fetchNext(export_handle: number): void;
    findInterestingEntitiesByEntityId( entityId: number, flags: number): void;
    findInterestingEntitiesByRecordId( dataSourceCode: string, recordId: string, flags: number): void;
    findNetworkByEntityId(
        entityIds: Array<number>, 
        maxDegrees: number, 
        buildOutDegrees: number,
        buildOutMaxEntities: number,
        flags: number
    ): void;
    findNetworkByRecordId(        
        recordId: Array<[string, number]>, 
        maxDegrees: number, 
        buildOutDegrees: number,
        buildOutMaxEntities: number,
        flags: number
    ): void;
    findPathByEntityId(
        startEntityId: number,
        endEntityId: number,
        maxDegrees: number,
        /* TODO Should accept both entity and record IDs in V4, test */
        avoidEntityIds: Array<number>,
        requiredDataSources: Array<string>,
        flags: number
    ): void;
    findPathByRecordId(
        startDataSourceCode: string,
        startRecordId: string,
        endDataSourceCode: string,
        endRecordId: string,
        maxDegrees: number,
        avoidRecordKeys: Array<[string, number]>,
        requiredDataSources: Array<string>,
        flags: number,
    ): void;
    getActiveConfigId(): void;
    getEntityByEntityId(entityId: number, flags: number): void;
    getEntityByRecordId(dataSourceCode: string, recordId: string, flags: number): void;
    getRecord(dataSourceCode: string, recordId: string, flags: number): void;
    getRecordPreview(recordDefinition: string, flags: number): void;
    getRedoRecord(): void;
    getStats(): void;
    getVirtualEntityByRecordId(record_keys: Array<[string, string]>, flags: number): void;
    howEntityByEntityId(entityId: number, flags: number): void;
    primeEngine(): void;
    processRedoRecord(redoRecord: string, flags: number): void;
    reevaluateEntity(entityId: number, flags: number): void;
    reevaluateRecord(dataSourceCode: string, recordId: string, flags: number): void;
    reinitialize(configId: number): void;
    searchByAttributes(
        attributes: string, 
        flags: number,
        searchProfile: string): void;
    whyEntities(
        entityId1: number,
        entityId2: number, 
        flags: number): void;
    whyRecordInEntity(
        dataSourceCode: string,
        recordId: string,
        flags: number
    ): void;
    whyRecords(
        dataSourceCode1: string,
        recordId1: string,
        dataSourceCode2: string,
        recordId2: string,
        flags: number
    ): void;
}