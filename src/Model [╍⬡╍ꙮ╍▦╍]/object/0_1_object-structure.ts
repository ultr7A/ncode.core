
import { Primitive } from "../../Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { GraphNodeObject, GraphEdgeObject } from "./0_2_object-elements";
import { Environment } from "./1_4_0_environment";


export type InspectionType = string | number | boolean | null;
export type JSIndexType = string | number | symbol;

export interface EObject {
    Type: () => string;
    Inspect: (indentLevel?: number) => InspectionType;
};

export interface Hashable extends EObject {
    HashKey(): string;
};

export interface InMemoryScalar extends EObject {
    Value: Primitive
};
export type InMemoryVector<Key extends JSIndexType, Element extends EObject>
    = SequenceObject<Element> | StructureObject<Key, Element>;

export interface SequenceObject<E extends EObject> extends EObject {
    Elements: E[];
};
export interface StructureObject<K extends JSIndexType, E extends EObject> extends EObject {
    Elements: Record<K, E>;
};

/**
 * interface OperatorObject {
 *      ParameterTypes: string[]
 * }
 * 
 */


export interface FunctionObject extends EObject {
    Parameters?: Identifier[];
    Fn?: BuiltinFunction;
    ReturnType?: string;
    ParameterTypes?: string[];
}

export interface DynamicFunction extends FunctionObject {
    Parameters: Identifier[];
    Body: BlockStatement;
    Env?: Environment;
    ReturnType?: string;
    ParameterTypes?: string[];
    stateful?: string[];
}

export type BuiltinFunction<T extends {} = any> = (
    // context?: WorkerContext, 
    scope?: Record<string, unknown>,
    jsScope?: T,
    ...args: any[]
) => any;


export class AbstractGraphObject<V extends EObject = EObject, O = GraphOperator> {
    protected idCounter = 0;

    constructor(
        public Nodes: GraphNodeObject<V, O>[],
        public Edges: GraphEdgeObject<V, O>[]
    ) { }

    public addNode(object: V, id?: string): void {
        this.Nodes.push(new GraphNodeObject<V, O>(this, object, id || (this.idCounter++) + ""))
    }

    public removeNode(id: string): void {
        this.Nodes.splice(this.Nodes.indexOf(this.Nodes.find(node => node.Id === id)), 1);
    }

    public addEdge(from: string, to: string, operator: O): void {
        this.Edges.push(new GraphEdgeObject<V, O>(this, from, to, operator))
    }

    public removeEdge(from: string, to: string, operator: O): void {
        this.Edges.splice(this.Edges.indexOf(this.Edges.find(
            edge => edge.From === from && edge.To === to && edge.Operator === operator
        )), 1);
    }

    public Inspect(indentLevel = 1): string {
        let out = "";

        for (const edge of this.Edges) {
            out += edge.Inspect(indentLevel);
        }

        return out;
    }
}