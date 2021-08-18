import { fillRecipesHtml } from "./fillRecipesHtml.js";
import { chargeChoices } from "./chargeChoices.js";
import { fillChoicesArray } from "./fillChoicesArray.js";
import { removeDuplicateInChoices } from "./removeDuplicateInChoices.js";
import { capitalizeFirstLetter } from "./capitalizeFirstLetter.js";
import { orderRecipesWithActiveTags } from "./orderRecipesWithActiveTags.js";
export function onClickSortingTag(
  orderedArray,
  activeSortings,
  orderedRecipes,
  recipeArray
) {
  document.querySelectorAll(".choice").forEach((element) => {
    element.addEventListener("click", (e) => {
      console.log(activeSortings);
      let content = e.target.textContent;
      // ustensils case
      if (e.target.classList.contains("choice-type-ustensils")) {
        if (orderedArray.ustensils.indexOf(content) > -1) {
          activeSortings.ustensils.push(e.target.textContent);
          let newActiveUstensilsTagElement = document.createElement("div");
          newActiveUstensilsTagElement.setAttribute(
            "class",
            "active-choice active-choice-ustensils"
          );
          newActiveUstensilsTagElement.innerHTML = content;
          newActiveUstensilsTagElement.innerHTML += `<img src="./images/icons/cross.svg" alt="">`;

          document
            .querySelector(".active-tags")
            .appendChild(newActiveUstensilsTagElement);
          element.remove();
          let activeUstensils = activeSortings.ustensils.map((e) =>
            e.toLowerCase()
          );
          orderedRecipes = orderRecipesWithActiveTags(
            activeSortings,
            recipeArray
          );
          console.log(orderedRecipes);
          fillRecipesHtml(orderedRecipes);
          orderedArray.ustensils = [];

          fillChoicesArray(orderedRecipes, orderedArray);
          removeDuplicateInChoices(orderedArray);

          activeUstensils.forEach((e) => {
            orderedArray.ustensils.splice(
              orderedArray.ustensils.indexOf(capitalizeFirstLetter(e)),
              1
            );
          });
          chargeChoices("ustensils", orderedArray);
        }
        onClickSortingTag(
          orderedArray,
          activeSortings,
          orderedRecipes,
          recipeArray
        );
        //--- ustensils case

        // appliances case
      } else if (e.target.classList.contains("choice-type-appliances")) {
        if (orderedArray.appliances.indexOf(content) > -1) {
          activeSortings.appliances.push(e.target.textContent);
          let newActiveAppliancesTagElement = document.createElement("div");
          newActiveAppliancesTagElement.setAttribute(
            "class",
            "active-choice active-choice-appliances"
          );
          newActiveAppliancesTagElement.innerHTML = content;
          newActiveAppliancesTagElement.innerHTML += `<img src="./images/icons/cross.svg" alt="">`;
          document
            .querySelector(".active-tags")
            .appendChild(newActiveAppliancesTagElement);
          element.remove();
          let activeAppliances = activeSortings.appliances.map((e) =>
            e.toLowerCase()
          );
          orderedRecipes = orderRecipesWithActiveTags(
            activeSortings,
            recipeArray
          );
          console.log(orderedRecipes);
          fillRecipesHtml(orderedRecipes);
          orderedArray.appliances = [];

          fillChoicesArray(orderedRecipes, orderedArray);

          removeDuplicateInChoices(orderedArray);
          activeAppliances.forEach((e) => {
            orderedArray.appliances.splice(
              orderedArray.appliances.indexOf(capitalizeFirstLetter(e)),
              1
            );
          });
          chargeChoices("appliances", orderedArray);
        }
        onClickSortingTag(
          orderedArray,
          activeSortings,
          orderedRecipes,
          recipeArray
        );
        // --- appliances case

        //ingredients case
      } else if (e.target.classList.contains("choice-type-ingredients")) {
        if (orderedArray.ingredients.indexOf(content) > -1) {
          activeSortings.ingredients.push(e.target.textContent);

          let newActiveIngredientsTagElement = document.createElement("div");
          newActiveIngredientsTagElement.setAttribute(
            "class",
            "active-choice active-choice-ingredients"
          );
          newActiveIngredientsTagElement.innerHTML = content;
          newActiveIngredientsTagElement.innerHTML += `<img src="./images/icons/cross.svg" alt="">`;

          document
            .querySelector(".active-tags")
            .appendChild(newActiveIngredientsTagElement);
          element.remove();
          let activeIngredients = activeSortings.ingredients.map((e) =>
            e.toLowerCase()
          );
          orderedRecipes = orderRecipesWithActiveTags(
            activeSortings,
            recipeArray
          );
          fillRecipesHtml(orderedRecipes);
          orderedArray.ingredients = [];

          fillChoicesArray(orderedRecipes, orderedArray);

          removeDuplicateInChoices(orderedArray);
          activeIngredients.forEach((e) => {
            orderedArray.ingredients.splice(
              orderedArray.ingredients.indexOf(capitalizeFirstLetter(e)),
              1
            );
          });
          chargeChoices("ingredients", orderedArray);
        }
        onClickSortingTag(
          orderedArray,
          activeSortings,
          orderedRecipes,
          recipeArray
        );
      }
      // --- ingredients case
    });
  });
}
