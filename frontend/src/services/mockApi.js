// Mock data - works without backend
export const mockRecipes = [
  {
    id: 1,
    name: "Kuřecí prso na másle",
    time: 20,
    category: "salty",
    price: 200,
    ingredients: [
      { name: "Kuřecí prso", quantity: 2, unit: "ks" },
      { name: "Máslo", quantity: 2, unit: "lžíce" },
      { name: "Sůl", quantity: 1, unit: "lžička" }
    ],
    instructions: "1. Umyjte a osušte kuřecí prsa.\n2. Rozpusťte máslo v pánvi na středním ohni.\n3. Vložte kuřecí prsa a smažte 8-10 minut z každé strany.\n4. Osolte a opepřete dle chuti.\n5. Servírujte se zeleninou."
  },
  {
    id: 2,
    name: "Těstoviny Carbonara",
    time: 15,
    category: "salty",
    price: 180,
    ingredients: [
      { name: "Těstoviny", quantity: 400, unit: "g" },
      { name: "Slanina", quantity: 200, unit: "g" },
      { name: "Vejce", quantity: 3, unit: "ks" }
    ],
    instructions: "1. Uveďte vodu k varu v hrnci se solí.\n2. Vložte těstoviny a vařte podle návodu na balení.\n3. Nakrájejte slaninu a opečte ji v pánvi.\n4. Vmíchejte vejce do hotových těstovin.\n5. Přidejte opečenou slaninu a důkladně promíchejte.\n6. Servírujte ihned."
  },
  {
    id: 3,
    name: "Omlet se sýrem",
    time: 10,
    category: "salty",
    price: 120,
    ingredients: [
      { name: "Vejce", quantity: 3, unit: "ks" },
      { name: "Sýr", quantity: 100, unit: "g" },
      { name: "Máslo", quantity: 1, unit: "lžíce" }
    ],
    instructions: "1. Rozpazte máslo v pánvi na středním ohni.\n2. Rozšlehejte vejce se solí a pepřem.\n3. Vlijte vejce do pánve.\n4. Jakmile vejce částečně vykrvácí, posypte sýrem.\n5. Přeložte na polovinu a servírujte."
  },
  {
    id: 4,
    name: "Čokoládový dort",
    time: 60,
    category: "sweet",
    price: 200,
    ingredients: [
      { name: "Čokoláda", quantity: 200, unit: "g" },
      { name: "Vejce", quantity: 4, unit: "ks" },
      { name: "Cukr", quantity: 150, unit: "g" },
      { name: "Mouka", quantity: 150, unit: "g" }
    ],
    instructions: "1. Rozpusťte čokoládu na vodní lázni.\n2. Oddělte vaječné žloutky od bílků.\n3. Sbijte bílky s cukrem do mraky.\n4. Vmíchejte rozpuštěnou čokoládu a mouku.\n5. Opatrně přidejte žloutky.\n6. Nalijte do máslem vymazané formy.\n7. Pečte na 170°C 45-50 minut.\n8. Nechte vychladnout a servírujte."
  },
  {
    id: 5,
    name: "Palačinky",
    time: 20,
    category: "sweet",
    price: 100,
    ingredients: [
      { name: "Mouka", quantity: 200, unit: "g" },
      { name: "Vejce", quantity: 2, unit: "ks" },
      { name: "Mléko", quantity: 300, unit: "ml" },
      { name: "Cukr", quantity: 2, unit: "lžíce" }
    ],
    instructions: "1. Smíchejte mouku, vejce, mléko a cukr v míse.\n2. Dobře vše promíchejte na hladké těsto.\n3. Rozpusťte máslo v pánvi.\n4. Nalijte asi 50ml těsta a opékejte do světle hnědé barvy.\n5. Překlopte a opékejte druhou stranu.\n6. Servírujte se džemem, med nebo cukrem."
  },
  {
    id: 6,
    name: "Rajská polévka",
    time: 25,
    category: "salty",
    price: 80,
    ingredients: [
      { name: "Rajčata", quantity: 500, unit: "g" },
      { name: "Cibule", quantity: 1, unit: "ks" },
      { name: "Česnek", quantity: 2, unit: "stroužek" }
    ],
    instructions: "1. Nakrájejte cibuli a opečte ji v oleji.\n2. Přidejte rajčata nakrájená na kostky.\n3. Vlijte 1 litr vody.\n4. Přidejte česnek.\n5. Vařte 20 minut na mírném ohni.\n6. Osolte a opepřete.\n7. Servírujte s chlebem."
  }
];

export const mockIngredients = [
  { id: 1, name: "Kuřecí prso", unit: "g", avgPrice: 2.5 },
  { id: 2, name: "Máslo", unit: "g", avgPrice: 0.8 },
  { id: 3, name: "Sůl", unit: "g", avgPrice: 0.05 },
  { id: 4, name: "Těstoviny", unit: "g", avgPrice: 0.3 },
  { id: 5, name: "Slanina", unit: "g", avgPrice: 3 },
  { id: 6, name: "Vejce", unit: "ks", avgPrice: 4 },
  { id: 7, name: "Sýr", unit: "g", avgPrice: 1.5 },
  { id: 8, name: "Čokoláda", unit: "g", avgPrice: 1.2 },
  { id: 9, name: "Cukr", unit: "g", avgPrice: 0.15 },
  { id: 10, name: "Mouka", unit: "g", avgPrice: 0.2 },
  { id: 11, name: "Mléko", unit: "ml", avgPrice: 0.05 },
  { id: 12, name: "Rajčata", unit: "g", avgPrice: 0.4 },
  { id: 13, name: "Cibule", unit: "ks", avgPrice: 15 },
  { id: 14, name: "Česnek", unit: "stroužek", avgPrice: 5 }
];

// Simulate API calls with localStorage
export const api = {
  async getRecipes() {
    return Promise.resolve(mockRecipes);
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
  
  async saveRecipe(recipe) {
    const saved = await this.getSavedRecipes();
    saved.push({ ...recipe, savedAt: new Date().toISOString() });
    localStorage.setItem('saved_recipes', JSON.stringify(saved));
    return Promise.resolve();
  }
};
