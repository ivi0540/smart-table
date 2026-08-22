import { createComparison } from "../lib/compare.js";

export function initSearching(searchField) {
  // @todo: #5.1 — настроить компаратор
  // const compare = createComparison([
  //     (row, state) => {
  //         const searchText = state[searchField]?.toLowerCase() || "";
  //         if (!searchText) return true;

  //         const fields = ["date", "customer", "seller"];
  //         return fields.some((field) => {
  //             const value = row[field]?.toString().toLowerCase() || "";
  //             return value.includes(searchText);
  //         });
  //     }
  // ]);

  return (data, state, action) => {
    // @todo: #5.2 — применить компаратор

    const searchText = state[searchField]?.toLowerCase().trim() || "";
    if (!searchText) return data;

    const fields = ["date", "customer", "seller"];

    return data.filter((row) => {
      return fields.some((field) => {
        const value = row[field]?.toString().toLowerCase() || "";
        return value.includes(searchText);
      });
    });
  };
}
