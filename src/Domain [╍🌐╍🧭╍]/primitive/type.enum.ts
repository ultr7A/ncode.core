import { NodeName } from "../syntax/0_1_2_2_structure-implementation.enum.js"

export enum DataType {
    BOOLEAN = "boolean",
    INT = "int",
    FLOAT = "float",
    STRING = "string",
    HASH = "hash",
    ARRAY = "array",
    NULL = "null",
    VOID = "void",
    CLASS_DEFINITION = "class",
    CLASSIFIED_OBJECT = "object",
    FUNCTION = "function"
}



export const NodeName_To_DataType = {
    [NodeName.Boolean]:         DataType.BOOLEAN,
    [NodeName.IntegerLiteral]:  DataType.INT,
    [NodeName.FloatLiteral]:    DataType.FLOAT,
    [NodeName.StringLiteral]:   DataType.STRING,
    [NodeName.HashLiteral]:     DataType.HASH,
    [NodeName.ArrayLiteral]:    DataType.ARRAY,
    
    [NodeName.Null]:            DataType.NULL,
    [NodeName.ClassLiteral]:    DataType.CLASS_DEFINITION,
    
    //TODO: Investigate implementing anonymous classes, 
    //[NodeName]: DataType.CLASSIFIED_OBJECT,
    [NodeName.FunctionLiteral]: DataType.FUNCTION,
}