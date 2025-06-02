
/** 
 * @group Flags
 * @hideconstructor 
 */
export class SzEngineFlags {
    static SZ_INCLUDE_FEATURE_SCORES = 1n << 26n;
    static SZ_INCLUDE_MATCH_KEY_DETAILS = 1n << 34n;

    // Flags for exporting entity data.
    static SZ_EXPORT_INCLUDE_MULTI_RECORD_ENTITIES = 1n << 0n;
    static SZ_EXPORT_INCLUDE_POSSIBLY_SAME = 1n << 1n;
    static SZ_EXPORT_INCLUDE_POSSIBLY_RELATED = 1n << 2n;
    static SZ_EXPORT_INCLUDE_NAME_ONLY = 1n << 3n;
    static SZ_EXPORT_INCLUDE_DISCLOSED = 1n << 4n
    static SZ_EXPORT_INCLUDE_SINGLE_RECORD_ENTITIES = 1n << 5n
    static SZ_EXPORT_INCLUDE_ALL_ENTITIES = SzEngineFlags.SZ_EXPORT_INCLUDE_MULTI_RECORD_ENTITIES | SzEngineFlags.SZ_EXPORT_INCLUDE_SINGLE_RECORD_ENTITIES
    static SZ_EXPORT_INCLUDE_ALL_HAVING_RELATIONSHIPS = (
        this.SZ_EXPORT_INCLUDE_POSSIBLY_SAME
        | this.SZ_EXPORT_INCLUDE_POSSIBLY_RELATED
        | this.SZ_EXPORT_INCLUDE_NAME_ONLY
        | this.SZ_EXPORT_INCLUDE_DISCLOSED
    )

    // Flags for outputting entity relation data.
    static SZ_ENTITY_INCLUDE_POSSIBLY_SAME_RELATIONS = 1n << 6n;
    static SZ_ENTITY_INCLUDE_POSSIBLY_RELATED_RELATIONS = 1n << 7n;
    static SZ_ENTITY_INCLUDE_NAME_ONLY_RELATIONS = 1n << 8n;
    static SZ_ENTITY_INCLUDE_DISCLOSED_RELATIONS = 1n << 9n;
    static SZ_ENTITY_INCLUDE_ALL_RELATIONS = (
        SzEngineFlags.SZ_ENTITY_INCLUDE_POSSIBLY_SAME_RELATIONS
        | SzEngineFlags.SZ_ENTITY_INCLUDE_POSSIBLY_RELATED_RELATIONS
        | SzEngineFlags.SZ_ENTITY_INCLUDE_NAME_ONLY_RELATIONS
        | SzEngineFlags.SZ_ENTITY_INCLUDE_DISCLOSED_RELATIONS
    )

    // Flags for outputting entity feature data.

    static SZ_ENTITY_INCLUDE_ALL_FEATURES = 1n << 10n;
    static SZ_ENTITY_INCLUDE_REPRESENTATIVE_FEATURES = 1n << 11n;

    // Flags for getting extra information about an entity.

    static SZ_ENTITY_INCLUDE_ENTITY_NAME = 1n << 12n;
    static SZ_ENTITY_INCLUDE_RECORD_SUMMARY = 1n << 13n;
    static SZ_ENTITY_INCLUDE_RECORD_TYPES = 1n << 28n;
    static SZ_ENTITY_INCLUDE_RECORD_DATA = 1n << 14n;
    static SZ_ENTITY_INCLUDE_RECORD_MATCHING_INFO = 1n << 15n;
    static SZ_ENTITY_INCLUDE_RECORD_JSON_DATA = 1n << 16n;
    static SZ_ENTITY_INCLUDE_RECORD_UNMAPPED_DATA = 1n << 31n;
    static SZ_ENTITY_INCLUDE_RECORD_FEATURE_IDS = 1n << 18n;
    static SZ_ENTITY_INCLUDE_RECORD_FEATURE_DETAILS = 1n << 35n;
    static SZ_ENTITY_INCLUDE_RECORD_FEATURE_STATS = 1n << 36n;
    static SZ_ENTITY_INCLUDE_RELATED_ENTITY_NAME = 1n << 19n;
    static SZ_ENTITY_INCLUDE_RELATED_MATCHING_INFO = 1n << 20n;
    static SZ_ENTITY_INCLUDE_RELATED_RECORD_SUMMARY = 1n << 21n;
    static SZ_ENTITY_INCLUDE_RELATED_RECORD_TYPES = 1n << 29n;
    static SZ_ENTITY_INCLUDE_RELATED_RECORD_DATA = 1n << 22n;

    // Flags for extra feature data.
    static SZ_ENTITY_INCLUDE_INTERNAL_FEATURES = 1n << 23n;
    static SZ_ENTITY_INCLUDE_FEATURE_STATS = 1n << 24n;

    // Flags for finding entity path data.
    static SZ_FIND_PATH_STRICT_AVOID = 1n << 25n;
    static SZ_FIND_PATH_INCLUDE_MATCHING_INFO = 1n << 30n;
    static SZ_FIND_NETWORK_INCLUDE_MATCHING_INFO = 1n << 33n;

    // Flags for including search result feature scores.
    static SZ_SEARCH_INCLUDE_STATS = 1n << 27n;

    // Flag for returning with info responses.
    static SZ_WITH_INFO = 1n << 62n;

    // Flags for searching for entities.
    static SZ_SEARCH_INCLUDE_RESOLVED = SzEngineFlags.SZ_EXPORT_INCLUDE_MULTI_RECORD_ENTITIES
    static SZ_SEARCH_INCLUDE_POSSIBLY_SAME = SzEngineFlags.SZ_EXPORT_INCLUDE_POSSIBLY_SAME
    static SZ_SEARCH_INCLUDE_POSSIBLY_RELATED = SzEngineFlags.SZ_EXPORT_INCLUDE_POSSIBLY_RELATED
    static SZ_SEARCH_INCLUDE_NAME_ONLY = SzEngineFlags.SZ_EXPORT_INCLUDE_NAME_ONLY
    static SZ_SEARCH_INCLUDE_ALL_CANDIDATES = 1n << 32n;
    static SZ_SEARCH_INCLUDE_REQUEST = 1n << 37n;
    static SZ_SEARCH_INCLUDE_REQUEST_DETAILS = 1n << 38n;

    static SZ_SEARCH_INCLUDE_ALL_ENTITIES = (
        SzEngineFlags.SZ_SEARCH_INCLUDE_RESOLVED
        | SzEngineFlags.SZ_SEARCH_INCLUDE_POSSIBLY_SAME
        | SzEngineFlags.SZ_SEARCH_INCLUDE_POSSIBLY_RELATED
        | SzEngineFlags.SZ_SEARCH_INCLUDE_NAME_ONLY
    )

    // Recommended settings for various API functions.

    // The recommended default flag values for getting records.
    static SZ_RECORD_DEFAULT_FLAGS = SzEngineFlags.SZ_ENTITY_INCLUDE_RECORD_JSON_DATA

    // The recommended default flag values for basic entity output.
    static SZ_ENTITY_CORE_FLAGS = (
        SzEngineFlags.SZ_ENTITY_INCLUDE_REPRESENTATIVE_FEATURES
        | SzEngineFlags.SZ_ENTITY_INCLUDE_ENTITY_NAME
        | SzEngineFlags.SZ_ENTITY_INCLUDE_RECORD_SUMMARY
        | SzEngineFlags.SZ_ENTITY_INCLUDE_RECORD_DATA
        | SzEngineFlags.SZ_ENTITY_INCLUDE_RECORD_MATCHING_INFO
    )

    // The recommended default flag values for getting entities.
    static SZ_ENTITY_DEFAULT_FLAGS = (
        SzEngineFlags.SZ_ENTITY_CORE_FLAGS
        | SzEngineFlags.SZ_ENTITY_INCLUDE_ALL_RELATIONS
        | SzEngineFlags.SZ_ENTITY_INCLUDE_RELATED_ENTITY_NAME
        | SzEngineFlags.SZ_ENTITY_INCLUDE_RELATED_RECORD_SUMMARY
        | SzEngineFlags.SZ_ENTITY_INCLUDE_RELATED_MATCHING_INFO
    )

    // The recommended default flag values for a brief entity result.
    static SZ_ENTITY_BRIEF_DEFAULT_FLAGS = (
        SzEngineFlags.SZ_ENTITY_INCLUDE_RECORD_MATCHING_INFO
        | SzEngineFlags.SZ_ENTITY_INCLUDE_ALL_RELATIONS
        | SzEngineFlags.SZ_ENTITY_INCLUDE_RELATED_MATCHING_INFO
    )

    // The recommended default flag values for exporting entities.
    static SZ_EXPORT_DEFAULT_FLAGS = (SzEngineFlags.SZ_EXPORT_INCLUDE_ALL_ENTITIES | SzEngineFlags.SZ_ENTITY_DEFAULT_FLAGS).toString() as unknown as number;

    // The recommended default flag values for finding entity paths.
    static SZ_FIND_PATH_DEFAULT_FLAGS = (
        SzEngineFlags.SZ_FIND_PATH_INCLUDE_MATCHING_INFO | SzEngineFlags.SZ_ENTITY_INCLUDE_ENTITY_NAME | SzEngineFlags.SZ_ENTITY_INCLUDE_RECORD_SUMMARY
    )
    static SZ_FIND_NETWORK_DEFAULT_FLAGS = (
        SzEngineFlags.SZ_FIND_NETWORK_INCLUDE_MATCHING_INFO | SzEngineFlags.SZ_ENTITY_INCLUDE_ENTITY_NAME | SzEngineFlags.SZ_ENTITY_INCLUDE_RECORD_SUMMARY
    )

    // The recommended default flag values for why-analysis on entities.
    static SZ_WHY_ENTITIES_DEFAULT_FLAGS = (
        SzEngineFlags.SZ_ENTITY_DEFAULT_FLAGS
        | SzEngineFlags.SZ_ENTITY_INCLUDE_INTERNAL_FEATURES
        | SzEngineFlags.SZ_ENTITY_INCLUDE_FEATURE_STATS
        | SzEngineFlags.SZ_INCLUDE_FEATURE_SCORES
    )

    static SZ_WHY_RECORDS_DEFAULT_FLAGS = (
        SzEngineFlags.SZ_ENTITY_DEFAULT_FLAGS
        | SzEngineFlags.SZ_ENTITY_INCLUDE_INTERNAL_FEATURES
        | SzEngineFlags.SZ_ENTITY_INCLUDE_FEATURE_STATS
        | SzEngineFlags.SZ_INCLUDE_FEATURE_SCORES
    )

    static SZ_WHY_RECORD_IN_ENTITY_DEFAULT_FLAGS = (
        SzEngineFlags.SZ_ENTITY_DEFAULT_FLAGS
        | SzEngineFlags.SZ_ENTITY_INCLUDE_INTERNAL_FEATURES
        | SzEngineFlags.SZ_ENTITY_INCLUDE_FEATURE_STATS
        | SzEngineFlags.SZ_INCLUDE_FEATURE_SCORES
    )

    // The recommended default flag values for how-analysis on entities.
    static SZ_HOW_ENTITY_DEFAULT_FLAGS = SzEngineFlags.SZ_INCLUDE_FEATURE_SCORES

    // The recommended default flag values for virtual-entity-analysis on entities.
    static SZ_VIRTUAL_ENTITY_DEFAULT_FLAGS = SzEngineFlags.SZ_ENTITY_CORE_FLAGS

    // The recommended settings for searching by attributes.
    // The recommended flag values for searching by attributes, returning all matching entities.
    static SZ_SEARCH_BY_ATTRIBUTES_ALL = (
        SzEngineFlags.SZ_SEARCH_INCLUDE_ALL_ENTITIES
        | SzEngineFlags.SZ_ENTITY_INCLUDE_REPRESENTATIVE_FEATURES
        | SzEngineFlags.SZ_ENTITY_INCLUDE_ENTITY_NAME
        | SzEngineFlags.SZ_ENTITY_INCLUDE_RECORD_SUMMARY
        | SzEngineFlags.SZ_INCLUDE_FEATURE_SCORES
    )

    // The recommended flag values for searching by attributes, returning only strongly matching entities.
    static SZ_SEARCH_BY_ATTRIBUTES_STRONG = (
        SzEngineFlags.SZ_SEARCH_INCLUDE_RESOLVED
        | SzEngineFlags.SZ_SEARCH_INCLUDE_POSSIBLY_SAME
        | SzEngineFlags.SZ_ENTITY_INCLUDE_REPRESENTATIVE_FEATURES
        | SzEngineFlags.SZ_ENTITY_INCLUDE_ENTITY_NAME
        | SzEngineFlags.SZ_ENTITY_INCLUDE_RECORD_SUMMARY
        | SzEngineFlags.SZ_INCLUDE_FEATURE_SCORES
    )

    // Return minimal data with all matches.
    static SZ_SEARCH_BY_ATTRIBUTES_MINIMAL_ALL = SzEngineFlags.SZ_SEARCH_INCLUDE_ALL_ENTITIES

    // Return minimal data with only the strongest matches.
    static SZ_SEARCH_BY_ATTRIBUTES_MINIMAL_STRONG = SzEngineFlags.SZ_SEARCH_INCLUDE_RESOLVED | SzEngineFlags.SZ_SEARCH_INCLUDE_POSSIBLY_SAME

    // The recommended default flag values for search-by-attributes.
    static SZ_SEARCH_BY_ATTRIBUTES_DEFAULT_FLAGS = SzEngineFlags.SZ_SEARCH_BY_ATTRIBUTES_ALL

    static SZ_WHY_SEARCH_DEFAULT_FLAGS = (
        SzEngineFlags.SZ_INCLUDE_FEATURE_SCORES
        | SzEngineFlags.SZ_SEARCH_INCLUDE_REQUEST_DETAILS
        | SzEngineFlags.SZ_SEARCH_INCLUDE_STATS
    );
}