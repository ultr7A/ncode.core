import { EObject, FunctionObject } from "./0_1_object-structure.js";

export class Environment {
    private store;
    outer?: Environment;
    // context: WorkerContext;
    events: {
        [namespace: string]: {
            [eventName: string]: FunctionObject[];
        };
    };

    constructor(outer?: Environment) {
        this.events = {};
        
        this.store = {};
        this.outer = outer;
        // if (context) {
        //     if (this.context) {
        //         context.data = Object.assign(Object.assign({}, this.context.data), context.data);
        //     }
        //     this.context = context;
        // }
    }

    public get(name: string): EObject {
        var value = this.store[name];
        if (value == null && this.outer != null) {
            value = this.outer.get(name);
        }
        return value;
    }

    public set(name: string, value: any): EObject {
        this.store[name] = value; //.set(name, value);
        return value;
    }


    // DEPRECATED:
    // New implementation pending....

    // public getContext() {
    //     return this.context || (this.outer ? this.outer.getContext() : makeSynchronousEventContext(["0.0.0", 0, 0]));
    // }

    // public setContext(name, value) {
    //     this.context.data[name] = value;
    // };
    // /***
    //  * addEventHandler is called from builtin functions to register external observables
    //  */
    // public addEventHandler(system, eventName, callback) {
    //     if (!this.hasEvents(system)) {
    //         this.initEvents(system);
    //     }
    //     if (!this.events[system][eventName]) {
    //         this.events[system][eventName] = [];
    //     }
    //     this.events[system][eventName].push(callback);
    // }
    // /***
    //  * onEvent is called when the web-worker gets an `event` message from outside
    //  * This is the hot path 🔥🔥🔥
    //  */
    // public onEvent(system, eventName, data, interpreter, env, synchronousContext) {  // needs revisiting on high-level
    //     if (this.hasEvents(system)) {
    //         var handlers = this.events[system][eventName], objectArgs = nativeListToListOfObjects(data);
    //         for (var h in handlers) {
    //             interpreter.applyFunction(handlers[h], env, objectArgs); // what could go wrong
    //             // TODO: 
    //         }
    //     }
    // }

    // public hasEvents(system) { // deprecated
    //     return !!this.events[system];
    // }

    // public initEvents(system) { // deprecated
    //     var templateEvents = events[system];
    //     var handlers = {};
    //     for (var e in templateEvents) {
    //         var eventName = templateEvents[e];
    //         handlers[eventName] = [];
    //     }
    //     this.events[system] = handlers;
    // }
}

export function NewEnclosedEnvironment(outer: Environment) {
    return new Environment(outer);
}