import { DynamicFunction }   from "../../Model [╍⬡╍ꙮ╍▦╍]/object/0_1_object-structure";
import { ClassifiedObject }  from "../../Model [╍⬡╍ꙮ╍▦╍]/object/1_0_1_object";
import { Environment }       from "../../Model [╍⬡╍ꙮ╍▦╍]/object/1_4_0_environment";
import { ParseTreeAnalysis } from "../4_0_0_meta";
import { IBlockStatement }   from "../syntax/0_1_0_structure-concept";

export interface Optimizer {

    optimizedEvaluate: (analysis: ParseTreeAnalysis, program: IBlockStatement, env: Environment, fallback: Function) => any;
    compileFunction: (obj: DynamicFunction, env: Environment) => any;
    compileClass: (obj: ClassifiedObject, env: Environment) => any;
    runAsJS: (parseTree: IBlockStatement, env: Environment, jsProgram: string) => any;

}