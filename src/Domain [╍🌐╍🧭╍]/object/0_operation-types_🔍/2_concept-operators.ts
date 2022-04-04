/**
 * Concept operators for describing the relationships between abstract classes:
 *
 */

// export namespace PrimitiveConcept {

    export enum ConceptStructureOperator {
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
    
    export enum ConceptSequenceOperator {
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
    
    export enum ConceptOperatorOperator {
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
    
        
    export type ConceptOperatorType = ConceptStructureOperator |
                                      ConceptSequenceOperator  | 
                                      ConceptOperatorOperator;

// }