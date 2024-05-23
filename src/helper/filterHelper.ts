import { Prisma } from "@prisma/client";
import { petSearchAbleFields } from "../app/modules/pet/pet.constant";

const createFilterConditions = (filterOptions: Record<string, unknown>) => {
  //: conditions array
  const conditions: Prisma.PetWhereInput[] = [];

  //:filter options
  const { searchTerm, ...filterData } = filterOptions;

  //: Handling searchTerm
  if (searchTerm) {
    const searchConditions = petSearchAbleFields.map((field) => {
      if (field === "age") {
        // Try to convert searchTerm to an integer
        const parsedAge = parseInt(searchTerm as string);
        if (!isNaN(parsedAge)) {
          return { [field]: parsedAge };
        }
      } else {
        // Perform a case-insensitive contains search for other fields
        return { [field]: { contains: searchTerm, mode: "insensitive" } };
      }
    });

    if (searchConditions.length > 0) {
      conditions.push({
        OR: searchConditions as Prisma.PetWhereInput[],
      });
    }
  }

  if (searchTerm) {
    const searchConditions = petSearchAbleFields.map((field) => {
      if (field === "age") {
        const parseAge = parseInt(searchTerm as string);
        if (!isNaN(parseAge)) {
          return { [field]: parseAge };
        }
      } else {
        return { [field]: { contains: searchTerm, mode: "insensitive" } };
      }
    });

    if (searchConditions.length > 0) {
      conditions.push({
        OR: searchConditions as Prisma.PetWhereInput[],
      });
    }
  }

  //: check if isDeleted is false
  conditions.push({
    isDeleted: false,
  });

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
