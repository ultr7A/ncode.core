export type Vector2 = [number, number];

export class UnitVector2 {
    constructor() {}

    static Neutral: Vector2 = [ 0, 0 ];

    static Left:    Vector2 = [-1, 0 ];
    static Right:   Vector2 = [ 1, 0 ];
    static Up:      Vector2 = [ 0, 1 ];
    static Down:    Vector2 = [ 0,-1 ];
}