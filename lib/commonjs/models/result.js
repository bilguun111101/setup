"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Result = void 0;
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
class Result extends _xsCoreNative._Result {
  constructor({
    rows,
    count,
    nextPage
  }) {
    super({
      rows,
      count
    });
    this.nextPage = nextPage;
  }
  static toFlat = data => {
    let rows = (data || []).map(item => item.rows).flat();
    return rows;
  };
  static reverseToFlat = (rows, limit) => {
    let flatRows = [];
    let flatCount = rows.length / limit;
    for (let i = 0; i < flatCount; i++) {
      flatRows.push(rows.splice(0, limit));
    }
    let flatData = flatRows.map(rows => {
      return Result.fromJson({
        rows,
        count: rows.length
      });
    });
    return flatData;
  };
  static fromJson({
    rows,
    count,
    nextPage
  }) {
    return new Result({
      rows,
      count,
      nextPage
    });
  }
}
exports.Result = Result;
//# sourceMappingURL=result.js.map