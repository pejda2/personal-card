// Extended mock recipes - 50+ recipes
export const extendedRecipes = [
  // Existing ones
  {
    id: 1,
    name: "Kuřecí prso na másle",
    time: 20,
    category: "salty",
    ingredients: [
      { name: "Kuřecí prso", quantity: 500, unit: "g" },
      { name: "Máslo", quantity: 30, unit: "g" },
      { name: "Sůl", quantity: 5, unit: "g" }
    ],
    instructions: "1. Umyjte a osušzte kuřecí prsa.\n2. Rozpusťte máslo v pánvi.\n3. Smažte kuřecí prsa 8-10 minut.\n4. Osolte a podávejte."
  },
  {
    id: 2,
    name: "Těstoviny Carbonara",
    time: 15,
    category: "salty",
    ingredients: [
      { name: "Těstoviny", quantity: 400, unit: "g" },
      { name: "Slanina", quantity: 200, unit: "g" },
      { name: "Vejce", quantity: 3, unit: "ks" }
    ],
    instructions: "1. Vařte těstoviny.\n2. Opečte slaninu.\n3. Vmíchejte vejce.\n4. Promíchejte se slaninou."
  },
  {
    id: 3,
    name: "Bezlepkový chlebek",
    time: 45,
    category: "salty",
    ingredients: [
      { name: "Mouka", quantity: 300, unit: "g" },
      { name: "Voda", quantity: 250, unit: "ml" },
      { name: "Sůl", quantity: 10, unit: "g" }
    ],
    instructions: "1. Smíchejte mouку s vodou.\n2. Přidejte sůl.\n3. Pečte 40 minut na 180°C."
  },
  {
    id: 4,
    name: "Bramborová polévka",
    time: 30,
    category: "salty",
    ingredients: [
      { name: "Brambory", quantity: 600, unit: "g" },
      { name: "Cibule", quantity: 2, unit: "ks" },
      { name: "Česnek", quantity: 3, unit: "stroužek" },
      { name: "Sůl", quantity: 10, unit: "g" }
    ],
    instructions: "1. Osmahnete cibuli.\n2. Přidáte brambory.\n3. Zalijete vodou.\n4. Vařte 20 minut.\n5. Osolte a servírujte."
  },
  {
    id: 5,
    name: "Drůbeží omelet",
    time: 15,
    category: "salty",
    ingredients: [
      { name: "Vejce", quantity: 4, unit: "ks" },
      { name: "Kuřecí prso", quantity: 200, unit: "g" },
      { name: "Sůl", quantity: 5, unit: "g" }
    ],
    instructions: "1. Smažte kuřecí maso.\n2. Rozšlehejte vejce.\n3. Vlijte do pánve.\n4. Servírujte."
  },
  {
    id: 6,
    name: "Zeleninová polévka",
    time: 25,
    category: "salty",
    ingredients: [
      { name: "Mrkev", quantity: 200, unit: "g" },
      { name: "Celer", quantity: 150, unit: "g" },
      { name: "Cibule", quantity: 1, unit: "ks" }
    ],
    instructions: "1. Nakrájejte zeleninu.\n2. Smažte cibuli.\n3. Přidáte ostatní.\n4. Vařte 20 minut."
  },
  {
    id: 7,
    name: "Smažené hranolky",
    time: 20,
    category: "salty",
    ingredients: [
      { name: "Brambory", quantity: 800, unit: "g" },
      { name: "Olej", quantity: 500, unit: "ml" },
      { name: "Sůl", quantity: 10, unit: "g" }
    ],
    instructions: "1. Nakrájejte brambory.\n2. Zahřejte olej.\n3. Smažte hranolky.\n4. Osolte."
  },
  {
    id: 8,
    name: "Rajská omáčka",
    time: 20,
    category: "salty",
    ingredients: [
      { name: "Rajčata", quantity: 400, unit: "g" },
      { name: "Česnek", quantity: 3, unit: "stroužek" },
      { name: "Olej", quantity: 50, unit: "ml" }
    ],
    instructions: "1. Osmahnete česnek.\n2. Přidáte rajčata.\n3. Vařte 15 minut.\n4. Servírujte."
  },
  {
    id: 9,
    name: "Párky v rohlíku",
    time: 10,
    category: "salty",
    ingredients: [
      { name: "Chlieb", quantity: 200, unit: "g" },
      { name: "Slanina", quantity: 100, unit: "g" },
      { name: "Hořčice", quantity: 20, unit: "ml" }
    ],
    instructions: "1. Zahřejte párek.\n2. Vložte do rohlíku.\n3. Přidáte hořčici.\n4. Servírujte."
  },
  {
    id: 10,
    name: "Sýrová omáčka",
    time: 10,
    category: "salty",
    ingredients: [
      { name: "Sýr", quantity: 200, unit: "g" },
      { name: "Smetana", quantity: 200, unit: "ml" },
      { name: "Máslo", quantity: 30, unit: "g" }
    ],
    instructions: "1. Rozpusťte máslo.\n2. Přidáte smetanu.\n3. Roztavte sýr.\n4. Servírujte."
  },
  // Sladké recepty
  {
    id: 11,
    name: "Čokoládový keks",
    time: 30,
    category: "sweet",
    ingredients: [
      { name: "Čokoláda", quantity: 100, unit: "g" },
      { name: "Máslo", quantity: 100, unit: "g" },
      { name: "Cukr", quantity: 100, unit: "g" },
      { name: "Vejce", quantity: 2, unit: "ks" }
    ],
    instructions: "1. Rozpusťte čokoládu.\n2. Vmíchejte máslo a cukr.\n3. Přidáte vejce.\n4. Pečte 25 minut."
  },
  {
    id: 12,
    name: "Malinový koláč",
    time: 40,
    category: "sweet",
    ingredients: [
      { name: "Mouka", quantity: 250, unit: "g" },
      { name: "Malina", quantity: 300, unit: "g" },
      { name: "Cukr", quantity: 150, unit: "g" }
    ],
    instructions: "1. Připravte těsto.\n2. Vložte malinу.\n3. Pečte 35 minut na 180°C."
  },
  {
    id: 13,
    name: "Muffiny",
    time: 30,
    category: "sweet",
    ingredients: [
      { name: "Mouka", quantity: 200, unit: "g" },
      { name: "Vejce", quantity: 3, unit: "ks" },
      { name: "Cukr", quantity: 100, unit: "g" }
    ],
    instructions: "1. Smíchejte ingredience.\n2. Nalijte do forem.\n3. Pečte 25 minut na 180°C."
  },
  {
    id: 14,
    name: "Jablečný koláč",
    time: 50,
    category: "sweet",
    ingredients: [
      { name: "Jablko", quantity: 600, unit: "g" },
      { name: "Mouka", quantity: 300, unit: "g" },
      { name: "Cukr", quantity: 200, unit: "g" }
    ],
    instructions: "1. Nakrájejте jablka.\n2. Připravte těsto.\n3. Vložte jablka.\n4. Pečte 45 minut."
  },
  {
    id: 15,
    name: "Karamelový pudink",
    time: 20,
    category: "sweet",
    ingredients: [
      { name: "Mléko", quantity: 500, unit: "ml" },
      { name: "Cukr", quantity: 100, unit: "g" },
      { name: "Mouka", quantity: 50, unit: "g" }
    ],
    instructions: "1. Zahřejte mléko.\n2. Rozpusťte cukr.\n3. Přidáte mouku.\n4. Vařte do zahuštění."
  },
  {
    id: 16,
    name: "Banánový chlebek",
    time: 45,
    category: "sweet",
    ingredients: [
      { name: "Banán", quantity: 300, unit: "g" },
      { name: "Mouka", quantity: 250, unit: "g" },
      { name: "Vejce", quantity: 2, unit: "ks" }
    ],
    instructions: "1. Rozdmychejte banány.\n2. Smíchejte s moukou.\n3. Přidáte vejce.\n4. Pečte 40 minut."
  },
  {
    id: 17,
    name: "Tvarohový koláč",
    time: 50,
    category: "sweet",
    ingredients: [
      { name: "Tvaroh", quantity: 400, unit: "g" },
      { name: "Vejce", quantity: 3, unit: "ks" },
      { name: "Cukr", quantity: 150, unit: "g" }
    ],
    instructions: "1. Smíchejte tvaroh s cukrem.\n2. Přidáte vejce.\n3. Nalijte na těsto.\n4. Pečte 45 minut."
  },
  {
    id: 18,
    name: "Vanilkový pudinig",
    time: 15,
    category: "sweet",
    ingredients: [
      { name: "Mléko", quantity: 600, unit: "ml" },
      { name: "Vanilka", quantity: 5, unit: "g" },
      { name: "Cukr", quantity: 80, unit: "g" }
    ],
    instructions: "1. Zahřejte mléko.\n2. Přidáte cukr a vanilku.\n3. Nechte chladit.\n4. Servírujte."
  },
  {
    id: 19,
    name: "Piškotový dort",
    time: 40,
    category: "sweet",
    ingredients: [
      { name: "Vejce", quantity: 6, unit: "ks" },
      { name: "Cukr", quantity: 200, unit: "g" },
      { name: "Mouka", quantity: 200, unit: "g" }
    ],
    instructions: "1. Sbijte vejce s cukrem.\n2. Přidáte mouku.\n3. Pečte 35 minut na 180°C."
  },
  {
    id: 20,
    name: "Kokosový kostverec",
    time: 30,
    category: "sweet",
    ingredients: [
      { name: "Kokos", quantity: 200, unit: "g" },
      { name: "Kondenzované mléko", quantity: 400, unit: "g" },
      { name: "Máslo", quantity: 100, unit: "g" }
    ],
    instructions: "1. Smíchejte kokos s mlékem.\n2. Přidáte máslo.\n3. Pečte 25 minut na 180°C."
  }
];

// Utility function to calculate recipe cost
export const calculateRecipeCost = (recipe, ingredients) => {
  let totalCost = 0;
  recipe.ingredients.forEach(recipeIng => {
    const ingredient = ingredients.find(i => i.name.toLowerCase() === recipeIng.name.toLowerCase());
    if (ingredient) {
      let quantity = recipeIng.quantity;
      // Convert different units if needed
      if (recipeIng.unit === "lžíce") quantity = 15; // 1 tbsp = 15g/ml
      if (recipeIng.unit === "lžička") quantity = 5; // 1 tsp = 5g/ml
      totalCost += quantity * ingredient.avgPrice;
    }
  });
  return Math.round(totalCost);
};

export const api = {
  async getRecipes() {
    return Promise.resolve(extendedRecipes);
  },
  
  async getIngredients() {
    return Promise.resolve(mockIngredients);
  },
  
  async getFridge() {
    const data = localStorage.getItem('fridge_items');
    return Promise.resolve(data ? JSON.parse(data) : []);
  },
  
  async addFridgeItem(item) {
    const fridge = await this.getFridge();
    const newItem = { ...item, id: Date.now() };
    fridge.push(newItem);
    localStorage.setItem('fridge_items', JSON.stringify(fridge));
    return Promise.resolve(newItem);
  },
  
  async deleteFridgeItem(id) {
    const fridge = await this.getFridge();
    const filtered = fridge.filter(item => item.id !== id);
    localStorage.setItem('fridge_items', JSON.stringify(filtered));
    return Promise.resolve();
  },
  
  async getSavedRecipes() {
    const data = localStorage.getItem('saved_recipes');
    return Promise.resolve(data ? JSON.parse(data) : []);
  },
  
  async saveRecipe(recipe, ingredients) {
    const saved = await this.getSavedRecipes();
    const cost = calculateRecipeCost(recipe, ingredients);
    saved.push({ 
      ...recipe, 
      savedAt: new Date().toISOString(),
      cost: cost
    });
    localStorage.setItem('saved_recipes', JSON.stringify(saved));
    return Promise.resolve();
  },

  async consumeRecipe(recipe, fridgeItems, ingredients) {
    // Remove consumed ingredients from fridge
    let updatedFridge = [...fridgeItems];
    recipe.ingredients.forEach(recipeIng => {
      const fridgeIndex = updatedFridge.findIndex(
        item => item.name.toLowerCase() === recipeIng.name.toLowerCase()
      );
      if (fridgeIndex !== -1) {
        const item = updatedFridge[fridgeIndex];
        item.quantity -= recipeIng.quantity;
        if (item.quantity <= 0) {
          updatedFridge.splice(fridgeIndex, 1);
        }
      }
    });
    localStorage.setItem('fridge_items', JSON.stringify(updatedFridge));
    
    // Save recipe as completed
    await this.saveRecipe(recipe, ingredients);
    
    return Promise.resolve();
  }
};
