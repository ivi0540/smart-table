import { createComparison, defaultRules } from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

// ДОБАВЛЯЕМ ДОПОЛНИТЕЛЬНОЕ ПРАВИЛО ДЛЯ totalFrom И totalTo
// const customCompare = (row, state) => {
//   if (state.totalFrom !== undefined && state.totalFrom !== "") {
//     const from = Number(state.totalFrom);
//     if (row.total < from) return false;
//   }
//   if (state.totalTo !== undefined && state.totalTo !== "") {
//     const to = Number(state.totalTo);
//     if (row.total > to) return false;
//   }
//   return true;
// };

export function initFiltering(elements, indexes) {
  // @todo: #4.1 — заполнить выпадающие списки опциями
  Object.keys(indexes) // Получаем ключи из объекта
    .forEach((elementName) => {
      // Перебираем по именам
      elements[elementName].append(
        // в каждый элемент добавляем опции
        ...Object.values(indexes[elementName]) // формируем массив имён, значений опций
          .map((name) => {
            // используйте name как значение и текстовое содержимое
            // @todo: создать и вернуть тег опции
            const option = document.createElement("option");
            option.value = name;
            option.textContent = name;
            return option;
          }),
      );
    });

  return (data, state, action) => {
    // @todo: #4.2 — обработать очистку поля
    if (action && action.name === "clear") {
      const wrapper = action.closest(".filter-wrapper");
      if (wrapper) {
        const input = wrapper.querySelector("input");
        if (input) {
          input.value = "";
          const fieldName = action.dataset.field;
          if (fieldName && state[fieldName] !== undefined) {
            state[fieldName] = "";
          }
        }
      }
    }
    // @todo: #4.5 — отфильтровать данные используя компаратор

    // return data.filter((row) => compare(row, state));

    return data.filter((row) => {
      // totalFrom
      if (state.totalFrom && state.totalFrom !== "") {
        if (row.total < Number(state.totalFrom)) return false;
      }
      // totalTo
      if (state.totalTo && state.totalTo !== "") {
        if (row.total > Number(state.totalTo)) return false;
      }
      return compare(row, state);
    });
  };
}
