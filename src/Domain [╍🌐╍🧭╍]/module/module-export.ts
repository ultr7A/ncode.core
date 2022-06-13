import { DataStructureDeclaration, Expression, IIdentifier } from "../syntax/0_1_0_structure-concept";
import { NodeName } from "../syntax/0_1_2_2_structure-implementation.enum";
import { UnParser } from "../system/un-parser";
/**
 * 
 **/
export class ModuleExport implements DataStructureDeclaration  {
    NodeName = NodeName.ExportStatement;
    Identity: IIdentifier;
    Value: Expression;

    UnParse(ctx: UnParser) {
        return ctx.unParse(this);
    }
}