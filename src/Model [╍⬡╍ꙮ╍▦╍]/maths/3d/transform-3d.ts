import { Identity_Matrix4, Matrix4 } from "../matrix/matrix-4.js";



export function rotateX(angle: number): Matrix4 {
    const sine = Math.sin(angle), cosine = Math.cos(angle);
    
    return [
        1,      0,      0, 0,
        0, cosine,  -sine, 0,
        0,   sine, cosine, 0,
        0,      0,      0, 1
    ];
}

export function rotateY(angle: number): Matrix4 {
    const sine = Math.sin(angle), cosine = Math.cos(angle);
    
    return [
        cosine,  0,  -sine, 0,
        0,       1,      0, 0,
        sine,    0, cosine, 0,
        0,       0,      0, 1
    ];
}

export function rotateZ(angle: number): Matrix4 {
    const sine = Math.sin(angle), cosine = Math.cos(angle);
    
    return [
        cosine, -sine, 0, 0,
        sine,  cosine, 0, 0,
        0, 0,          1, 0,
        0, 0,          0, 1
    ];
}



export function scewX(angle: number): Matrix4 {
    // TODO: implement / refactor out of existing class.
    return Identity_Matrix4;
}

export function skewY(angle: number): Matrix4 {
    // TODO: implement / refactor out of existing class.
    return Identity_Matrix4;
}

export function skewZ(angle: number): Matrix4 {
    // TODO: implement / refactor out of existing class.
    return Identity_Matrix4;
}


export function translate (x:        number, y: number, z: number): Matrix4 {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        x, y, z, 1
    ];
}

export function translateX(distance: number                      ): Matrix4 {
    // TODO: implement / refactor out of existing class.
    return Identity_Matrix4;
}

export function translateY(distance: number                      ): Matrix4 {
    // TODO: implement / refactor out of existing class.
    return Identity_Matrix4;
}

export function translateZ(distance: number                      ): Matrix4 {
    // TODO: implement / refactor out of existing class.
    return Identity_Matrix4;
}


export function scale (size: number): Matrix4 {
    // TODO: implement / refactor out of existing class.
    return Identity_Matrix4;
}
export function scaleX(size: number): Matrix4 {
    // TODO: implement / refactor out of existing class.
    return Identity_Matrix4;
}
export function scaleY(size: number): Matrix4 {
    // TODO: implement / refactor out of existing class.
    return Identity_Matrix4;
}
export function scaleZ(size: number): Matrix4 {
    // TODO: implement / refactor out of existing class.
    return Identity_Matrix4;
}