export interface Success<T> {
    isSuccess: true;
    value: T
}
export interface Failure {
    isSuccess: false;
    reason: string
}
export type Result<T> = Success<T> | Failure
export class Results {
    public static success<T>(value: T): Success<T> {
        return {isSuccess: true, value};
    }
    public static failure(reason: string): Failure {
        return {isSuccess: false, reason};
    }
    public static attempt<T>(thingToAttempt: ()=>T): Result<T> {
        try {
            let t: T = thingToAttempt();
            return Results.success(t);
        } catch (e) {
            return Results.failure(e.toString());
        }
    }
}
