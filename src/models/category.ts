import type { ICategory } from "../interfaces/category";

export class Category implements ICategory {
  _id: string;
  name: string;
  createdAt: string;
  groupCount: string;
  seenCount: number;
  sort: number;

  constructor({ _id, name, createdAt, groupCount, seenCount, sort }: Category) {
    this._id = _id;
    this.name = name;
    this.createdAt = createdAt;
    this.groupCount = groupCount;
    this.seenCount = seenCount;
    this.sort = sort;
  }

  static fromJson(json: ICategory) {
    return new Category(json);
  }
}
