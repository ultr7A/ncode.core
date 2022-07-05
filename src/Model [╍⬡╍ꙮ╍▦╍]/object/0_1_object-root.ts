import { ObjectType } from "src/Domain [╍🌐╍🧭╍]/object/object-type.enum.js";
import { EObject, InspectionType } from "./0_0_object-structure.js";

/**
 * 
 * Base class    for    evalated objects, 
 *                
 *                      in       
 *                      
 *                      JIT mode.
 * 
 */
export abstract class AbstractEObject implements EObject {

    public IsConstructable(): boolean {
        return  [
            ObjectType.CLASSIFIED_OBJECT,
            ObjectType.HASH,
            ObjectType.ARRAY
        ]      
        .includes(this.Type()) 
    }

    abstract Type(): ObjectType;
    abstract Inspect(indentLevel?: number): InspectionType;

}