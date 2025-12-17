declare module "world-countries" {
  const countries: {
    name: { common: string };
    cca2: string;
    flag?: string;
  }[];
  export default countries;
}
