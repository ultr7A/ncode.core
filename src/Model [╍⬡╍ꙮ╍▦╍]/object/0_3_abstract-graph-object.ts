import { ObjectType } from "src/Domain [╍🌐╍🧭╍]/object/object-type.enum.js";
import { GraphOperator } from "../syntax/1_1_0_expression-elements.js";
import { EObject } from "./0_0_object-structure.js";
import { AbstractEObject } from "./0_1_object-root.js";
import { GraphNodeObject, GraphEdgeObject } from "./0_2_object-elements.js";

export abstract class   AbstractGraphObject
                        <
                              V extends EObject = EObject, 
                              O = GraphOperator
                        >
                extends AbstractEObject 
{
    protected idCounter = 0;

    constructor(
        public Nodes: GraphNodeObject<V, O>[],
        public Edges: GraphEdgeObject<V, O>[]
    ) { 
        super();
    }

    public addNode(object: V, id?: string): void {
        this.Nodes.push(new GraphNodeObject<V, O>(this, object, id || (this.idCounter++) + ""))
    }

    public removeNode(id: string): void {
        this.Nodes.splice(this.Nodes.indexOf(this.Nodes.find(node => node.Id === id)), 1);
    }

    public addEdge(from: string, to: string, operator: O): void {
        this.Edges.push(new GraphEdgeObject<V, O>(this, from, to, operator))
    }

    public removeEdge(from: string, to: string, operator: O): void {
        this.Edges.splice(this.Edges.indexOf(this.Edges.find(
            edge => edge.From === from && edge.To === to && edge.Operator === operator
        )), 1);
    }

    public Inspect(indentLevel = 1): string {
        let out = "";

        for (const edge of this.Edges) {
            out += edge.Inspect(indentLevel);
        }

        return out;
    }

    abstract Type(): ObjectType;
}