// shuffleArray.js

export function shuffleArray(array, param) {
  if (!array) {
    return;
  }

  // Создаем копию исходного массива
  let newArray = [...array];

  // В зависимости от параметра, выбираем различные способы перемешивания
  if (param === "sortBegin") {
    newArray.sort((a, b) => a.property - b.property); // Сортировка по свойству
  } else if (param === "sortEnd") {
    newArray.sort((a, b) => b.property - a.property); // Обратная сортировка по свойству
  } else {
    for (let i = newArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
  }

  return newArray;
}
