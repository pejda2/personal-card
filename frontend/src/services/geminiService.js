// Gemini API Service
const GEMINI_API_KEY = 'AIzaSyA7pooPq5v7A-AJY3xDO_lcPSlZkWgndfo';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export const geminiService = {
  async estimatePrice(ingredientName, unit) {
    try {
      const prompt = `Jaká je průměrná cena v České republice za 1 ${unit} ${ingredientName}? Odpověz pouze číslem v Kč (bez textu, jen číslo s maximálně 2 desetinnými místy). Například: 2.50`;
      
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      const price = parseFloat(text.replace(/[^\d.,]/g, '').replace(',', '.'));
      
      return isNaN(price) ? 1 : price;
    } catch (error) {
      console.error('Gemini API error:', error);
      return 1; // fallback price
    }
  },

  async generateRecipe(ingredients) {
    try {
      const ingredientList = ingredients.join(', ');
      const prompt = `Vytvoř recept v češtině z těchto surovin: ${ingredientList}. 
      Formát odpovědi (JSON):
      {
        "name": "Název receptu",
        "time": 30,
        "category": "salty nebo sweet",
        "instructions": "Krok po kroku postup"
      }`;
      
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      
      // Parse JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return null;
    } catch (error) {
      console.error('Gemini recipe generation error:', error);
      return null;
    }
  }
};
