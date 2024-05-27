"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Category = void 0;
class Category {
  constructor({
    _id,
    name,
    createdAt,
    groupCount,
    seenCount,
    sort
  }) {
    this._id = _id;
    this.name = name;
    this.createdAt = createdAt;
    this.groupCount = groupCount;
    this.seenCount = seenCount;
    this.sort = sort;
  }
  static fromJson(json) {
    return new Category(json);
  }
}
exports.Category = Category;
//# sourceMappingURL=category.js.map