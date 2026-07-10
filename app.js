const plants = [
  {
    name: "Mint",
    environments: ["temperate", "humid", "cool"],
    uses: "Edible leaves, tea, digestive support, pollinator attraction",
    tips: "Grows aggressively. Keep in a container if space is limited.",
  },
  {
    name: "Potato",
    environments: ["temperate", "cool"],
    uses: "Staple calorie crop, stores well over winter",
    tips: "Hill soil around stems as plants grow for bigger yields.",
  },
  {
    name: "Rosemary",
    environments: ["hot-dry", "temperate"],
    uses: "Cooking herb, aromatic oils, drought-friendly landscaping",
    tips: "Requires excellent drainage and full sun.",
  },
  {
    name: "Elderberry",
    environments: ["temperate", "humid"],
    uses: "Berries for syrups and preserves, flowers for tea",
    tips: "Cook berries before use. Raw berries can upset digestion.",
  },
  {
    name: "Yarrow",
    environments: ["hot-dry", "temperate", "cool"],
    uses: "Companion planting, traditional herbal support",
    tips: "Thrives in lean soils and attracts beneficial insects.",
  },
  {
    name: "Comfrey",
    environments: ["temperate", "humid", "cool"],
    uses: "Compost booster, mulch crop, traditional topical use",
    tips: "Plant where it can stay long-term because roots regrow strongly.",
  },
  {
    name: "Amaranth",
    environments: ["hot-dry", "temperate"],
    uses: "Leafy greens and grain, heat-resilient crop",
    tips: "Harvest young leaves early and seed heads later.",
  },
];

const recipes = [
  {
    name: "Garden Frittata",
    ingredients: ["eggs", "onion", "spinach", "milk"],
    method: "Saute onion and spinach, add whisked eggs and milk, bake or finish on stovetop.",
  },
  {
    name: "Simple Flatbread",
    ingredients: ["flour", "water", "salt", "oil"],
    method: "Mix dough, rest briefly, roll thin, and cook in a hot pan.",
  },
  {
    name: "Pantry Bean Stew",
    ingredients: ["beans", "onion", "garlic", "tomato", "salt"],
    method: "Cook onion and garlic, add beans and tomato, simmer until thick.",
  },
  {
    name: "Herbed Potato Hash",
    ingredients: ["potato", "onion", "oil", "salt", "rosemary"],
    method: "Pan-fry diced potatoes and onion, season with rosemary and salt.",
  },
  {
    name: "Skillet Corn Cakes",
    ingredients: ["cornmeal", "flour", "egg", "milk", "salt"],
    method: "Mix batter and cook small rounds in an oiled skillet.",
  },
];

const resources = [
  "garden space",
  "chickens",
  "tools",
  "wood scraps",
  "kitchen",
  "dehydrator",
  "tractor or atv",
  "greenhouse",
  "craft skills",
  "spare room",
];

const incomeIdeas = [
  {
    title: "Seedling Starter Sales",
    needs: ["garden space", "greenhouse"],
    details: "Start vegetable or herb seedlings and sell in local spring markets.",
  },
  {
    title: "Egg Subscription Route",
    needs: ["chickens"],
    details: "Offer weekly egg boxes with pickup points in your community.",
  },
  {
    title: "Tool Sharpening Service",
    needs: ["tools"],
    details: "Sharpen shears, mower blades, and hand tools for neighboring homesteads.",
  },
  {
    title: "Rustic Planter Builds",
    needs: ["wood scraps", "tools"],
    details: "Build raised beds and rustic planters from reclaimed material.",
  },
  {
    title: "Dry Herb and Tea Blends",
    needs: ["garden space", "dehydrator", "kitchen"],
    details: "Create compliant, labeled dried culinary herb blends for local sale.",
  },
  {
    title: "Micro Workshop Nights",
    needs: ["spare room", "craft skills"],
    details: "Host small classes on canning, soap-making, or simple repairs.",
  },
  {
    title: "Small-Lot Hauling Help",
    needs: ["tractor or atv"],
    details: "Offer mulch, feed, and firewood movement support for nearby properties.",
  },
];

const plantQuery = document.getElementById("plantQuery");
const envSelect = document.getElementById("envSelect");
const plantSearchBtn = document.getElementById("plantSearchBtn");
const plantResults = document.getElementById("plantResults");

const inventoryInput = document.getElementById("inventoryInput");
const recipeSearchBtn = document.getElementById("recipeSearchBtn");
const recipeResults = document.getElementById("recipeResults");

const resourceChecks = document.getElementById("resourceChecks");
const incomeBtn = document.getElementById("incomeBtn");
const incomeResults = document.getElementById("incomeResults");

function renderCards(target, cards) {
  if (!cards.length) {
    target.innerHTML = '<p class="empty">No matches yet. Try different inputs.</p>';
    return;
  }

  target.innerHTML = cards
    .map(
      (card) => `
      <article class="card">
        ${card.badge ? `<span class="badge">${card.badge}</span>` : ""}
        <h3>${card.title}</h3>
        <p>${card.body}</p>
        ${card.extra ? `<p>${card.extra}</p>` : ""}
      </article>
    `,
    )
    .join("");
}

function searchPlants() {
  const query = plantQuery.value.trim().toLowerCase();
  const env = envSelect.value;

  const matches = plants.filter((plant) => {
    const byName = query ? plant.name.toLowerCase().includes(query) : true;
    const byEnv = env === "all" ? true : plant.environments.includes(env);
    return byName && byEnv;
  });

  renderCards(
    plantResults,
    matches.map((plant) => ({
      badge: plant.environments.join(" / "),
      title: plant.name,
      body: plant.uses,
      extra: `Tip: ${plant.tips}`,
    })),
  );
}

function suggestRecipes() {
  const pantry = inventoryInput.value
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  if (!pantry.length) {
    recipeResults.innerHTML = '<p class="empty">Add at least one ingredient.</p>';
    return;
  }

  const ranked = recipes
    .map((recipe) => {
      const matched = recipe.ingredients.filter((ingredient) => pantry.includes(ingredient));
      return {
        recipe,
        score: matched.length / recipe.ingredients.length,
        matched,
      };
    })
    .filter((item) => item.matched.length > 0)
    .sort((a, b) => b.score - a.score);

  renderCards(
    recipeResults,
    ranked.map((item) => ({
      badge: `${Math.round(item.score * 100)}% match`,
      title: item.recipe.name,
      body: `Matched: ${item.matched.join(", ")}`,
      extra: `How: ${item.recipe.method}`,
    })),
  );
}

function buildResourceChecks() {
  resourceChecks.innerHTML = resources
    .map(
      (resource) => `
      <label class="check-item" for="res-${resource}">
        <input type="checkbox" id="res-${resource}" value="${resource}" />
        <span>${resource}</span>
      </label>
    `,
    )
    .join("");
}

function generateIncomeIdeas() {
  const checked = Array.from(resourceChecks.querySelectorAll("input:checked")).map(
    (input) => input.value,
  );

  if (!checked.length) {
    incomeResults.innerHTML = '<p class="empty">Pick at least one resource.</p>';
    return;
  }

  const relevant = incomeIdeas
    .map((idea) => {
      const matchedNeeds = idea.needs.filter((need) => checked.includes(need));
      return {
        idea,
        matchedNeeds,
        score: matchedNeeds.length / idea.needs.length,
      };
    })
    .filter((item) => item.matchedNeeds.length > 0)
    .sort((a, b) => b.score - a.score);

  renderCards(
    incomeResults,
    relevant.map((item) => ({
      badge: `${Math.round(item.score * 100)}% fit`,
      title: item.idea.title,
      body: item.idea.details,
      extra: `Needs: ${item.idea.needs.join(", ")}`,
    })),
  );
}

plantSearchBtn.addEventListener("click", searchPlants);
recipeSearchBtn.addEventListener("click", suggestRecipes);
incomeBtn.addEventListener("click", generateIncomeIdeas);

buildResourceChecks();
searchPlants();
