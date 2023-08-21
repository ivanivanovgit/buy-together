// validateInput.js

import { bannedWords } from "../../pages/api/bannedWords";
export function validateInput(userInput) {
  // Проверка на наличие URL в вводе
  if (/https?:\/\/[^\s]+/g.test(userInput)) {
    return {
      valid: false,
      errorMessage: "Вставка ссылок запрещена",
    };
  }
  // Проверка на HTML или JavaScript
  else if (
    /<.*?>/g.test(userInput) ||
    /<script.*>.*<\/script>/gms.test(userInput)
  ) {
    return {
      valid: false,
      errorMessage: "Вставка HTML или JavaScript запрещена",
    };
  } else {
    // Проверка на запрещенные слова
    bannedWords.forEach((bannedWord) => {
      const regex = new RegExp(bannedWord, "gi");
      if (regex.test(userInput)) {
        userInput = userInput.replace(regex, "");
      }
    });

    return { valid: true, text: userInput, errorMessage: "" };
  }
}
