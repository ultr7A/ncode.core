
import { builtin_MultiplyScalar } from "./vector";

import { ObjectType } from "../../../Domain [╍🌐╍🧭╍]/object/object-type.enum";

import { BuiltinFunctionObject, ErrorObject, ArrayObject, Integer, Hash } from "../../object/1_0_object";
import { instanceMethodError  } from "../../util/3_0_object-util";
import { makeBuiltinClass } from "../../util/3_builtin_util";


function initMatrix(cols: number, rows: number): number[] {
    var elements = [];
    for (var xy = 0, len = rows * cols; xy < len; xy++) {
        elements.push(((xy % cols == Math.floor(xy / rows)) ? 1 : 0));
    }
    return elements;
}

function get2DArray(scope: { data: number[], columns: number}): number[][] {
    var cols = scope.columns;
    var data = scope.data;
    var out = [];
    var col = 0;
    var row = [];

    for (var el = 0, l = data.length; el < l; el++) {
        row.push(data[el]);
        col++;
        if (col >= cols) {
            out.push(row);
            row = [];
            col = 0;
        }
    }
    return out;
}

var multiply = function (matColumns: number, matrix: number[], argCols: number, vector: number[]) {
    var matRows = matrix.length / matColumns;
    var out = initMatrix(matRows, argCols);

    var selfRowI = 0;
    while (selfRowI < matRows) {
        var argColJ = 0;
        while (argColJ < argCols) {
            var selfColumnK = 0;
            var acc = 0;
            while (selfColumnK < matColumns) {
                acc += (matrix[(selfRowI * matColumns) + selfColumnK]
                                         *
                     vector[(selfColumnK * argCols) + argColJ]);
                selfColumnK++;
            }
            out[(selfRowI * argCols) + argColJ] = acc;
            argColJ++;
        }
        selfRowI++;
    }
    return out;
}

//TODO: deprecate this pattern after the builtin-refactor to native code:
export interface IMatrixState {
    data: number[];
    columns: number;
}

function MatrixState(data: number[], columns: number) {
    this.data = data;
    this.columns = columns;
}

export const Matrix = makeBuiltinClass("Matrix", 
    [
        ["data", new ArrayObject([]), []],
        ["columns", new Integer(4), []]
    ],
    [
    // ["data", new ArrayObject([])], // TODO: mark this as a js value
    // ["columns", new Integer(4)], // ALSO TODO: generate getters and or setters for native members based on access modifiers
    ["Matrix", new BuiltinFunctionObject<Hash & { Elements: IMatrixState, builtins: typeof MatrixState }>("Matrix", [ObjectType.INTEGER_OBJ], 
        function(scope, jsScope, columns, data) {
            var cols = columns ? columns : 4;
            var matrix = new MatrixState(data || initMatrix(cols, cols), cols);

            if (scope) {
                scope.builtins = matrix;
                return scope;
            }
            return matrix;
        }), 
        []
    ],
    ["set", new BuiltinFunctionObject<Hash & { Elements: IMatrixState }>("set", [ObjectType.ARRAY], 
        function(scope, jsScope, data) {
            if (!jsScope) {
                return new ErrorObject(instanceMethodError);
            }
            jsScope.data = data;
            return data;
        }, null, ["data"]), 
        []
    ],
    [/*static*/ "multiply", new BuiltinFunctionObject<Hash & { Elements: IMatrixState }>("multiply", [ObjectType.INTEGER_OBJ, ObjectType.ARRAY, ObjectType.INTEGER_OBJ, ObjectType.ARRAY], 
        function(scope, jsScope, numColsA: number, matrixA: number[], numColsB: number, matrixB: number[]) {
            if (!jsScope) {
                return new ErrorObject(instanceMethodError);
            } else if (matrixB.length / numColsB != numColsA) {
                return new ErrorObject("Argument rows: " + (matrixB.length / numColsB) + " do not match matrix columns: " + numColsA);
            }

            return multiply(numColsA, matrixA, numColsB, matrixB);
        }), 
        []
    ],
    ["applySelf", new BuiltinFunctionObject<Hash & { Elements: IMatrixState }>("applySelf", [ObjectType.INTEGER_OBJ, ObjectType.ARRAY], 
        function(scope, jsScope, vectorColumns, vector) {
            if (!jsScope) {
                return new ErrorObject(instanceMethodError);
            } else if (vector.length / vectorColumns != jsScope.columns) {
                return new ErrorObject("Argument rows: " + (vector.length / vectorColumns) + " do not match matrix columns: " + jsScope.columns);
            }

            return multiply(jsScope.columns, jsScope.data, vectorColumns, vector);
        }, null, ["data"]), 
        []
    ],
    ["multiplySelf", new BuiltinFunctionObject<Hash & { Elements: IMatrixState }>("multiplySelf", [ObjectType.INTEGER_OBJ, ObjectType.ARRAY], 
        function(scope, jsScope, vectorColumns, vector) {
            if (!jsScope) {
                return new ErrorObject(instanceMethodError);
            } else if (vector.length / vectorColumns != jsScope.columns) {
                return new ErrorObject("Argument rows: " + (vector.length / vectorColumns) + " do not match matrix columns: " + jsScope.columns);
            }
            
            return jsScope.data = multiply(jsScope.columns, jsScope.data, vectorColumns, vector);
        }, null, ["data"]), 
        []
    ],
    ["multiplyScalar", builtin_MultiplyScalar, []],
    ["rotateX", new BuiltinFunctionObject<Hash & { Elements: IMatrixState }>("rotateX", [ObjectType.FLOAT], 
        function(scope, jsScope, angle) {
            if (!jsScope) {
                return new ErrorObject(instanceMethodError);
            }
            var sine = Math.sin(angle), cosine = Math.cos(angle);
            // This should be a JS Array instead of ecs ArrayObject
            var transform = [
                1, 0, 0, 0,
                0, cosine, -sine, 0,
                0, sine, cosine, 0,
                0, 0, 0, 1
            ];
            // scope needs to hold js objects..
            // scope could possibly use 2 halfs // one half for js // one half for ecs
            jsScope.data = multiply(jsScope.columns, jsScope.data, 4, transform);
            return scope;
        }, null, ["data"]), 
        []
    ],
    ["rotateY", new BuiltinFunctionObject<Hash & { Elements: IMatrixState }>(
        "rotateY", 
        [ObjectType.FLOAT], function(scope, jsScope, angle) {
            if (!jsScope) {
                return new ErrorObject(instanceMethodError);
            }
            var sine = Math.sin(angle), cosine = Math.cos(angle);
            var transform = [
                cosine, 0, -sine, 0,
                0, 1, 0, 0,
                sine, 0, cosine, 0,
                0, 0, 0, 1
            ];
            jsScope.data = multiply(jsScope.columns, jsScope.data, 4, transform);
            return scope;
        }, null, ["data"]), 
        []
    ],
    ["rotateZ", new BuiltinFunctionObject<Hash & { Elements: IMatrixState }>("rotateZ", [ObjectType.FLOAT], 
        function(scope, jsScope, angle) {
            if (!jsScope) {
                return new ErrorObject(instanceMethodError);
            }
            var sine = Math.sin(angle), cosine = Math.cos(angle);
            var transform = [
                cosine, -sine, 0, 0,
                sine, cosine, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ];
            jsScope.data = multiply(jsScope.columns, jsScope.data, 4, transform); // TODO: move matrix error handling up a level
            return scope;
        }, null, ["data"]), 
        []
    ],
    ["scaleSelf", new BuiltinFunctionObject<Hash & { Elements: IMatrixState }>("scaleSelf", [ObjectType.ARRAY], 
        function( scope, jsScope, vec) {
            if (!jsScope) {
                return new ErrorObject(instanceMethodError);
            }
            var transform = [
                vec[0], 0, 0, 0,
                0, vec[1], 0, 0,
                0, 0, vec[2], 0,
                0, 0, 0, 1
            ];
            jsScope.data = multiply(jsScope.columns, jsScope.data, 4, transform);
            return scope;
        }, null, ["data"]), 
        []
    ],
    ["translate", new BuiltinFunctionObject<Hash & { Elements: IMatrixState }>("translate", [ObjectType.ARRAY], 
        function( scope, jsScope, translation) {
            if (!jsScope) {
                return new ErrorObject(instanceMethodError);
            }
            var transform = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                translation[0], translation[1], translation[2], 1
            ];
            jsScope.data = multiply(jsScope.columns, jsScope.data, 4, transform);
            return scope;
        }, null, ["data"]), 
        []
    ],
    ["get2DArray", new BuiltinFunctionObject<Hash & { Elements: IMatrixState }>("get2DArray", [], 
        function(scope, jsScope) {
            if (!jsScope) {
                return new ErrorObject(instanceMethodError);
            }
            return get2DArray(jsScope as { data: number[], columns: number });
        }),
        []
    ],
    ["List", new BuiltinFunctionObject<Hash & { Elements: IMatrixState }>("List", [], function(scope, jsScope) {
            if (!jsScope) {
                return new ErrorObject(instanceMethodError);
            }
            return jsScope.data;
        }),
        []
    ],
    ["String", new BuiltinFunctionObject<Hash & { Elements: IMatrixState }>("String", [], function(scope, jsScope) {
            if (!jsScope) {
                return new ErrorObject(instanceMethodError);
            }
            return get2DArray(jsScope as { data: number[], columns: number }).join("\n");
        }),
        []
    ]
]);
