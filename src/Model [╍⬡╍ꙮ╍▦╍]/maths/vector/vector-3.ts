export type Vector3 = [number, number, number];

export class UnitVector3 {

    constructor() {

    }

    static Neutral: Vector3 = [ 0, 0, 0 ];

    static Left:    Vector3 = [-1, 0, 0 ];
    static Right:   Vector3 = [ 1, 0, 0 ];
    static Up:      Vector3 = [ 0, 1, 0 ];
    static Down:    Vector3 = [ 0,-1, 0 ];

    static Forward: Vector3 = [ 0, 0,-1 ];
    static Back:    Vector3 = [ 0, 0, 1 ];
}