# Homestead Helper

Homestead Helper is a practical MVP web app for new and experienced homesteaders.
It focuses on three day-to-day decisions:

1. Which plants are a good fit for your environment and goals.
2. What recipes you can make from what is already in your inventory.
3. What side-income ideas match the resources you already have.

## Features

- Plant Finder
	- Search by plant name or keyword.
	- Filter by environment (temperate, hot/dry, humid, cool).
	- View edible/medicinal and practical uses plus quick grow tips.

- Inventory Recipes
	- Enter pantry or garden ingredients as a comma-separated list.
	- Get ranked recipe suggestions by ingredient match percentage.
	- See basic method guidance for each recipe.

- Side Income Ideas
	- Select available resources (tools, chickens, greenhouse, etc.).
	- Get ranked income options based on how closely your resources fit.

## Run Locally

This MVP is a static front-end app (no build step required).

1. Open the project folder.
2. Open `index.html` in your browser.

Optional local server:

```bash
python3 -m http.server 8080
```

Then open <http://localhost:8080>.

## Project Files

- `index.html`: App structure and sections
- `styles.css`: Visual design, responsive layout, and animation
- `app.js`: Data + filtering/ranking logic for all core features

## Next Ideas

1. Expand plant and recipe datasets from local-region sources.
2. Add photo-based plant identification (API integration).
3. Save inventory and preferences in local storage or a backend.
4. Add user accounts and personalized recommendations.
