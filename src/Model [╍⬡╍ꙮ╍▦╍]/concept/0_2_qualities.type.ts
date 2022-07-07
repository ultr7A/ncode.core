import { _CONCEPT } from "./0_1_concept.type.js";
import { Concept }  from "./1_0_concept.js";

/**
 * 
 *  Qualities
 * 
 **/

 export type Qualities<T extends _CONCEPT = _CONCEPT> = Record<string, Concept<T[]>>;
