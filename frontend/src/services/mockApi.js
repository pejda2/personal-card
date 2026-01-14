// Mock data - works without backend

export const mockIngredients = [
  // Maso
  { id: 1, name: "Kuřecí prso", unit: "g", avgPrice: 0.15 },
  { id: 2, name: "Kuřecí stehno", unit: "g", avgPrice: 0.10 },
  { id: 3, name: "Vepřová krkovice", unit: "g", avgPrice: 0.12 },
  { id: 4, name: "Vepřové kotlety", unit: "g", avgPrice: 0.14 },
  { id: 5, name: "Hovězí maso", unit: "g", avgPrice: 0.25 },
  { id: 6, name: "Mleté maso", unit: "g", avgPrice: 0.11 },
  { id: 7, name: "Krůtí maso", unit: "g", avgPrice: 0.16 },
  { id: 8, name: "Bůček", unit: "g", avgPrice: 0.13 },
  { id: 9, name: "Kuřecí nugetky", unit: "g", avgPrice: 0.18 },
  { id: 10, name: "Slanina", unit: "g", avgPrice: 0.15 },
  { id: 11, name: "Párky", unit: "g", avgPrice: 0.12 },
  { id: 12, name: "Klobása", unit: "g", avgPrice: 0.14 },
  
  // Ryby
  { id: 13, name: "Losos", unit: "g", avgPrice: 0.35 },
  { id: 14, name: "Tuňák", unit: "g", avgPrice: 0.30 },
  
  // Mléčné výrobky
  { id: 15, name: "Máslo", unit: "g", avgPrice: 0.08 },
  { id: 16, name: "Vejce", unit: "ks", avgPrice: 6 },
  { id: 17, name: "Sýr", unit: "g", avgPrice: 0.25 },
  { id: 18, name: "Mléko", unit: "ml", avgPrice: 0.025 },
  { id: 19, name: "Smetana", unit: "ml", avgPrice: 0.06 },
  { id: 20, name: "Jogurt", unit: "ml", avgPrice: 0.03 },
  { id: 21, name: "Tvaroh", unit: "g", avgPrice: 0.08 },
  { id: 22, name: "Parmazán", unit: "g", avgPrice: 0.40 },
  { id: 23, name: "Mozzarella", unit: "g", avgPrice: 0.30 },
  
  // Zelenina
  { id: 24, name: "Rajčata", unit: "g", avgPrice: 0.08 },
  { id: 25, name: "Cibule", unit: "ks", avgPrice: 8 },
  { id: 26, name: "Česnek", unit: "stroužek", avgPrice: 2 },
  { id: 27, name: "Paprika", unit: "g", avgPrice: 0.10 },
  { id: 28, name: "Brambory", unit: "g", avgPrice: 0.02 },
  { id: 29, name: "Mrkev", unit: "g", avgPrice: 0.025 },
  { id: 30, name: "Celer", unit: "g", avgPrice: 0.03 },
  { id: 31, name: "Zelí", unit: "g", avgPrice: 0.015 },
  { id: 32, name: "Salát", unit: "g", avgPrice: 0.12 },
  { id: 33, name: "Okurka", unit: "g", avgPrice: 0.06 },
  { id: 34, name: "Cuketa", unit: "g", avgPrice: 0.07 },
  { id: 35, name: "Brokolice", unit: "g", avgPrice: 0.09 },
  { id: 36, name: "Špenát", unit: "g", avgPrice: 0.10 },
  { id: 37, name: "Kukuřice", unit: "g", avgPrice: 0.05 },
  { id: 38, name: "Hrášek", unit: "g", avgPrice: 0.04 },
  
  // Ovoce
  { id: 39, name: "Jablko", unit: "ks", avgPrice: 12 },
  { id: 40, name: "Hrušeň", unit: "ks", avgPrice: 15 },
  { id: 41, name: "Banán", unit: "ks", avgPrice: 18 },
  { id: 42, name: "Jahody", unit: "g", avgPrice: 0.40 },
  { id: 43, name: "Citron", unit: "ks", avgPrice: 20 },
  
  // Pečivo a základní potraviny
  { id: 44, name: "Mouka", unit: "g", avgPrice: 0.015 },
  { id: 45, name: "Rýže", unit: "g", avgPrice: 0.03 },
  { id: 46, name: "Těstoviny", unit: "g", avgPrice: 0.04 },
  { id: 47, name: "Chléb", unit: "g", avgPrice: 0.04 },
  { id: 48, name: "Housky", unit: "ks", avgPrice: 8 },
  
  // Ostatní
  { id: 49, name: "Olej", unit: "ml", avgPrice: 0.04 },
  { id: 50, name: "Cukr", unit: "g", avgPrice: 0.02 },
  { id: 51, name: "Čokoláda", unit: "g", avgPrice: 0.35 },
  { id: 52, name: "Kečup", unit: "ml", avgPrice: 0.025 },
  { id: 53, name: "Hořčice", unit: "ml", avgPrice: 0.02 },
  { id: 54, name: "Rajčatový protlak", unit: "g", avgPrice: 0.02 },
  { id: 55, name: "Sojová omáčka", unit: "ml", avgPrice: 0.03 }
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

const mockRecipes = [
  {
    id: 1,
    name: "Kuřecí prsa na pánvi",
    ingredients: [
      { name: "Kuřecí prso", amount: 300 },
      { name: "Olej", amount: 20 }
    ],
    totalCost: 45.8
  }
];
