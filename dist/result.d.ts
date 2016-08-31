export interface Success<T> {
    isSuccess: true;
    value: T;
}
export interface Failure {
    isSuccess: false;
    reason: string;
}
export declare type Result<T> = Success<T> | Failure;
export declare class Results {
    static success<T>(value: T): Success<T>;
    static failure(reason: string): Failure;
    static attempt<T>(thingToAttempt: () => T): Result<T>;
}
