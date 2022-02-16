import { Operator }         from "../../Domain [╍🌐╍🧭╍]/object/0_operation-types_🔍/1_primitive-operators";
import { ConceptOperator }  from "../../Model [╍⬡╍ꙮ╍▦╍]/syntax/1_1_0_expression-elements";
import { UnParser }         from "../system/un-parser";

/** 🏆 
 * TODO: Change Primitive into [boxed type, extending Node]
 *                             in order to ensure compile-time type checks in un-parsers
*/
export type Primitive = string | number | boolean | null;

/** 💎 Basic building-block of AST     */
export interface Node {
    NodeName: string;
    UnParse: (unParserContext?: UnParser) => string;
};

/** ☯ Any Node with Left and Right as properties   */
export interface Duality<L extends Node = Expression, R extends Node = Expression> extends Node {
    Left: L,
    Right: R,
};

/** 🧩 `DataStructureDeclaration`s of literals like `class` and `concept` require an Identifier to be referenced later.  */
export interface Identity extends Node {
    Identity: IIdentifier;
};

/** 🏅  */               
export interface Value<V = Primitive | Expression | ConceptExpression> extends Node {
    Value: V
};
export type IIdentifier = Value<string>;

/** 🌴  */
export interface Structure       <O = Operator,  R = Expression> extends Operation<O> { Right: R; }
export interface InfixStructure  <O = Operator, LR extends Node = Expression> extends Structure<O, LR>, Duality<LR, LR> {}
export interface PostfixStructure<O = Operator, L  extends Node = Expression> extends Operation<O> { Left: L }
/** 📘 */
export interface Sequence<E = Node> extends Node {   Values: E[]; };
export interface IBlockStatement    extends Sequence<Statement>  {};
/** 
 *    .──𝍁───.
 *   / ⊗ ───↷ᶿ \
 *  / /  .-.  \ \
 *  ▎ ⊕(   )─⊖▕ |
 *  \ \  '-'  / /
 *   \ ◵ ─── ⊘ /
 *    '───𝌼──'
**/
export interface Operation<N> extends Node {
    Operator: N;
}
export interface FunctionNode extends Sequence<IIdentifier>, Consequence { // <FunctionType> extends Operation<FunctionType>, Sequence<IIdentifier>, Consequence {
    // Operator: 
    ParameterTypes: string[];
    ReturnType: string;
} 

/** ⏰🌴 */
export interface ControlInvocation extends Node { Operand: Expression; };

export interface Consequence extends Node { Consequence: IBlockStatement };

/** ⏰🎢 */
export interface ControlStructureInvocation extends ControlInvocation, Consequence { }
/** 📣📘🌴  */
export interface DataStructureDeclaration extends Identity, Value { }

/** ⏰🌴🌴 */
export interface DataOperationInvocation extends ControlInvocation {
    Subject: Expression;
};


// Abstractions:

export interface AbstractOperator<O extends Node> extends Operation<O> {
    Precedence: number
    Operator: O;
}

export interface IGraphEdge<O extends AbstractOperator<V>, K extends Node, V extends Node> extends Structure<O, Duality<K, K>> {};
export interface IGraphNode<K extends Node, V extends Node> extends Duality<K, V> {};
export interface IGraph     <
                                ExpType extends Node, 
                                OpType  extends AbstractOperator<ExpType>, 
                                KeyType extends Node = Value
                            > extends Duality<
                                Sequence<IGraphEdge<OpType, KeyType, ExpType>>, 
                                Sequence<IGraphNode<KeyType, ExpType>        >
                            > 
{
    Left:  Sequence<IGraphEdge<OpType,   KeyType,   ExpType>>,
    Right: Sequence<IGraphNode<KeyType,  ExpType>           >    
};


export enum ConceptValence {
    STRUCTURE = 1,
    SEQUENCE = 2,
    OPERATOR = 3,
    INDIRECTION = 4
}
export interface IConcept {
    valence: ConceptValence,

}

export interface ConceptGraph extends IGraph<ConceptExpression, ConceptOperator> {};
export type ConceptSequence   = Sequence <ConceptOperator      | ConceptExpression>;
export type ConceptStructure  = Structure<ConceptOperator, ConceptExpression>    | 
                           InfixStructure<ConceptOperator, ConceptExpression>;

// Generalizations:

/** 🌾 */
export type Expression        = Value       | Structure        | Sequence        | Duality;
export type ConceptExpression = IIdentifier | ConceptStructure | ConceptSequence | ConceptGraph;

/** 📚 */
export type Statement   = ControlInvocation | ControlStructureInvocation         | 
                    DataOperationInvocation | DataStructureDeclaration;
/* ******************************************************************************************* */

