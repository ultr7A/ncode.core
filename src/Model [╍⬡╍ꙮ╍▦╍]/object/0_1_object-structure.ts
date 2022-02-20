
import { IBlockStatement, IIdentifier, Primitive } from "../../Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
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
    Parameters?: IIdentifier[];
    Fn?: BuiltinFunction;
    ReturnType?: string;
    ParameterTypes?: string[];
}

export interface DynamicFunction extends FunctionObject {
    Parameters: IIdentifier[];
    Body: IBlockStatement;
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

