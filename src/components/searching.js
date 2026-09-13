// import { createComparison } from "../lib/compare.js";

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

  return (query, state, action) => {
    // result заменили на query
    return state[searchField]
      ? Object.assign({}, query, {
          // проверяем, что в поле поиска было что-то введено
          search: state[searchField], // устанавливаем в query параметр
        })
      : query; // если поле с поиском пустое, просто возвращаем query без изменений
  };
}
