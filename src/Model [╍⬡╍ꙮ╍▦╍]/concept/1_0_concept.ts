import { _CONCEPT } from "./0_1_concept.type.js";

/**
 * 
 * 
 * Concept
 * 
 * 
 */
 export abstract class Concept<Chain extends _CONCEPT[] = _CONCEPT[]> {

    abstract transform(input?: Concept): Concept<Chain>;
    abstract definition:                 Chain;
    
    //public   qualities:  { [name: string]: Concept } = {};
    //public   principles: { [name: string]: Concept } = {};


    protected project(): Concept {
        let output: Concept = this.transform();
        
        for (const idx in this.definition) {
            const concept = this.definition[idx];
            
            output = concept.transform(output)
        }

        return output;
    }


}