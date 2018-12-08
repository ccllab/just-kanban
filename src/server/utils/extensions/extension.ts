import {ObjectID} from "typeorm";

declare global {
    interface Date {
        addHours(h: number): Date;
    }

    interface Array<T> {
        remove(elem: T): Array<T>;
        objectIdRemove(target: string | ObjectID): Array<ObjectID>;
        intersect(b: T[]): Array<T>;
    }
}

Date.prototype.addHours = function (h: number): Date {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));

    return this;
};

if (!Array.prototype.remove) {
    Array.prototype.remove = function<T>(this: T[], elem: T): Array<T> {
        return this.filter(e => e !== elem);
    };
}

if (!Array.prototype.objectIdRemove) {
    Array.prototype.objectIdRemove = function(this: ObjectID[], target: string | ObjectID): Array<ObjectID> {
        for (let objectId of this) {
            if (objectId.toString() === target) {
                return this.remove(objectId);
            }
        }
    };
}

if (!Array.prototype.intersect) {
    Array.prototype.intersect = function<T>(this: T[], b: T[]): Array<T> {
        let source = new Set(this);
        let target = new Set(b);
        let intersection = new Set([...source].filter(item => target.has(item)));

        return Array.from(intersection);
    };
}

export {};
