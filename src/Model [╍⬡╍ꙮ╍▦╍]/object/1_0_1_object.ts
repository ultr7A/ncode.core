import { Evaluator } from "src/Domain [╍🌐╍🧭╍]/system/evaluator.js";
import { ObjectType }                   from "../../Domain [╍🌐╍🧭╍]/object/object-type.enum.js";
import { IBlockStatement, IIdentifier, Node } from "../../Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js";
import { STREAM_DIRECTION }             from "../../Domain [╍🌐╍🧭╍]/syntax/stream-direction.enum.js";
import { StreamToken }                  from "../../Domain [╍🌐╍🧭╍]/syntax/stream.tokens.enum.js";
import { Optimizer }                    from "../../Domain [╍🌐╍🧭╍]/system/optimizer.js";

import { GraphOperator } from "../syntax/1_1_0_expression-elements.js";
import { listOfObjectsToNativeList, nativeValueToECSValue } from "../util/3_0_object-util.js";
import { assertBuiltinArgs } from "../util/3_builtin_util.js";
import { InMemoryScalar, EObject, DynamicFunction, BuiltinFunction, FunctionObject, SequenceObject, StructureObject, Hashable, InspectionType } from "./0_1_object-structure.js";
import { ClassMethodObject, ClassPropertyObject, ConceptOperatorObject, GraphEdgeObject, GraphNodeObject, IGraphObject } from "./0_2_object-elements.js";
import { AbstractGraphObject } from "./0_3_abstract-graph-object.js";
import { Environment } from "./1_4_0_environment.js";



export class Null implements InMemoryScalar {
    public readonly Value = null;
    constructor() { }
    public Type() { return ObjectType.NULL };
    public Inspect() { return null; }
}

export class Integer implements InMemoryScalar, Hashable {
    constructor(public Value: number) { }
    public Inspect() { return this.Value; };
    public Type() { return ObjectType.INTEGER_OBJ };
    public HashKey() { return "" + this.Value; }
}

export class Float implements InMemoryScalar, Hashable {
    constructor(public Value: number) { }
    public Inspect() { return this.Value; };
    public Type() { return ObjectType.FLOAT };
    public HashKey() { return "" + this.Value; }
}

export class BooleanObject implements InMemoryScalar, Hashable {
    constructor(public Value: boolean) { }
    public Type() { return ObjectType.BOOLEAN };
    public Inspect() { return this.Value; };
    public HashKey() { return "" + (this.Value ? 1 : 0); }
}

export class StringObject implements InMemoryScalar, Hashable {
    constructor(public Value: string) { }

    public Type() { return ObjectType.STRING }

    public Inspect() { return this.Value; };
    public HashKey() { return "" + this.Value.substr(0, 16); }
}

export class ReturnValue implements EObject {
    constructor(public Value: EObject) { }
    public Type() { return ObjectType.RETURN_VALUE };
    public Inspect() { return this.Value.Inspect(); }
};


export class DynamicFunctionEvaluator {

    private static evaluator: Evaluator<Node, EObject>;
    public  static setExpressionEvaluator(evaluator: Evaluator<Node, EObject>): void {
        this.evaluator = evaluator;
    }    

    public static evaluate(dynamicFunc: DynamicFunction, environment: Environment): ReturnValue {
        return DynamicFunctionEvaluator
                             .evaluator
                             .Eval(
                                dynamicFunc.Body, 
                                environment, 
                                (dynamicFunc as LambdaFunction)?.ObjectContext
                            ) as ReturnValue;
    }
}


export class LambdaFunction implements DynamicFunction {
    constructor(
        public Parameters: IIdentifier[],  public Body: IBlockStatement, 
        public Env: Environment, 
        public Fn?: BuiltinFunction, 
        public ObjectContext?: ClassifiedObject, 
        public ReturnType?: string,        public ParameterTypes?: string[], 
        public stateful = null
    ) { }

    public evaluate(environment: Environment): ReturnValue {
        return DynamicFunctionEvaluator.evaluate(this, environment);
    }

    public Type() { return ObjectType.FUNCTION }

    public Inspect(indentLevel: number = 1) {
        let out = "", params = [] as string[];
        for (let _i = 0, _a = this.Parameters; _i < _a.length; _i++) {
            let p = _a[_i];
            params.push(p.Value);
        }
        
        if (this.ObjectContext && this.ObjectContext.className) {
            out += "{" + this.ObjectContext.className + "} ";
        }

        let indentation = "    ".repeat(indentLevel), outerIndentation = "    ".repeat(indentLevel - 1);
        let strParams = [];

        if (this.ParameterTypes && this.ParameterTypes.length > 0) {
            for (let p = 0, l = this.ParameterTypes.length; p < l; p++) {
                strParams.push(this.ParameterTypes[p] + " " + params[p]);
            }
        } else {
            strParams = params;
        }
        let joinedParams = strParams.join(", ");
        out += ((this.ReturnType ? this.ReturnType + " " : "") + ("fn(" + joinedParams + ")") + (this.ReturnType ? this.ReturnType : ""));
        
                    // TODO: add back Node.String for block statements:
        let body = this.Body.Values.map(statement => statement.NodeName)
            .map(function (v) { return indentation + v; })
            .join("\n");

        out += this.Body.Values.length > 0 ? "\n" + outerIndentation + "{\n" + body + "\n" + outerIndentation + "}" : "{}";
        return out;
    }
}

export class PureFunction implements DynamicFunction {
    constructor(public Parameters: IIdentifier[], public Body: IBlockStatement, 
                public Env?: Environment,        public Fn?: BuiltinFunction, 
                public ReturnType?: string,      public ParameterTypes?: string[]) {  }

    public evaluate(environment: Environment): ReturnValue {
        return DynamicFunctionEvaluator.evaluate(this, environment);
    }

    public Type() { return ObjectType.PURE_FUNCTION }

    public Inspect(indentLevel: number = 1) {
        let out = "", params = [];
        for (let _i = 0, _a = this.Parameters; _i < _a.length; _i++) {
            let p = _a[_i];
            params.push(p.Value);
        }
        let indentation = "    ".repeat(indentLevel), outerIndentation = "    ".repeat(indentLevel - 1);
        let strParams = [];
        if (this.ParameterTypes && this.ParameterTypes.length > 0) {
            for (let p = 0, l = this.ParameterTypes.length; p < l; p++) {
                strParams.push(this.ParameterTypes[p] + " " + params[p]);
            }
        } else {
            strParams = params;
        }
        let joinedParams = strParams.join(", ");
        out += (("fn(" + joinedParams + ")") + (this.ReturnType ? this.ReturnType : ""));
                        
                        // TODO: add back Node.String for block statements:
        let body = this.Body.Values.map(statement => statement.NodeName)
            .map(function (v) { return indentation + v; })
            .join("\n");
        out += this.Body.Values.length > 0 ? "\n" + outerIndentation + "{\n" + body + "\n" + outerIndentation + "}" : "{}";
        return out;
    }
}

//  ** DEPRECATED ** 
export class _BuiltinFunctionObject<ObjectContextType extends Hash = Hash> implements FunctionObject {
    public builtin = true;
    
    constructor(public name: string, public signature: [] | (ObjectType | ObjectType[])[],
                 public Fn: BuiltinFunction<ObjectContextType>, 
                //  public Context?: string, // deprecated 
                 public ObjectContext?: ClassifiedObject, 
                 public stateful?: string[], 
                 public ecsOnly = false // for builtin classes like Math
    ) { }


    private static optimizer: Optimizer;
    
    public static setRuntimeOptimizer(optimizer: Optimizer): void {
        this.optimizer = optimizer;
    }


    public callFromECSRuntime(scope: ClassifiedObject, params: EObject[]): EObject {
        let err = assertBuiltinArgs(params, this.signature.length, null, this.name, this.signature);
        if (err) {
            return err;
        }
        let result = this.Fn.apply(this, [
                //  // Runtime Context (Deprecated)
                // Object context
                scope,
                // JS Builtins (maybe it could be combined with `context` )
                (scope && scope.builtins) ? scope.builtins : null
            ]
            .concat(listOfObjectsToNativeList(params, _BuiltinFunctionObject.optimizer))
        );

        if (result && typeof result.Type === "function") {
            return result;
        }
        return result ? nativeValueToECSValue(result) : NULL;
    }

    public Type() { return ObjectType.BUILTIN }

    public Inspect(indentLevel: number = 1) {                    // \/\/\/ Deprecated???
        let functionSig = this.Fn.toString().split("\n")[0].split("jsScope, ")[1];
        return 'builtin fn' + (indentLevel
            ? "(" + (functionSig
                ? this.decorateSignature(functionSig.split(")")[0])
                : "")
                + ")"
            : "(" + this.Fn.toString() + ")");
    }
    
    public decorateSignature(sig) {
        let splitStr = sig.split(",");

        if (splitStr.length > 1) {
            let out = "";
            for (let idx = 0, len = splitStr.length; idx < len; idx++) {
                let paramType = (this.signature && this.signature[idx]) ? this.signature[idx] + " " : "";
                out += paramType.replace(",", " | ") + splitStr[idx];
                if (idx < len - 1) {
                    out += ", ";
                }
            }
            return out;
        } else {
            return ((this.signature && this.signature.length) ? (this.signature[0] + " ").replace(",", " | ") : "") + splitStr[0];
        }
    }
}

// TODO: revisit this:
export class StreamObject implements SequenceObject<EObject> {
    constructor(public Direction: STREAM_DIRECTION, 
            public Elements = [], public Source, public Sink, public  ReturnType) { }
    
    public Type() { return ObjectType.STREAM }

    public Inspect(indentLevel: number = 1) {
        let out = (this.ReturnType ? this.ReturnType : "");

        out += ((this.Direction + ("" + this.Source.Inspect())) +
            this.Elements.map(function (transform) { return transform.Inspect(); })
                .join(this.Direction == STREAM_DIRECTION.READ ? StreamToken.SOURCE : StreamToken.SINK));

        return out + " " + this.Sink.Inspect();
    }
}


export class ArrayObject implements SequenceObject<EObject> {
    constructor(public Elements: EObject[]) { }

    public Type() { return ObjectType.ARRAY }

    public Inspect() {
        let out = "", elements = [];
        this.Elements.forEach(function (e) {
            elements.push(e.Inspect ? e.Inspect() : null);
        });
        let tableMode = this.Elements.length > 0 && this.Elements[0].Type() == ObjectType.STRING && (this.Elements[0] as StringObject).Value.length > 16;
        out += "[" + (tableMode ? "\n" : "");
        out += (tableMode ? "     " : "") + elements.join(tableMode ? ",\n     " : ", ");
        out += (tableMode ? "\n" : "") + "]";
        return out;
    }
}


export class Hash implements StructureObject<string, EObject> {
    constructor(
        public Elements: {
            [key: string]: EObject;
        }
    ) { }

    public Type() { return ObjectType.HASH }

    public Inspect(indentLevel: number = 1) {
        let out = "";
        // out += this.className ? this.className + " " : "";
        out += "{\n";
        let allPairs = Object.keys(this.Elements);
        let len = allPairs.length;

        allPairs.forEach((key, idx) => {
            let pair = this.Elements[key];
            
            out += "    ".repeat(indentLevel) + /** (modifierStr) +  */ '"' + key + '": ';
            let isString = false;
            if (pair.Type() == ObjectType.STRING) {
                out += '"';
                isString = true;
            }

            out += pair.Inspect(indentLevel + 1) + (idx < len - 1 ? "," : "");
            if (isString) {
                out += '"';
            }
            out += "\n";

        });

        return out + "}";
    }
}

export class ClassifiedObject implements EObject {
    constructor(
        public Constructor: FunctionObject, 
        public className?:  string, 
        public Concept?:    ConceptObject,
        // TODO: remove builtins, once builtin re-write happens
        public builtins:    Record<string, unknown> = {},
        public Methods: {
            [key: string]: ClassMethodObject;
        } = {},
        public Properties: {
            [key: string]: ClassPropertyObject;
        } = {}
    ) { }

    public Inspect(indentLevel = 1): string {

        // let modifierStr = "";
        //     if (pair.modifiers) {
        //         for (let m = 0, l = pair.modifiers.length; m < l; m++) {
        //             modifierStr += modifierNames[m] + " ";
        //         }
        //     }

        return "TODO: Inspect ClassifiedObject";
    }

    public Type() { return ObjectType.CLASSIFIED_OBJECT; }
}

export class WheelObject implements StructureObject<number, EObject> {
    constructor(
        public Elements: { [angle: number]: EObject } 
    ) { }

    public Inspect(indentLevel = 1): string {
        return "TODO: Inspect WheelObject";
    }

    public Type() { return ObjectType.WHEEL_OBJECT; }
}


export class MobiusObject implements StructureObject<number, EObject> {
    constructor(
        public Elements: { [angle: number]: EObject }
    ) { }

    public Inspect(indentLevel = 1): string {
        return "TODO: Inspect MobiusObject";
    }

    public Type() { return ObjectType.MOBIUS_OBJECT; }
}

export class GraphObject extends AbstractGraphObject<EObject> 
    implements EObject, IGraphObject<EObject, GraphOperator> {
    constructor(
        public Nodes: GraphNodeObject<EObject, GraphOperator>[],
        public Edges: GraphEdgeObject<EObject, GraphOperator>[]
    ) { 
        super(Nodes, Edges);
    }

    public Inspect(indentLevel?: number): string {
        return "TODO: implement";
    }

    public Type() { return ObjectType.GRAPH_OBJECT; }
}

export class ConceptObject extends AbstractGraphObject<ConceptObject, ConceptOperatorObject> 
    implements EObject, IGraphObject<ConceptObject, ConceptOperatorObject> {
    constructor(
        public Nodes: GraphNodeObject<ConceptObject, ConceptOperatorObject>[],
        public Edges: GraphEdgeObject<ConceptObject, ConceptOperatorObject>[]
    ) { 
        super(Nodes, Edges);
    }

    
    public Inspect(indentLevel?: number): string {
        return "TODO: implement";
    }

    public Type() { return ObjectType.CONCEPT_OBJECT; }
}


export class ErrorObject implements EObject {
    constructor(public Message: string) { }

    public Type() { return ObjectType.ERROR };
    public Inspect() { return "💀  RUNTIME ERROR: " + this.Message; }
}



export const strBuiltin = new StringObject("builtin");
export const TRUE = new BooleanObject(true);
export const FALSE = new BooleanObject(false);
export const NULL = new Null();