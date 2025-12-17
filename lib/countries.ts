import rawCountries from "world-countries";

export type Country = {
  name: string;
  code: string;
  emoji: string;
};

const codeToFlag = (code: string) => {
  if (!code) return "";
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
};

export const countries: Country[] = rawCountries
  .map((country) => ({
    name: country.name.common,
    code: country.cca2,
    emoji: country.flag || codeToFlag(country.cca2),
  }))
  .sort((a, b) => a.name.localeCompare(b.name, "en"));

export const countryByCode = (code?: string | null) =>
  countries.find((c) => c.code.toLowerCase() === (code || "").toLowerCase());
