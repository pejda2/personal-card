// Extended mock recipes - realistic recipes
export const extendedRecipes = [
  {
    id: 1,
    name: "Kuřecí prsa na másle",
    time: 25,
    category: "salty",
    ingredients: [
      { name: "Kuřecí prso", quantity: 400, unit: "g" },
      { name: "Máslo", quantity: 50, unit: "g" },
      { name: "Sůl", quantity: 5, unit: "g" },
      { name: "Pepř", quantity: 2, unit: "g" }
    ],
    instructions: "1. Kuřecí prsa omyjte a osušte.\n2. Osolte a opepřete.\n3. Na pánvi rozehřejte máslo.\n4. Smažte prsa 8-10 minut z každé strany.\n5. Servírujte s přílohou."
  },
  {
    id: 2,
    name: "Špagety Carbonara",
    time: 20,
    category: "salty",
    ingredients: [
      { name: "Těstoviny", quantity: 400, unit: "g" },
      { name: "Slanina", quantity: 200, unit: "g" },
      { name: "Vejce", quantity: 3, unit: "ks" },
      { name: "Sýr", quantity: 100, unit: "g" },
      { name: "Pepř", quantity: 3, unit: "g" }
    ],
    instructions: "1. Uvařte špagety al dente.\n2. Osmažte nakrájenou slaninu.\n3. Rozšlehejte vejce se strouhaným sýrem.\n4. Smíchejte horké špagety s vejci a slaninou.\n5. Opepřete a servírujte."
  },
  {
    id: 3,
    name: "Bramborová polévka",
    time: 35,
    category: "salty",
    ingredients: [
      { name: "Brambory", quantity: 600, unit: "g" },
      { name: "Cibule", quantity: 1, unit: "ks" },
      { name: "Mrkev", quantity: 150, unit: "g" },
      { name: "Celer", quantity: 100, unit: "g" },
      { name: "Sůl", quantity: 10, unit: "g" },
      { name: "Pepř", quantity: 3, unit: "g" }
    ],
    instructions: "1. Nakrájejte zeleninu na kostky.\n2. Osmažte cibuli na oleji.\n3. Přidejte brambory, mrkev a celer.\n4. Zalijte 1.5 litrem vody.\n5. Vařte 25 minut.\n6. Osolte, opepřete a servírujte."
  },
  {
    id: 4,
    name: "Smažená vejce se slaninou",
    time: 10,
    category: "salty",
    ingredients: [
      { name: "Vejce", quantity: 3, unit: "ks" },
      { name: "Slanina", quantity: 100, unit: "g" },
      { name: "Sůl", quantity: 3, unit: "g" },
      { name: "Pepř", quantity: 2, unit: "g" }
    ],
    instructions: "1. Osmažte nakrájenou slaninu.\n2. Rozbijte vejce na pánev.\n3. Smažte do požadované konzistence.\n4. Osolte, opepřete a servírujte."
  },
  {
    id: 5,
    name: "Rajská omáčka s těstovinami",
    time: 30,
    category: "salty",
    ingredients: [
      { name: "Rajčata", quantity: 500, unit: "g" },
      { name: "Těstoviny", quantity: 400, unit: "g" },
      { name: "Česnek", quantity: 3, unit: "stroužek" },
      { name: "Cibule", quantity: 1, unit: "ks" },
      { name: "Olej", quantity: 50, unit: "ml" }
    ],
    instructions: "1. Osmažte nakrájenou cibuli a česnek.\n2. Přidejte nakrájená rajčata.\n3. Vařte 20 minut.\n4. Uvařte těstoviny.\n5. Smíchejte s omáčkou a servírujte."
  },
  {
    id: 6,
    name: "Palačinky",
    time: 25,
    category: "sweet",
    ingredients: [
      { name: "Mouka", quantity: 250, unit: "g" },
      { name: "Vejce", quantity: 2, unit: "ks" },
      { name: "Mléko", quantity: 400, unit: "ml" },
      { name: "Cukr", quantity: 30, unit: "g" },
      { name: "Sůl", quantity: 2, unit: "g" },
      { name: "Olej", quantity: 50, unit: "ml" }
    ],
    instructions: "1. Smíchejte mouku, vejce, mléko, cukr a sůl.\n2. Nechte těsto 15 minut odpočinout.\n3. Na pánvi rozehřejte olej.\n4. Nalijte těsto a smažte do zlatova.\n5. Podávejte s džemem nebo medem."
  },
  {
    id: 7,
    name: "Čokoládový dort",
    time: 60,
    category: "sweet",
    ingredients: [
      { name: "Čokoláda", quantity: 200, unit: "g" },
      { name: "Máslo", quantity: 150, unit: "g" },
      { name: "Vejce", quantity: 4, unit: "ks" },
      { name: "Cukr", quantity: 180, unit: "g" },
      { name: "Mouka", quantity: 120, unit: "g" }
    ],
    instructions: "1. Rozpusťte čokoládu s máslem.\n2. Oddělte žloutky od bílků.\n3. Žloutky vyšlehejte s cukrem.\n4. Vmíchejte čokoládu a mouku.\n5. Přidejte vyšlehaný sníh.\n6. Pečte 45 minut na 180°C."
  },
  {
    id: 8,
    name: "Jablečný koláč",
    time: 55,
    category: "sweet",
    ingredients: [
      { name: "Jablko", quantity: 4, unit: "ks" },
      { name: "Mouka", quantity: 300, unit: "g" },
      { name: "Cukr", quantity: 150, unit: "g" },
      { name: "Vejce", quantity: 2, unit: "ks" },
      { name: "Máslo", quantity: 100, unit: "g" },
      { name: "Skořice", quantity: 5, unit: "g" }
    ],
    instructions: "1. Nakrájejte jablka na plátky.\n2. Vyšlehejte máslo s cukrem.\n3. Přidejte vejce a mouku.\n4. Vlijte do formy.\n5. Navrch rozložte jablka a posypejte skořicí.\n6. Pečte 45 minut na 180°C."
  },
  {
    id: 9,
    name: "Smažený sýr s hranolky",
    time: 30,
    category: "salty",
    ingredients: [
      { name: "Sýr", quantity: 400, unit: "g" },
      { name: "Mouka", quantity: 100, unit: "g" },
      { name: "Vejce", quantity: 2, unit: "ks" },
      { name: "Brambory", quantity: 600, unit: "g" },
      { name: "Olej", quantity: 500, unit: "ml" }
    ],
    instructions: "1. Nakrájejte brambory na hranolky.\n2. Obalte sýr v mouce, vejci a strouhance.\n3. Smažte sýr i hranolky ve fritéze.\n4. Servírujte s tatarskou omáčkou."
  },
  {
    id: 10,
    name: "Guláš",
    time: 90,
    category: "salty",
    ingredients: [
      { name: "Kuřecí prso", quantity: 600, unit: "g" },
      { name: "Cibule", quantity: 2, unit: "ks" },
      { name: "Paprika", quantity: 20, unit: "g" },
      { name: "Rajčata", quantity: 200, unit: "g" },
      { name: "Česnek", quantity: 3, unit: "stroužek" }
    ],
    instructions: "1. Nakrájejte maso na kostky.\n2. Osmažte cibuli dozlatova.\n3. Přidejte maso a opečte.\n4. Přisypejte papriku a rajčata.\n5. Zalijte vodou a duste 60 minut."
  },
  {
    id: 11,
    name: "Caesar salát",
    time: 15,
    category: "salty",
    ingredients: [
      { name: "Salát", quantity: 200, unit: "g" },
      { name: "Kuřecí prso", quantity: 200, unit: "g" },
      { name: "Sýr", quantity: 50, unit: "g" },
      { name: "Chlieb", quantity: 100, unit: "g" },
      { name: "Česnek", quantity: 2, unit: "stroužek" }
    ],
    instructions: "1. Osmažte kuřecí prsa.\n2. Opečte chlebové kostky s česnekem.\n3. Nakrájejte salát.\n4. Smíchejte vše s dresinkem.\n5. Posypejte nastrouhaným sýrem."
  },
  {
    id: 12,
    name: "Tvarohové koláčky",
    time: 45,
    category: "sweet",
    ingredients: [
      { name: "Tvaroh", quantity: 500, unit: "g" },
      { name: "Vejce", quantity: 3, unit: "ks" },
      { name: "Cukr", quantity: 120, unit: "g" },
      { name: "Mouka", quantity: 200, unit: "g" },
      { name: "Vanilka", quantity: 10, unit: "g" }
    ],
    instructions: "1. Smíchejte tvaroh s cukrem a vejci.\n2. Přidejte mouku a vanilku.\n3. Vlijte do formiček.\n4. Pečte 35 minut na 180°C."
  },
  {
    id: 13,
    name: "Ovesná kaše",
    time: 10,
    category: "sweet",
    ingredients: [
      { name: "Mouka", quantity: 100, unit: "g" },
      { name: "Mléko", quantity: 300, unit: "ml" },
      { name: "Banán", quantity: 1, unit: "ks" },
      { name: "Cukr", quantity: 20, unit: "g" }
    ],
    instructions: "1. Uvařte ovesné vločky v mléce.\n2. Přidejte cukr.\n3. Nakrájejte banán.\n4. Servírujte s banánem navrch."
  },
  {
    id: 14,
    name: "Pizza Margherita",
    time: 40,
    category: "salty",
    ingredients: [
      { name: "Mouka", quantity: 300, unit: "g" },
      { name: "Rajčata", quantity: 200, unit: "g" },
      { name: "Sýr", quantity: 200, unit: "g" },
      { name: "Olej", quantity: 50, unit: "ml" },
      { name: "Bylinky", quantity: 5, unit: "g" }
    ],
    instructions: "1. Připravte těsto z mouky, vody a oleje.\n2. Rozválejte na plech.\n3. Potřete rajčatovou omáčkou.\n4. Posypejte sýrem a bylinkami.\n5. Pečte 20 minut na 220°C."
  },
  {
    id: 15,
    name: "Bramborák",
    time: 30,
    category: "salty",
    ingredients: [
      { name: "Brambory", quantity: 800, unit: "g" },
      { name: "Vejce", quantity: 2, unit: "ks" },
      { name: "Mouka", quantity: 80, unit: "g" },
      { name: "Česnek", quantity: 2, unit: "stroužek" },
      { name: "Olej", quantity: 100, unit: "ml" }
    ],
    instructions: "1. Nastrouejte brambory nahrubo.\n2. Přidejte vejce, mouku a česnek.\n3. Osolte a opepřete.\n4. Smažte placky na oleji.\n5. Servírujte se zelím."
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
