
export function sprintf(s: string, ...a: any[]): string {
    var a = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        a[_i - 1] = arguments[_i];
    }
    var strings = [], numbers = [];
    for (var _a = 0, a_1 = a; _a < a_1.length; _a++) {
        var e = a_1[_a];
        if (typeof e == "string") {
            strings.push(e);
        }
        else {
            numbers.push(e);
        }
    }
    for (var _b = 0, numbers_1 = numbers; _b < numbers_1.length; _b++) {
        var n = numbers_1[_b];
        s = s.replace(/\%d/, n);
    }
    for (var _c = 0, strings_1 = strings; _c < strings_1.length; _c++) {
        var str = strings_1[_c];
        s = s.replace(/\%s/, str);
    }
    return s;
}

export function forceSingleLine(text: string): string {
    text = (text ? (text.indexOf("\n") > -1 ? text.replace(/\n/g, "") : text) : "");
    var l = text.length;
    if (text[l - 2] != ";" && text[l - 1] != ";") {
        text = text + ";";
    }
    return text;
}

export function distance2d(a: number[], b: number[]): number {
    return Math.sqrt(Math.pow((a[0] - b[0]), 2) + Math.pow((a[1] - b[1]), 2));
}

export function isAbstractDataType(dataType: string): boolean {
    if (dataType && dataType.length > 0) {
        var initial = dataType.charCodeAt(0);
        return initial >= 65 && initial <= 90;
    }
    return false;
}


export function scaleString(input, scale) {
    var l = input.length, i = 0, o = "";
    while (i < l) {
        o += input[i].repeat(scale[0]);
        i += 1;
    }
    return o;
};