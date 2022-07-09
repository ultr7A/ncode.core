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
    

    protected project(): Concept {
        let output: Concept = this.transform();
        
        for (const idx in this.definition) {
            const concept = this.definition[idx];
            
            output = concept.transform(output)
        }

        return output;
    }

    public apply<T extends Concept<_CONCEPT[]> = Concept<_CONCEPT[]>>(): T {
        return this.project() as T;
    }

}