import { DynamicFunction }   from "../../Model [╍⬡╍ꙮ╍▦╍]/object/0_1_object-structure.js";
import { ClassifiedObject }  from "../../Model [╍⬡╍ꙮ╍▦╍]/object/1_0_1_object.js";
import { Environment }       from "../../Model [╍⬡╍ꙮ╍▦╍]/object/1_4_0_environment.js";
import { ParseTreeAnalysis } from "../4_0_0_meta.js";
import { IBlockStatement }   from "../syntax/0_1_0_structure-concept.js";

export interface Optimizer {

    optimizedEvaluate: (analysis: ParseTreeAnalysis, program: IBlockStatement, env: Environment, fallback: Function) => any;
    compileFunction: (obj: DynamicFunction, env: Environment) => any;
    compileClass: (obj: ClassifiedObject, env: Environment) => any;
    runAsJS: (parseTree: IBlockStatement, env: Environment, jsProgram: string) => any;

}