
import { builtin_MultiplyScalar } from "src/Model [╍⬡╍ꙮ╍▦╍]/maths/vector";

import { ObjectType } from "../../../Domain [╍🌐╍🧭╍]/object/object-type.enum";

import { _BuiltinFunctionObject, ErrorObject, ArrayObject, Integer, Hash } from "../../object/1_0_1_object";
import { instanceMethodError  } from "../../util/3_0_object-util";
import { makeBuiltinClass, _makeBuiltinClass }     from "../../util/3_builtin_util";
import { rotateX, rotateY, rotateZ, translate } from "../3d/transform-3d";


function initMatrix(cols: number, rows: number): number[] {
    let elements = [];
    for (let xy = 0, len = rows * cols; xy < len; xy++) {
        elements.push(((xy % cols == Math.floor(xy / rows)) ? 1 : 0));
    }
    return elements;
}

function get2DArray(scope: { data: number[], columns: number}): number[][] {
    let cols = scope.columns;
    let data = scope.data;
    let out = [];
    let col = 0;
    let row = [];

    for (let el = 0, l = data.length; el < l; el++) {
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

let multiply = function (matColumns: number, matrix: number[], argCols: number, vector: number[]) {
    let matRows = matrix.length / matColumns;
    let out = initMatrix(matRows, argCols);

    let selfRowI = 0;
    while (selfRowI < matRows) {
        let argColJ = 0;
        while (argColJ < argCols) {
            let selfColumnK = 0;
            let acc = 0;
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

export const Matrix = _makeBuiltinClass("Matrix", 
    [
        ["data", new ArrayObject([]), []],
        ["columns", new Integer(4), []]
    ],
    [
    // ["data", new ArrayObject([])], // TODO: mark this as a js value
    // ["columns", new Integer(4)], // ALSO TODO: generate getters and or setters for native members based on access modifiers
    ["Matrix", new _BuiltinFunctionObject<Hash & { Elements: IMatrixState, builtins: typeof MatrixState }>("Matrix", [ObjectType.INTEGER_OBJ], 
        function(scope, jsScope, columns, data) {
            let cols = columns ? columns : 4;
            let matrix = new MatrixState(data || initMatrix(cols, cols), cols);

            if (scope) {
                scope.builtins = matrix;
                return scope;
            }
            return matrix;
        }), 
        []
    ],
    ["set", new _BuiltinFunctionObject<Hash & { Elements: IMatrixState }>("set", [ObjectType.ARRAY], 
        function(scope, jsScope, data) {
            if (!jsScope) {
                return new ErrorObject(instanceMethodError);
            }
            jsScope.data = data;
            return data;
        }, null, ["data"]), 
        []
    ],
    [/*static*/ "multiply", new _BuiltinFunctionObject<Hash & { Elements: IMatrixState }>("multiply", [ObjectType.INTEGER_OBJ, ObjectType.ARRAY, ObjectType.INTEGER_OBJ, ObjectType.ARRAY], 
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
    ["applySelf", new _BuiltinFunctionObject<Hash & { Elements: IMatrixState }>("applySelf", [ObjectType.INTEGER_OBJ, ObjectType.ARRAY], 
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
    ["multiplySelf", new _BuiltinFunctionObject<Hash & { Elements: IMatrixState }>("multiplySelf", [ObjectType.INTEGER_OBJ, ObjectType.ARRAY], 
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
    ["rotateX", new _BuiltinFunctionObject<Hash & { Elements: IMatrixState }>("rotateX", [ObjectType.FLOAT], 
        function(scope, jsScope, angle) {
            if (!jsScope) {
                return new ErrorObject(instanceMethodError);
            }
            const transform = rotateX(angle);
            // scope needs to hold js objects..
            // scope could possibly use 2 halfs // one half for js // one half for ecs
        
            // TODO:  ^^^ simplify this, by running this as native / and or transpiled code

            jsScope.data = multiply(jsScope.columns, jsScope.data, 4, transform);
            return scope;
        }, null, ["data"]), 
        []
    ],
    ["rotateY", new _BuiltinFunctionObject<Hash & { Elements: IMatrixState }>(
        "rotateY", 
        [ObjectType.FLOAT], function(scope, jsScope, angle) {
            if (!jsScope) {
                return new ErrorObject(instanceMethodError);
            }
            const transform = rotateY(angle);

            jsScope.data = multiply(jsScope.columns, jsScope.data, 4, transform);
            return scope;
        }, null, ["data"]), 
        []
    ],
    ["rotateZ", new _BuiltinFunctionObject<Hash & { Elements: IMatrixState }>("rotateZ", [ObjectType.FLOAT], 
        function(scope, jsScope, angle) {
            if (!jsScope) { return new ErrorObject(instanceMethodError); }
            const transform = rotateZ(angle);

            jsScope.data = multiply(jsScope.columns, jsScope.data, 4, transform); // TODO: move matrix error handling up a level
            return scope;
        }, null, ["data"]), 
        []
    ],
    ["scaleSelf", new _BuiltinFunctionObject<Hash & { Elements: IMatrixState }>("scaleSelf", [ObjectType.ARRAY], 
        function( scope, jsScope, vec) {
            if (!jsScope) {     return new ErrorObject(instanceMethodError);    }
            let transform = [
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
    ["translate", new _BuiltinFunctionObject<Hash & { Elements: IMatrixState }>("translate", [ObjectType.ARRAY], 
        function( scope, jsScope, translation) {
            if (!jsScope) {     return new ErrorObject(instanceMethodError);    }
            const transform = translate(translation[0], translate[1], translate[2]);
            
            jsScope.data = multiply(jsScope.columns, jsScope.data, 4, transform);
            return scope;
        }, null, ["data"]), 
        []
    ],
    ["get2DArray", new _BuiltinFunctionObject<Hash & { Elements: IMatrixState }>("get2DArray", [], 
        function(scope, jsScope) {
            if (!jsScope) {    return new ErrorObject(instanceMethodError);     }
            return get2DArray(jsScope as { data: number[], columns: number });
        }),
        []
    ],
    ["List", new _BuiltinFunctionObject<Hash & { Elements: IMatrixState }>("List", [], function(scope, jsScope) {
            if (!jsScope) {     return new ErrorObject(instanceMethodError);    }
            return jsScope.data;
        }),
        []
    ],
    ["String", new _BuiltinFunctionObject<Hash & { Elements: IMatrixState }>("String", [], function(scope, jsScope) {
            if (!jsScope) {
                return new ErrorObject(instanceMethodError);
            }
            return get2DArray(jsScope as { data: number[], columns: number }).join("\n");
        }),
        []
    ]
]);
