import { Node, Statement } from "../syntax/0_1_0_structure-concept.js";

export interface UnParser {

    unParse:   (node: Node, config?: { noPlugins?: boolean; }) => string;
    transpile: (node: Node)                                    => string;
    transpileBlock: (statements: Statement[], topScope: boolean) => string;
    
    replaceBuiltinIdentifiers: (identName: string) => string;
    
    getProgramHeader: () => string;

    
    injectedContextUpdate: string;

}