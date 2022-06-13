import { DataStructureDeclaration, Expression, IIdentifier } from "../syntax/0_1_0_structure-concept.js";
import { NodeName } from "../syntax/0_1_2_2_structure-implementation.enum.js";
import { UnParser } from "../system/un-parser.js";

/**
 * 
 **/
export class ModuleImport implements DataStructureDeclaration  {
    NodeName = NodeName.ImportStatement;
    Identity: IIdentifier;
    Value: Expression;

    UnParse(ctx: UnParser) {
        return ctx.unParse(this);
    }
}