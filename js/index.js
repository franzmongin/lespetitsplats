import recipes from "../data/recipe.js";
import { chargeChoices } from "./chargeChoices.js";
import { removeDuplicateInChoices } from "./removeDuplicateInChoices.js";
import { fillChoicesArray } from "./fillChoicesArray.js";
import { Recipe } from "./Recipe.js";
import { onClickSortingTag } from "./onClickSortingTag.js";

window.addEventListener("DOMContentLoaded", (event) => {
  // event to open differente choices lists
  document.querySelectorAll(".choices-selection").forEach((element) => {
    element.addEventListener("click", () => {
      element.classList.toggle("opened-list");
      element.querySelector(".choices-list").classList.toggle("show-list");
      element.querySelector(".select-arrow").classList.toggle("bottom-arrow");
    });
  });
  //---

  let recipeArray = [];
  let choicesArray = {
    ingredients: [],
    appliances: [],
    ustensils: [],
  };
  let orderedArray = { ...choicesArray };

  let activeSortings = {
    ingredients: [],
    appliances: [],
    ustensils: [],
  };

  // create recipes objects
  recipes.forEach((recipe) => recipeArray.push(new Recipe(recipe)));
  //---

  // fillChoicesArray and return recipes html
  let recipeListHtml = fillChoicesArray(recipeArray, choicesArray);
  //---

  // fill recipes list with recipeHtml
  document.querySelector(".recipes-list").innerHTML = recipeListHtml;
  //---

  // suppression des doublons dans les tableaux d'ingrédients d'appareils et d'ustensiles
  removeDuplicateInChoices(choicesArray);
  //---

  // charge choices template
  chargeChoices("ingredients", choicesArray);
  chargeChoices("ustensils", choicesArray);
  chargeChoices("appliances", choicesArray);
  //---

  // onChange orders input event
  document.querySelectorAll(".orders-input").forEach((input) => {
    input.addEventListener("keyup", () => {
      let inputValue = input.value;

      if (input.classList.contains("ingredients-input")) {
        orderedArray.ingredients = choicesArray.ingredients.filter(
          (ingredient) =>
            ingredient.toLowerCase().includes(inputValue.toLowerCase())
        );
        chargeChoices("ingredients", orderedArray);
        onClickSortingTag(orderedArray, activeSortings);
      } else if (input.classList.contains("appliances-input")) {
        orderedArray.appliances = choicesArray.appliances.filter((appliance) =>
          appliance.toLowerCase().includes(inputValue.toLowerCase())
        );
        chargeChoices("appliances", orderedArray);
        onClickSortingTag(orderedArray, activeSortings);
      } else if (input.classList.contains("ustensils-input")) {
        orderedArray.ustensils = choicesArray.ustensils.filter((ustensil) =>
          ustensil.toLowerCase().includes(inputValue.toLowerCase())
        );
        chargeChoices("ustensils", orderedArray);
        onClickSortingTag(orderedArray, activeSortings);
      }
    });
  });
  //---

  // on click on sorting tag
  onClickSortingTag(choicesArray, activeSortings);
  //---
});
