import humanizeDuration from "humanize-duration";

export const useDurationFormatter = (seconds) => {
  return humanizeDuration(seconds * 1000, {
    units: ["y", "mo", "w", "d", "h", "m", "s"],
    round: true,
    conjunction: " and "
  });
};
