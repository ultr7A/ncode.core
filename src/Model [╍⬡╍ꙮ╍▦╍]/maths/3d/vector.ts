import { ObjectType } from "../../../Domain [╍🌐╍🧭╍]/object/object-type.enum";

import { BuiltinFunctionObject, ErrorObject, ArrayObject } from "../../object/1_0_object";
import { instanceMethodError  } from "../../util/3_0_object-util";
import { makeBuiltinClass } from "../../util/3_builtin_util";

export interface IVectorState { data: number[] }

// TODO: deprecate this pattern, once builtins are written natively
function VectorState(data: number[]) {
    this.data = data;
}

export const multiplyScalar = function(scope, jsScope, scalar) {
    var matrix = jsScope.data, elements = [];
    for (var i = 0, elems = matrix.length; i < elems; i++) {
        elements.push(matrix[i] * scalar);
    }
    return elements;
};

export const builtin_MultiplyScalar = new BuiltinFunctionObject('multiplyScalar', 
    [[ObjectType.FLOAT, ObjectType.INTEGER_OBJ]],
    function(scope, jsScope, scalar) {
        return multiplyScalar(scope, jsScope, scalar);
    }
);

function addVectors(into: number[], argEls: number[], sign: 1 | -1) {
    into[0] += argEls[0] * sign;
    into[1] += argEls[1] * sign;
    switch (argEls.length) {
        case 4:
            into[2] += argEls[2] * sign;
            into[3] += argEls[3] * sign;
            return into;
        case 2:
            return into
        default:
            for (var i = 2, l = into.length; i < l; i++) {
                into[i] += argEls[i] * sign;
            }
    }
    return into;
}

function crossProduct(vector: [number, number, number], other: [number, number, number]): [number, number, number] {
    const ax = vector[0], ay = vector[1], az = vector[2];
    const bx = other[0], by = other[1], bz = other[2];

    return [
        ay * bz - az * by,
        az * bx - ax * bz,
        ax * by - ay * bx
    ];
}

export const Vector = makeBuiltinClass("Vector", 
    [
        ["data", new ArrayObject([]), []]
    ],
    [
    //["data", new object.ArrayObject([])],
    ["Vector", new BuiltinFunctionObject<IVectorState>("Vector", [],
        function(scope, jsScope, data) {
            var vector = new VectorState(data || [0, 0, 0, 1]);
            if (scope) {
                scope.builtins = vector;
                return scope;
            }
            return vector;
        }),
        []
    ],
    [/* static */ "add", new BuiltinFunctionObject<IVectorState>("add", [ObjectType.ARRAY],
		function(scope, jsScope, vector, other) {
            if (!jsScope) {
                return new ErrorObject(instanceMethodError);
            }
            return addVectors(vector, other, 1);
        }),
        []
    ],
    [/* static */ "sub", new BuiltinFunctionObject<IVectorState>("sub", [ObjectType.ARRAY],
		function(scope, jsScope, vector, other) {
            if (!jsScope) {
                return new ErrorObject(instanceMethodError);
            }
            return addVectors(vector, other, -1);
        }),
        []
    ],
    ["addSelf", new BuiltinFunctionObject<IVectorState>("addSelf", [ObjectType.ARRAY],
		function(scope, jsScope, other) {
            if (!jsScope) {
                return new ErrorObject(instanceMethodError);
            }
            jsScope.data = addVectors(jsScope.data, other, 1);
            return jsScope.data;
        }, null, ["data"]),
        []
    ],
    ["subSelf", new BuiltinFunctionObject<IVectorState>("subSelf", [ObjectType.ARRAY],
		function(scope, jsScope, other) {
            if (!jsScope) {
                return new ErrorObject(instanceMethodError);
            }
            jsScope.data = addVectors(jsScope.data, other, -1);
            return jsScope.data;
        }, null, ["data"]),
        []
    ],
    ["dot", new BuiltinFunctionObject<IVectorState>("dot", [ObjectType.ARRAY],
		function(scope, jsScope, other) {
            if (!jsScope) {
                return new ErrorObject(instanceMethodError);
            }
            var data = jsScope.data;
            if (data.length == 3) {
                return data[0] * other[0] + data[1] * other[1] + data[2] * other[2];
            }
            var sum = 0;
            for (var e = 0, l = data.length; e < l; e++) {
                sum += data[e] * other[e];
            }
            return sum;
        }),
        []
    ],
    [/* static */ "cross", new BuiltinFunctionObject<IVectorState>("cross", [ObjectType.ARRAY, ObjectType.ARRAY],
		function(scope, jsScope, vector, other) {
            if (!jsScope) {
                return new ErrorObject(instanceMethodError);
            }
            return crossProduct(vector, other);
        }),
        []
    ],
    ["crossSelf", new BuiltinFunctionObject<IVectorState>("crossSelf", [ObjectType.ARRAY],
		function(scope, jsScope, other) {
            if (!jsScope) {
                return new ErrorObject(instanceMethodError);
            }
            return jsScope.data = crossProduct(jsScope.data as [number, number, number], other);
        }, null, ["data"]),
        []
    ],
    ["multiplyScalar", builtin_MultiplyScalar, []],
    ["String", new BuiltinFunctionObject<IVectorState>("String", [],
		function(scope, jsScope) {
            if (!jsScope) {
                return new ErrorObject(instanceMethodError);
            }
            return jsScope.data.map(function (el) { return el + ""; }).join(", ");
        }),
        []
    ],
    ["List", new BuiltinFunctionObject<IVectorState>("List", [],
		function(scope, jsScope) {
            if (!jsScope) {
                return new ErrorObject(instanceMethodError);
            }
            return jsScope.data.concat([]);
        }),
        []
    ]
]);
