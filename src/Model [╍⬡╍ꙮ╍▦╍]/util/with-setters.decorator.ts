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

 export function WithSetters<C extends { prototype: unknown }>(methods: [string, Function][]) {

    return function (clazz: C, { kind, name }) {

        for (const idx in methods) {
                clazz.prototype["set"+methods[idx][0]] = methods[idx][1];
        }

        return clazz;
    }

}


