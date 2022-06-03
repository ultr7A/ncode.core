/**
 * WithMethods Decorator / Example usage:
 * 
 * @WithMethods([ ["flySomehow", flyUsingJetPropulsion ] ])
 * class Penguin {
 *   public ["🐧"](): string {
 *      return "* things a penguin would do *";
 *   }
 * } 
 * 
 * const tux = new Penguin();
 *       tux.flySomehow();
 */

 export function WithMethods(methods: [string, Function][]) {

    return function (clazz, { kind, name }) {
        
        if (kind === "class") {

            for (const idx in methods) {
                clazz.prototype[methods[idx][0]] = methods[idx][1];
            }

            return clazz;
        }
    }

}


