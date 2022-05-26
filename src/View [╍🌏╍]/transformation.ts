/**
 *           ViewTransformation
 * 
 * 
 */

export class ViewTransform3D<Structure extends Record<string, unknown>> 

{

    public field: keyof Structure;

    public matrix:  Matrix4

}


