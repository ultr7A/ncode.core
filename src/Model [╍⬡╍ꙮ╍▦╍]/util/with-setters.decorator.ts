/**
 * WithSetters Decorator / Example usage:
 * 
 * @WithSetters([ ["StomachContents", (food)=> { this.stomachContents.push(food); } ] ])
 * class Penguin {
 *   public ["🐧"](): string {
 *      return "* things a penguin would do *";
 *   }
 * } 
 * 
 * const tux = new Penguin();
 *       tux.setStomachContents("") 
 */

 export function WithSetters(methods: [string, Function][]) {

    return function (clazz: Function, { kind, name }) {
        
        if (kind === "class") {

            for (const idx in methods) {
                clazz.prototype["set"+methods[idx][0]] = methods[idx][1];
            }

            return clazz;
        }
    }

}


