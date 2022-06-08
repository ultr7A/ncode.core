/**
 * /\      [[AST Node] [class name]]
 * :       ::
 */
export enum NodeName {
    // Root:
    Program = "Program",
    BlockStatement = "BlockStatement",


    // Expression:
    //
    //      Structures:
    PrefixExpression = "PrefixExpression",
    InfixExpression = "InfixExpression",
    PrefixConceptExpression = "PrefixConceptExpression",
    InfixConceptExpression = "InfixConceptExpression",
    IndexExpression = "IndexExpression",

    //      Operator-Structures:
    CallExpression = "CallExpression",
    NewExpression = "NewExpression",
    StreamExpression = "StreamExpression",

    //      Expression elements:
    //          Abstract operators:
    GraphOperator = "GraphOperator",
    ConceptOperator = "ConceptOperator",
    ControlFlowOperator = "ControlFlowOperator",
    DataFlowOperator = "DataFlowOperator",



    // Statement:
    //
    //      Module organization:
    ImportStatement = "ImportStatement",
    ExportStatement = "ExportStatement",

    //      Data-Structure declarations:
    LetStatement = "LetStatement",
    ClassStatement = "ClassStatement",
    ConceptStatement = "ConceptStatement",

    //      Data-Operation invocation:
    AssignmentStatement = "AssignmentStatement",
    IndexedAssignmentStatement = "IndexedAssignmentStatement",

    //      Control invocations:
    ReturnStatement = "ReturnStatement",
    ExpressionStatement = "ExpressionStatement",

    //      Control-Structure invocations:
    IfStatement = "IfStatement",
    ForStatement = "ForStatement",
    WhileStatement = "WhileStatement",
    SleepStatement = "SleepStatement",
    ExecStatement = "ExecStatement",



    // Literal:
    //
    //      Literal metaphysical:
    Null    = "Null",
    //
    //      Literal structures:
    //              Primitives:
    Boolean = "Boolean",
    IntegerLiteral = "IntegerLiteral",
    FloatLiteral = "FloatLiteral",
    StringLiteral = "StringLiteral",

    //              Literal-structure elements:
    //                      HashLiteral:
    Pair = "Pair",
    HashPair = "HashPair",

    //              Abstract literal structures:
    HashLiteral = "HashLiteral",

    //      Literal sequences:
    ArrayLiteral = "ArrayLiteral",
    ConceptSequenceLiteral = "ConceptSequenceLiteral",

    //      Literal operators:
    WheelLiteral = "WheelLiteral",
    MobiusLiteral = "MobiusLiteral",
    FunctionLiteral = "FunctionLiteral",
    PureFunctionLiteral = "PureFunctionLiteral",

    //      Literal indirection:
    Identifier = "Identifier",
    ClassLiteral = "ClassLiteral",
    GraphLiteral = "GraphLiteral",
    ConceptGraph = "ConceptGraph",

    //              Literal-indirection elements:
    //                      ClassLiteral:
    ClassPair = "ClassPair",
    ClassProperty = "ClassProperty",
    ClassMethod = "ClassMethod",

    //                      GraphLiteral:
    GraphNode = "GraphNode",
    GraphEdge = "GraphEdge",

    // Abstract nodes:
    AbstractBlock = "AbstractBlock",
    AbstractStatement = "AbstractStatement"
}