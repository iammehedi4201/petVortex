import { Prisma } from "@prisma/client";
import { petSearchAbleFields } from "../app/modules/pet/pet.constant";

const createFilterConditions = (filterOptions: Record<string, unknown>) => {
  //: conditions array
  const conditions: Prisma.PetWhereInput[] = [];

  //:filter options
  const { searchTerm, ...filterData } = filterOptions;

  //: Handling searchTerm
  if (searchTerm) {
    console.log("searchTerm", searchTerm);

    const buildSearchCondition = (field: string, searchTerm: string) => {
      if (field === "age") {
        const parsedAge = parseInt(searchTerm);
        if (!isNaN(parsedAge)) {
          return { [field]: parsedAge };
        }
      } else {
        return { [field]: { contains: searchTerm, mode: "insensitive" } };
      }
    };

    const searchConditions = petSearchAbleFields
      .map((field) => buildSearchCondition(field, searchTerm as string))
      .filter(Boolean); // Remove any undefined entries

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
