import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import MainMenu from './components/MainMenu';
import Fridge from './components/Fridge';
import Recipes from './components/Recipes';
import Savings from './components/Savings';
import Expiration from './components/Expiration';
import './styles/App.css';

function App() {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [fridgeItems, setFridgeItems] = useState([]);

  useEffect(() => {
    if (user && currentPage === 'home') {
      setCurrentPage('main');
    }
  }, [user]);

  const handleEnter = () => {
    setShowAuth(true);
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
    setShowAuth(false);
  };

  const handleSelectMenu = (menu) => {
    setCurrentPage(menu);
  };

  const handleSelectRecipe = (fridge) => {
    setFridgeItems(fridge);
    setCurrentPage('recipes');
  };

  const handleCompleteRecipe = (recipe) => {
    setCurrentPage('saved');
  };

  const handleBack = () => {
    if (currentPage === 'recipes' || currentPage === 'fridge') {
      setCurrentPage('main');
    } else {
      setCurrentPage('main');
    }
  };

  return (
    <div className="app">
      {!user ? (
        <>
          {!showAuth ? (
            <Home onEnter={handleEnter} />
          ) : authMode === 'login' ? (
            <Login onSwitchToRegister={() => setAuthMode('register')} />
          ) : (
            <Register onSwitchToLogin={() => setAuthMode('login')} />
          )}
        </>
      ) : (
        <>
          {currentPage === 'main' && (
            <MainMenu onSelectMenu={handleSelectMenu} onLogout={handleLogout} />
          )}
          {currentPage === 'fridge' && (
            <Fridge onBack={handleBack} onSelectRecipe={handleSelectRecipe} />
          )}
          {currentPage === 'recipes' && (
            <Recipes fridgeItems={fridgeItems} onBack={handleBack} onCompleteRecipe={handleCompleteRecipe} />
          )}
          {currentPage === 'saved' && (
            <Savings onBack={handleBack} />
          )}
          {currentPage === 'expiration' && (
            <Expiration onBack={handleBack} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
