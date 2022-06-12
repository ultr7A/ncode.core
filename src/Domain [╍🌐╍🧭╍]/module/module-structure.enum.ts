export interface ModuleTopology_LINEAR { code: string }
export interface ModuleTopology_PLANAR { code: string[] }   
export interface ModuleTopology_VOLUME { code: string[][] }

export enum      ModuleTopology_Name {
    LINEAR     = "LINEAR",
    PLANAR     = "PLANAR",
    VOLUMETRIC = "VOLUMETRIC"
};