export enum promiseStatus {
    "OK",
    "FATAL",
    "ERROR"
}

export interface IPromiseStatus {
    result: promiseStatus;
    message: string;
}

class PromiseType implements IPromiseStatus {

    public result: promiseStatus;
    public message: string;

    constructor(result: number, message: string) {
        this.result = result
        this.message = message
    }
}

export default PromiseType;
