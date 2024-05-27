import { Result } from "../models/result";

export interface IResult<T extends { _id: string }> extends Result<T> {
  changeByIndex: (data: T, index: number) => IResult<T>;
  changeById: (data: T, id: string) => IResult<T>;
  removeByIndex: (index: number) => IResult<T>;
}
