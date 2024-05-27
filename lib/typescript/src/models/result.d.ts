import { _Result } from "@goodtechsoft/xs-core-native";
import type { IResult } from "../interfaces/result";
declare class Result<T extends {
    _id: string;
}> extends _Result<T> implements IResult<T> {
    nextPage?: string;
    constructor({ rows, count, nextPage }: any);
    static toFlat: <T_1 extends {
        _id: string;
    }>(data?: IResult<T_1>[] | undefined) => T_1[];
    static reverseToFlat: <T_1 extends {
        _id: string;
    }>(rows: T_1[], limit: number) => IResult<T_1>[];
    static fromJson<T extends {
        _id: string;
    }>({ rows, count, nextPage, }: any): IResult<T>;
}
export { Result };
//# sourceMappingURL=result.d.ts.map