"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const pet_constant_1 = require("../app/modules/pet/pet.constant");
const createFilterConditions = (filterOptions) => {
    //: conditions array
    const conditions = [];
    //:filter options
    const { searchTerm } = filterOptions, filterData = __rest(filterOptions, ["searchTerm"]);
    // Handling searchTerm
    if (searchTerm) {
        conditions.push({
            OR: pet_constant_1.petSearchAbleFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    //:filter Data
    if (Object.keys(filterData).length > 0) {
        conditions.push({
            AND: Object.entries(filterData).map(([key, value]) => ({
                [key]: {
                    equals: key === "age" ? Number(value) : value, //: age is integer type so we need to convert it to number
                },
            })),
        });
    }
    return conditions;
};
exports.default = createFilterConditions;
