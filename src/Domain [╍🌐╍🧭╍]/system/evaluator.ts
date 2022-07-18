import { Node    }           from "../syntax/0_1_0_structure-concept.js"
import { ParseTreeAnalysis } from "../4_0_0_meta.js"

import { EObject }          from "../../Model [╍⬡╍ꙮ╍▦╍]/object/0_0_object-structure.js"
import { Environment }      from "../../Model [╍⬡╍ꙮ╍▦╍]/object/1_4_0_environment.js"
import { ClassifiedObject } from "../../Model [╍⬡╍ꙮ╍▦╍]/object/1_0_1_object.js"


/* *****************************
 * 
 *                                                                           */
export interface Evaluator<INPUT extends Node, OUTPUT extends EObject> {
    Eval(node: INPUT, env: Environment, objectContext?: ClassifiedObject, analysis?: ParseTreeAnalysis): OUTPUT;
}