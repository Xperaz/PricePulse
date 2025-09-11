import countriesByDiscount from "@/data/countriesByDiscount.json";
import { db } from "@/drizzle/db";
import { CountryGroupTable, CountryTable } from "@/drizzle/schema";
import { sql } from "drizzle-orm";

const groupCount = await updateCountryGroups();
const countriesCount = await updateCountries();

console.log(
  `Updated ${groupCount} country groups and ${countriesCount} countries`
);

async function updateCountryGroups() {
  const countryGroupInsertData = countriesByDiscount.map(
    ({ name, recommendedDiscountPercentage }) => {
      return { name, recommendedDiscountPercentage };
    }
  );

  const { rowCount } = await db
    .insert(CountryGroupTable)
    .values(countryGroupInsertData)
    .onConflictDoUpdate({
      target: CountryGroupTable.name,
      set: {
        recommendedDiscountPercentage: sql.raw(
          `EXCLUDED.${CountryGroupTable.recommendedDiscountPercentage.name}`
        ),
      },
    });

  return rowCount;
}

async function updateCountries() {
  const countryGroups = await db.query.CountryGroupTable.findMany({
    columns: { id: true, name: true },
  });

  const countryInsertData = countriesByDiscount.flatMap(
    ({ countries, name }) => {
      const countryGroup = countryGroups.find((group) => group.name === name);
      if (countryGroup === null || countryGroup === undefined) {
        throw new Error(`Country group not found for name: ${name}`);
      }

      return countries.map((country) => ({
        name: country.countryName,
        code: country.country,
        countryGroupId: countryGroup.id,
      }));
    }
  );

  const { rowCount } = await db
    .insert(CountryTable)
    .values(countryInsertData)
    .onConflictDoUpdate({
      target: CountryTable.code,
      set: {
        name: sql.raw(`EXCLUDED.${CountryTable.name.name}`),
        countryGroupId: sql.raw(`EXCLUDED.${CountryTable.countryGroupId.name}`),
      },
    });

  return rowCount;
}
