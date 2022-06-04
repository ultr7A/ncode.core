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

// TODO: re-implement