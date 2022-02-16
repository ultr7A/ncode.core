/**
 * Standard operators, available in most programming languages:
 * 
 * Most of these correspond to machine instructions. 
*/
export enum Operator {
    //  Ubiquitous
    //      Mutation    
    ADD = "+",
    TYPEOF = "typeof",

    //      Comparison
    //          Equality
    EQUALITY = "==",

    //          Inequality
    NOT_EQUAL = "!=",
    LESS_THAN = "<",
    GREATER_THAN = ">",

    //  Boolean
    LOGICAL_NOT = "!",
    LOGICAL_CONJUNCTION = "&&",
    LOGICAL_DISJUNCTION = "||",

    //  Numeric
    SUBTRACT = "-",
    MULTIPLY = "*",
    DIVIDE = "/",

    //      Integer
    MOD = "%",

    //  Object
    //      Access
    PROPERTY_ACCESS = "."

}