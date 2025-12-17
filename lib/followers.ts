type MaybeNumeric = string | number | null | undefined;

const parseCount = (value: MaybeNumeric) => {
  if (value === null || value === undefined) return 0;
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;

  const upper = value.toUpperCase().trim().replace(/,/g, "").replace(/\+/g, "");
  const multiplier = upper.endsWith("M") ? 1_000_000 : upper.endsWith("K") ? 1_000 : 1;
  const numericPart = upper.replace(/[^0-9.]/g, "");
  const parsed = Number.parseFloat(numericPart);
  if (Number.isNaN(parsed)) return 0;
  return parsed * multiplier;
};

const formatCount = (value: number) => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return value.toString();
};

export const calculateTotalFollowers = (input: {
  instagram_followers?: MaybeNumeric;
  tiktok_followers?: MaybeNumeric;
  youtube_subscribers?: MaybeNumeric;
  facebook_followers?: MaybeNumeric;
}) => {
  const total =
    parseCount(input.instagram_followers) +
    parseCount(input.tiktok_followers) +
    parseCount(input.youtube_subscribers) +
    parseCount(input.facebook_followers);
  return {
    total,
    formatted: formatCount(total),
  };
};
