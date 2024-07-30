import { generateProcess, waitFor } from "./utils.js";

export class SuperClass {
    #processes = [];
    #preventConcurrent;

    constructor(preventConcurrent = false) {
        this.#preventConcurrent = preventConcurrent;
    }

    #getExistingProcesses(id) {
        return this.#processes.filter((process) => process.group === id);
    }

    #startProcess(id) {
        const process = generateProcess(id);
        this.#processes.push(process);
        return process;
    }

    #endProcess(process) {
        this.#processes = this.#processes.filter(({ id }) => id !== process.id);
        process.resolve();
    }

    db = {};

    async #doChangesToDb(id, changes) {
        console.log('doing changes to', id, ":", changes)
        const item = this.db[id] || {};
        await waitFor(1000);
        this.db[id] = { ...item, ...changes };
    }

    async update(id, arg) {
        let process;

        if (this.#preventConcurrent) {
            const existingProcesses = this.#getExistingProcesses(id);
            process = this.#startProcess(id);

            if (existingProcesses.length) {
                await Promise.all(
                    existingProcesses.map(({ promise }) => promise)
                );
            }
        }

        await this.#doChangesToDb(id, arg);

        if (this.#preventConcurrent) {
            this.#endProcess(process);
        }
    }
}
