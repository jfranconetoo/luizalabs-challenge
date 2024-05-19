import cluster from 'node:cluster';
import { availableParallelism } from 'node:os';

export class AppCluster {
    private _numOfInstances: number;

    constructor(numOfInstances?: number) {
        this.numOfInstances = numOfInstances ?? availableParallelism();
    }

    initialize(cb: () => void) {
        if (cluster.isPrimary) {
            // Fork workers.
            for (let i = 0; i < this._numOfInstances; i++) {
                cluster.fork();
            }
        } else {
            cb();
        }
    }

    set numOfInstances(numOfInstances: number) {
        this._numOfInstances = numOfInstances;
    }
}
