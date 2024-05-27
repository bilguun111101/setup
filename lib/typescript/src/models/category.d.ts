import type { ICategory } from "../interfaces/category";
export declare class Category implements ICategory {
    _id: string;
    name: string;
    createdAt: string;
    groupCount: string;
    seenCount: number;
    sort: number;
    constructor({ _id, name, createdAt, groupCount, seenCount, sort }: Category);
    static fromJson(json: ICategory): Category;
}
//# sourceMappingURL=category.d.ts.map