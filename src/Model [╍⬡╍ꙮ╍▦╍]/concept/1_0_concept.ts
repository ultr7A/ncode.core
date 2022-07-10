import { _CONCEPT } from "./0_1_concept.type.js";

/**
 * 
 * 
 * Concept
 * 
 * 
 */
 export 
 abstract  class Concept<
                    Chain     extends _CONCEPT[] =       _CONCEPT[],
                    Qualities                    = { [name: string]: any }
                        > 
{
   
    abstract name:       string;
    abstract foundation: Chain;
    abstract principles: {
                            [principleName: string]: (c: Concept)=> any
                         }
    abstract qualities:  Qualities 

    protected project(): Concept {
        let output: Concept = this.transform();
        
        for (const idx in this.foundation) {
            const concept = this.foundation[idx];
            
            output = concept.transform(output)
        }

        return output;
    }

    protected transform(output: Concept = this): Concept {
        
        for (const principleName in this.principles) {
            const principle = this.principles[principleName];
            
            this.qualities[principleName] = principle(this);
        }

        return output;
    }

    public apply<T extends Concept<_CONCEPT[]> = Concept<_CONCEPT[]>>(): T {
        return this.project() as T;
    }

}