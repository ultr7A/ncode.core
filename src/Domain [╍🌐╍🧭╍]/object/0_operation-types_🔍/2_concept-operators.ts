/**
 * Concept operators for describing the relationships between abstract classes:
 *
 */

export namespace PrimitiveConcept {

    export enum StructureOperator {
        //       ConceptPrecedence.PREPOSITION
        OF       = "(of)",
        AS       = "(as)",
        FOR      = "(for)",
        THROUGH  = "(through)",
        BETWEEN  = "(between)",

        //       ConceptPrecedence.SUBORDINATE_CONJ
        WHAT     = "(what)",
        WHERE    = "(where)",
        WHEN     = "(when)",
        HOW      = "(how)",
        WHY      = "(why)",   
                 /// ^^^ seems less likely
    
        //       ConceptPrecedence.LOGICAL
        AND      = "(&&)",
        OR       = "(||)",
        NOT      = "(!)",
        IS       = "(==)",
        HAS      = "(has)",

        //       ConceptPrecedence.ARTICLE
        THE      = "(the)",
        A        = "(a)",

        //       ConceptPrecedence.DETERMINER
        S        = "(s)",
        EACH     = "(each)",
        SOME     = "(some)",
        EVERY    = "(every)",
        ALL      = "(all)",
        PART     = "(part)",
        NO       = "(no)",
    }
    
    export enum SequenceOperator {
        //       ConceptPrecedence.LOWEST
        PROJECT  = "(PROJECT)",
        EXTEND   = "(+)",
        SUBTRACT = "(-)",

        //       ConceptPrecedence.IMPERATIVE
        FIND      = "(find)",
        SORT      = "(sort)",
        TRANSFORM = "(transform)",
        AGGREGATE = "(aggregate)",
        GROUP     = "(group)",
    }
    
    export enum OperatorOperator {
        //       ConceptPrecedence.IMPERATIVE
        WILL     = "(will)",
        DO       = "(do)",
        DOES     = "(does)",

        //       ConceptPrecedence.IMPERATIVE
        MAKE      = "(make)",
        ADD       = "(add)",
        REMOVE    = "(remove)",
        READ      = "(read)",
        WRITE     = "(write)",
    }
    
        
    export type OperatorType = StructureOperator |
                                      SequenceOperator  | 
                                      OperatorOperator;

}