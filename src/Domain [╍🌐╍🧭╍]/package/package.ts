export class Package {
    
    name:    string;
    author:  string;
    version: string;
    
    moduleRoot = "./dist";
    sourceRoot = "./source";
    dependencies = [];
    devDependencies = [];
    
    pluginConfig: {[pluginName: string]: any } = {}
}