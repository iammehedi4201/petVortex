import { Prisma } from "@prisma/client";
import { petSearchAbleFields } from "../app/modules/pet/pet.constant";

const createFilterConditions = (filterOptions: Record<string, unknown>) => {
  //: conditions array
  const conditions: Prisma.PetWhereInput[] = [];

  //:filter options
  const { searchTerm, ...filterData } = filterOptions;

  // Handling searchTerm
  if (searchTerm) {
    conditions.push({
      OR: petSearchAbleFields.map((field) => ({
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

export default createFilterConditions;
