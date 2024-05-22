"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generatePaginationAndSortOptions = (options) => {
    //: Convert limit and skip to numbers
    const page = options.page ? Number(options.page) : 1;
    const limit = options.limit ? Number(options.limit) : 10;
    const skip = page && limit ? (page - 1) * limit : 0;
    //: sorting
    const sortBy = options.sortBy ? options.sortBy : "createdAt";
    const sortOrder = options.sortOrder ? options.sortOrder : "desc";
    return {
        page,
        take: limit,
        skip,
        sortBy,
        sortOrder,
    };
};
exports.default = generatePaginationAndSortOptions;
