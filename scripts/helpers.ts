export const reduceName = (name?: string) =>
  (name || "").replace(/ /g, "_").replace(/\#/, "").toLowerCase();
