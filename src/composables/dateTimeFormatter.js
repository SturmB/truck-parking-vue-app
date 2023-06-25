export const useDateTimeFormatter = (timestamp) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "long"
  }).format(timestamp * 1000);
};
