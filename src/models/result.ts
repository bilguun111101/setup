import { _Result } from "@goodtechsoft/xs-core-native";
import type { IResult } from "../interfaces/result";

class Result<T extends { _id: string }>
  extends _Result<T>
  implements IResult<T> {
  nextPage?: string;

  constructor({ rows, count, nextPage }: any) {
    super({ rows, count });

    this.nextPage = nextPage;
  }

  static toFlat = <T extends { _id: string }>(data?: IResult<T>[]) => {
    let rows = (data || []).map(item => item.rows).flat();

    return rows;
  };

  static reverseToFlat = <T extends { _id: string }>(
    rows: T[],
    limit: number,
  ) => {
    let flatRows: T[][] = [];
    let flatCount = rows.length / limit;

    for (let i = 0; i < flatCount; i++) {
      flatRows.push(rows.splice(0, limit));
    }

    let flatData = flatRows.map(rows => {
      return Result.fromJson<T>({ rows, count: rows.length });
    });

    return flatData;
  };

  static fromJson<T extends { _id: string }>({
    rows,
    count,
    nextPage,
  }: any): IResult<T> {
    return new Result<T>({
      rows,
      count,
      nextPage,
    });
  }
}

export { Result };
