declare global {
    interface Object {
        toJson(): string;
    }
}

Object.prototype.toJson = function (): string {
    return JSON.stringify(this);
};

export {};
