
import { ObjectType } from "../../Domain [╍🌐╍🧭╍]/object/object-type.enum";
import { Optimizer }  from "../../Domain [╍🌐╍🧭╍]/system/optimizer";
import { EObject, InMemoryScalar, DynamicFunction } from "../object/0_1_object-structure";
import { ClassPropertyObject }                      from "../object/0_2_object-elements";
import { 
    ArrayObject, BooleanObject, ClassifiedObject, ErrorObject,
    Float, Hash, Integer, LambdaFunction, StringObject 
} 
                                from "../object/1_0_object";

import { TRUE, FALSE, NULL }    from "../object/1_1_object.singleton";
import { Environment }  from "../object/1_4_0_environment";
import { sprintf }      from "./1_ubiquitous-util";



export const instanceMethodError = "non-static, instance methods must be called on an instance";

// things
export function copyListElements(list: ArrayObject): any[] {
    var newElements = [], elements = list.Elements;
    for (var x = 0, l = elements.length; x < l; x++) {
        newElements.push(copyObject(elements[x]));
    }
    return newElements;
}
export function copyList (list: ArrayObject): ArrayObject {
    return new ArrayObject(copyListElements(list));
};

// stuff
export function copyHashMap(data: Hash): Hash {
    var allKeys = Object.keys(data.Elements), pairData = data.Elements;
    var pairs = {};

    for (var pk in allKeys) {
        pairs[pk] = copyObject(pairData[pk]);
    }
    
    return new Hash(pairs);
}
export function copyClassifiedObject(data: ClassifiedObject): ClassifiedObject {
    var objectContext = null;
    var propertyKeys = Object.keys(data.Properties);
    var methodKeys = Object.keys(data.Methods);
    var properties = {};
    var methods = {};

    for (var pk in propertyKeys) {
        let pairKey = propertyKeys[pk], pair = data.Properties[pairKey], 
            isStatic = pair.modifiers && pair.modifiers.indexOf(4) > -1;
 
        if (isStatic) {
            properties[pk] = pair;
        } else {
            let newPair: ClassPropertyObject
                 = { Key: pk, Value: copyObject(pair.Value, objectContext), modifiers: [] };
            
            if (pair.modifiers) {
                newPair.modifiers = pair.modifiers;
            }
            properties[pk] = newPair;
        }
    }

    methods = data.Methods;

    let constructorFunctionObject = data.Constructor;

    return (objectContext = new ClassifiedObject(
                constructorFunctionObject, 
                data.className, 
                data.Concept, 
                data.builtins, 
                methods, 
                properties
            ));
}

// atomicity
function copyObject(valueNode: EObject, objectContext?: ClassifiedObject) {
    switch (valueNode.Type()) {
        case "boolean":
            return new BooleanObject((valueNode as InMemoryScalar).Value as boolean);
        case "int":
            return new Integer((valueNode as InMemoryScalar).Value as number);
        case "float":
            return new Float((valueNode as InMemoryScalar).Value as number);
        case "string":
            return new StringObject((valueNode as InMemoryScalar).Value as string);
        case "array":
            return copyList(valueNode as ArrayObject);
        case "hash":
            return copyHashMap(valueNode as Hash);
        case "classified_object":
            return copyClassifiedObject(valueNode as ClassifiedObject);
        case "function":
            return copyFunction(valueNode as LambdaFunction, objectContext);
        case "BUILTIN":
            return valueNode;
        default:
            return NULL;
    }
}

function copyFunction(fn: LambdaFunction, objectContext: ClassifiedObject): LambdaFunction {
    return new LambdaFunction(fn.Parameters, fn.Body, fn.Env, fn.Fn, objectContext, fn.ReturnType, fn.ParameterTypes);
}


// conversion utils:
export function nativeValueToECSValue (element: any, objectToClassifiedObject = false) {
    if (element === null || element === undefined) {
        return NULL;
    }

    switch (typeof element) {
        case "string":
            return new StringObject(element);
        case "number":
            return element % 1 == 0 ? new Integer(element) : new Float(element);
        case "boolean":
            return new BooleanObject(element);
        case "object":
            if (typeof element.length == "number") {
                return nativeListToArray(element);
            } else {
                if (objectToClassifiedObject) {
                    return nativeObjToClassifiedObject(element);
                }

                return nativeObjToMap(element);
            }
        case "function":
            // this could work actually
            return NULL;
        default:
            return NULL;
    }
}

export function nativeBoolToBooleanEObject(input: boolean) {
    if (input) {
        return TRUE;
    }
    return FALSE;
}


export function nativeListToArray (obj: any[]) {
    return new ArrayObject(nativeListToListOfObjects(obj));
};

export function listOfObjectsToNativeList(list: EObject[], opt?: Optimizer) {
    var out = [];

    for (var elem = 0, len = list.length; elem < len; elem++) {
        out.push(ecsObjectToNativeObject(list[elem], opt));
    }
    return out;
}

export function nativeListToListOfObjects(obj): EObject[] {
    var out = [] as EObject[];

    for (var elem = 0, len = obj.length; elem < len; elem++) {
        out.push(nativeValueToECSValue(obj[elem]));
    }

    return out;
}

export function numberArrayToFloatArray(numbers) {
    var elems = [], arr = new ArrayObject(elems);

    for (var n = 0, len = numbers.length; n < len; n++) {
        elems.push(new Float(numbers[n]));
    }
    return arr;
}
export function nativeObjToMap(obj: Record<string, any> = {}) {
    var map = new Hash({});

    for (var objectKey in obj) {
        map.Elements[objectKey] = nativeValueToECSValue(obj[objectKey]);
    }
    return map;
};
export function nativeObjToClassifiedObject(obj: Record<string, any> = {}) {
    const classyObject = new ClassifiedObject(new LambdaFunction([], null, null, null, null));

    for (var objectKey in obj) {
        classyObject.Properties[objectKey] = new ClassPropertyObject(objectKey, nativeValueToECSValue(obj[objectKey]), []);
    }

    return classyObject;
}

export function assignNativeProperties(to: Hash, from: Record<string, any>) {
    var keys = Object.keys(from);

    for (var x = 0, l = keys.length; x < l; x++) {
        var key = keys[x];
        to.Elements[key] = nativeValueToECSValue(from[key]);
    }
};

export function assignNativePropertiesToJSObj(to, from) {
    var keys = Object.keys(from);

    for (var x = 0, l = keys.length; x < l; x++) {
        var key = keys[x];
        to.Pairs[key] = from[key];
    }
};

export function ecsObjectToNativeObject(obj: EObject, opt?: Optimizer, env?: Environment): any {
    switch (obj.Type()) {
        case ObjectType.STRING:
        case ObjectType.INTEGER_OBJ:
        case ObjectType.FLOAT:
        case ObjectType.BOOLEAN:
            return obj.Inspect();
        case ObjectType.HASH:
            return objectToNativeObject(obj as Hash);
        case ObjectType.ARRAY:
            return arrayToNativeList(obj as ArrayObject, opt, env);
        case "function":
            return opt ? opt.compileFunction(obj as DynamicFunction, env) : null;
        case ObjectType.ERROR:
            return obj.Inspect();
        default:
    }
};

export function objectToNativeObject(map: Hash) {
    var obj = {}, pairs = map.Elements;
    for (var objectKey in pairs) {
        obj[objectKey] = ecsObjectToNativeObject(pairs[objectKey]);
    }
    return obj;
};

export function arrayToNativeList(arr: ArrayObject, opt?: Optimizer, env?: Environment): any[] {
    return arr.Elements.map(function (val) { return (ecsObjectToNativeObject(val, opt, env)); });
};

export function nativePairValue(hash: Hash, key: string): string | number | boolean { return hash.Elements[key].Inspect(); };


export function newError(format: string, ...params: string[]) {
    return new ErrorObject(sprintf.apply(void 0, [format, ...params, '\u0007']));
}