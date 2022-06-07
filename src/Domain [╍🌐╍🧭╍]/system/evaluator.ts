import { Node    }           from "src/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js"
import { ParseTreeAnalysis } from "src/Domain [╍🌐╍🧭╍]/4_0_0_meta.js"

import { EObject }          from "src/Model [╍⬡╍ꙮ╍▦╍]/object/0_1_object-structure.js"
import { Environment }      from "src/Model [╍⬡╍ꙮ╍▦╍]/object/1_4_0_environment.js"
import { ClassifiedObject } from "src/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_1_object.js"


/* *****************************
 * 
 *                                                                           */
export interface Evaluator<INPUT extends Node, OUTPUT extends EObject> {
    Eval(node: INPUT, env: Environment, objectContext?: ClassifiedObject, analysis?: ParseTreeAnalysis): OUTPUT;
}