export class Package {
    
    name:    string;
    author:  string;
    version: string;
    
    moduleRoot: "./dist"
    dependencies: [];
    devDependencies: [];
    
    pluginConfig: {[pluginName: string]: any }
}