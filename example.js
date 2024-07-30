import { SuperClass } from "./concurrent.js";

console.log("Concurrent enabled:");

const Test1 = new SuperClass();
await Promise.all([
    Test1.update("1", { a: 1 }),
    Test1.update("1", { b: 2 }),
    Test1.update("1", { c: 3 }),
    Test1.update("2", { a: 1 }),
    Test1.update("2", { b: 2 }),
    Test1.update("2", { c: 3 }),
]);

console.log('Result:', Test1.db, '\n');
console.log("Concurrent disabled:");

const Test2 = new SuperClass(true);
await Promise.all([
    Test2.update("1", { a: 1 }),
    Test2.update("1", { b: 2 }),
    Test2.update("1", { c: 3 }),
    Test2.update("2", { a: 1 }),
    Test2.update("2", { b: 2 }),
    Test2.update("2", { c: 3 }),
]);

console.log('Result:', Test2.db);
