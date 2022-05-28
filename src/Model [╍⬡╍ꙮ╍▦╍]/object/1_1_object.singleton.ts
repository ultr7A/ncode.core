import { BooleanObject, Null, StringObject } from "./1_0_1_object";

export const strBuiltin = new StringObject("builtin");
export const TRUE = new BooleanObject(true);
export const FALSE = new BooleanObject(false);
export const NULL = new Null();