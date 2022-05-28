
import { ObjectType } from "../../Domain [╍🌐╍🧭╍]/object/object-type.enum";
import { EObject, FunctionObject } from "../object/0_1_object-structure";
import { ClassMethodObject, ClassPropertyObject } from "../object/0_2_object-elements";
import { _BuiltinFunctionObject, ClassifiedObject, ConceptObject, ErrorObject, Hash, Integer, StreamObject } from "../object/1_0_1_object";
import { newError } from "./3_0_object-util";


var argsError = "wrong number of arguments. got=%d, want=%d  ";
var posErr = "argument %d ";

export function assertBuiltinArgs(args: EObject[], min: number, max?: number, name?: string, types?: (ObjectType | ObjectType[])[]): ErrorObject {
    const numArgs = args.length;

    if (min && (numArgs < min || !args[min - 1])) {
        return newError(argsError, numArgs+"", min+"");
    }
    if (max && numArgs > max) {
        return newError(argsError + " to %d arguments", numArgs+"", min+"", max+"");
    }
    if (types) {
        for (var i = 0, l = types.length; i < l; i++) {
            var got = args[i].Type() as ObjectType, want = types[i];
            var fail_1 = false;
            if (typeof want === "string") {
                fail_1 = got != want;
            }
            else {
                fail_1 = want.indexOf(got) === -1;
            }
            if (fail_1) {
                return newError(posErr + (name ? " to " + name : "") + " wants %s except it got %s", i+"", want+"", got);
            }
        }
    }
}

function numericArgumentsError(methodName, theArgs, n) {
    if (theArgs.length < n) {
        return newError("Not enough arguments to " + methodName + ". Needs this many: %d, got %s  ", n, (theArgs.length - 2)+"");
    }
    for (var x = 0; x < n; x++) {
        var theArg = theArgs[x];

        if (theArg == null || typeof theArg != "number") {
            return newError("argument " + x + " of " + methodName + " must be float or int, got %s", theArg ? typeof theArg : "null");
        }
    }
    return false;
}

export function makeBuiltinHashmap(methods:  [string, _BuiltinFunctionObject | EObject][]): Hash {
    var elements = {};
    for (var mIdx in methods) {
        var m = methods[mIdx];
        elements[m[0]] = m[1];
    }
    return new Hash(elements);
}

export function makeBuiltinClass(
    className:   string, 
    properties: [string, EObject, number[]][], 
    methods:    [string, _BuiltinFunctionObject | FunctionObject, number[]][],
    concept?: ConceptObject,
): ClassifiedObject {
    const constructor = methods.find(method => method[0] === className)?.[1], 
        methodsMap: {[key: string]: ClassMethodObject } = {},
        propertiesMap: {[key: string]: ClassPropertyObject } = {};

    let builtins;

    for (const idx in properties) {
        var property = properties[idx];

        propertiesMap[property[0]] = new ClassPropertyObject(property[0], property[1], property[2]);
    }

    for (const idx in methods) {
        var method = methods[idx];

        methodsMap[method[0]] = new ClassMethodObject(method[0], method[1], method[2]);
    }

    return new ClassifiedObject(constructor, className, concept, builtins, methodsMap, propertiesMap);
}



export function makeBuiltinEnum(names: string[]): Hash {
    return makeBuiltinHashmap(names.map(function (v, k) { return [v, new Integer(k)]; }));
};

// TODO: revisit this:
function makeBuiltinStream(dataType, direction, transforms, source, sink) {
    return new StreamObject(direction, transforms, source, sink, dataType);
}


// export function makeAPIFromMapOfStringLists(
//     map: {
//         [_: string]: string[];
//     }, 
//     mapper: (namespace: string, method: string) => [string, FunctionObject]
// ): [string, Hash][] {
//     return Object.keys(map)
//         .map(function (v) { return [v, map[v]]; })
//         .filter(function (v) { return v[1].length > 0; })
//         .map(function (eventTarget) { return [
//         eventTarget[0],
//         eventTarget[1].map(function (event) { return mapper(eventTarget[0], event); })
//     ]; })
//         .map(function (v) {
//         var pairs = {}, members = v[1];
//         for (var x in members) {
//             pairs[members[x][0]] = {
//                 Key: new StringObject(members[x][0]),
//                 Value: members[x][1]
//             };
//         }
//         return [v[0], new Hash(pairs)];
//     });
// };

