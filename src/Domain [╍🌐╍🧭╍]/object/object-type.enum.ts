
export enum ObjectType {
    // Structure:
    NULL = "null",
    ERROR = "error",
    RETURN_VALUE = "RETURN_VALUE",
    // Primitives are 'structures' 
    //            in the sense that: 
    //            they specify an index within a sequence of possible values:
    //            integers[sequence_number], etc...
    //            
    BOOLEAN = "boolean",
    INTEGER_OBJ = "int",
    FLOAT = "float",
    STRING = "string",

    // Sequence
    ARRAY = "array",
    STREAM = "stream",

    // Opere2ation:
    FUNCTION = "function",
    PURE_FUNCTION = "pure_function",
    BUILTIN = "BUILTIN",
    // Operation-like:
    WHEEL_OBJECT = "wheel_object",
    MOBIUS_OBJECT = "mobius_object",

    // Indirection:
    HASH = "hash",
    CLASSIFIED_OBJECT = "classified_object",
    CONCEPT_OBJECT = "concept_object",
    // Indirection :: Elements:
    CONCEPT_OPERATOR_OBJECT = "concept_operator_object",
    GRAPH_OBJECT = "graph_object",
    GRAPH_NODE_OBJECT = "graph_node_object",
    GRAPH_EDGE_OBJECT = "graph_edge_object"
};