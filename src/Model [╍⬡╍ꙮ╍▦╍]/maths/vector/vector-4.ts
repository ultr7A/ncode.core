export type Vector4 = [number, number, number, number];

export class UnitVector4 {

    constructor() {

    }

    static Neutral: Vector4 = [ 0,  0,  0,  0 ];

    static Left:    Vector4 = [-1,  0,  0,  0 ];
    static Right:   Vector4 = [ 1,  0,  0,  0 ];
    static Up:      Vector4 = [ 0,  1,  0,  0 ];
    static Down:    Vector4 = [ 0, -1,  0,  0 ];
    
    static Forward: Vector4 = [ 0,  0, -1,  0 ];
    static Back:    Vector4 = [ 0,  0,  1,  0 ];
    static Before:  Vector4 = [ 0,  0,  0, -1 ];
    static After:   Vector4 = [ 0,  0,  0,  1 ];
}