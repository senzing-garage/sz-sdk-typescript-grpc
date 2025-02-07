/** first re-export all the SzError types from the classes 
 * we want users to reference this file and not the "SzErrorClasses" file.
*/
export * from './SzErrorClasses'
import { SzErrorCodes } from './SzErrorCodes'

/**
 * @ignore
 */
export const ENGINE_EXCEPTION_MAP = SzErrorCodes;