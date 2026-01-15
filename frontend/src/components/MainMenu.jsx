import React, { useEffect, useMemo, useState } from 'react';
import '../styles/Main.css';
import logo from '../assets/logo2.png';
import horciceIcon from '../assets/horcice.png';

export default function MainMenu({ onSelectMenu, onLogout }) {
  const [fridgeItems, setFridgeItems] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('fridge_items');
    setFridgeItems(data ? JSON.parse(data) : []);
  }, []);

  const ingredientIcons = useMemo(() => {
    const iconMap = {
      'kuřecí prso': '🥩',
      'kureci prso': '🥩',
      'kuřecí stehno': '🥩',
      'kureci stehno': '🥩',
      'vepřová krkovice': '🥩',
      'veprova krkovice': '🥩',
      'vepřové kotlety': '🥩',
      'veprove kotlety': '🥩',
      'hovězí maso': '🥩',
      'hovezi maso': '🥩',
      'mleté maso': '🥩',
      'mlete maso': '🥩',
      'krůtí maso': '🥩',
      'kruti maso': '🥩',
      'bůček': '🥓',
      'bucek': '🥓',
      'kuřecí nugetky': '🥩',
      'kureci nugetky': '🥩',
      'slanina': '🥓',
      'párky': '🌭',
      'parky': '🌭',
      'klobása': '🌭',
      'klobasa': '🌭',
      'losos': '🐟',
      'tuňák': '🐟',
      'tunak': '🐟',
      'máslo': '🧈',
      'maslo': '🧈',
      'vejce': '🥚',
      'sýr': '🧀',
      'syr': '🧀',
      'mléko': '🥛',
      'mleko': '🥛',
      'smetana': '🥛',
      'jogurt': '🥣',
      'tvaroh': '🥣',
      'parmazán': '🧀',
      'parmazan': '🧀',
      'mozzarella': '🧀',
      'rajčata': '🍅',
      'rajcata': '🍅',
      'cibule': '🧅',
      'česnek': '🧄',
      'cesnek': '🧄',
      'paprika': '🌶️',
      'brambory': '🥔',
      'mrkev': '🥕',
      'celer': '🥬',
      'zelí': '🥬',
      'zeli': '🥬',
      'salát': '🥗',
      'salat': '🥗',
      'okurka': '🥒',
      'cuketa': '🥒',
      'brokolice': '🥦',
      'špenát': '🌿',
      'spenat': '🌿',
      'kukuřice': '🌽',
      'kukurice': '🌽',
      'hrášek': '🟢',
      'hrasek': '🟢',
      'jablko': '🍎',
      'hrušeň': '🍐',
      'hrušen': '🍐',
      'hrusen': '🍐',
      'banán': '🍌',
      'banan': '🍌',
      'jahody': '🍓',
      'citron': '🍋',
      'mouka': '🌾',
      'rýže': '🍚',
      'ryze': '🍚',
      'těstoviny': '🍝',
      'testoviny': '🍝',
      'chléb': '🍞',
      'chleb': '🍞',
      'housky': '🥖',
      'olej': '🧴',
      'cukr': '🧂',
      'čokoláda': '🍫',
      'cokolada': '🍫',
      'kečup': '🍅',
      'kecup': '🍅',
      'hořčice': '🍯',
      'horcice': '🍯',
      'rajčatový protlak': '🍅',
      'rajcatovy protlak': '🍅',
      'sojová omáčka': '🍶',
      'sojova omacka': '🍶'
    };

    const uniqueNames = Array.from(
      new Set(fridgeItems.map(item => item.name.toLowerCase()))
    );

    return uniqueNames.slice(0, 10).map(name => iconMap[name] || '🥕');
  }, [fridgeItems]);

  const today = new Date();
  const monthNames = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];
  const monthName = monthNames[today.getMonth()];
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const dayNumbers = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const currentDay = today.getDate();

  return (
    <div className="main-menu">
      <div className="menu-header">
        <div className="header-logo-container">
          <img src={logo} alt="Zlatá Lednice" className="menu-logo" />
          <h2>Zlatá Lednice</h2>
        </div>
        <button onClick={onLogout} className="logout-btn">Odhlásit</button>
      </div>
      <div className="menu-icons">
        <button onClick={() => onSelectMenu('fridge')} className="menu-icon-btn">
          <div className="icon-tile">
            <div className="fridge-visual">
              <div className="fridge-body">
                <div className="fridge-items-grid">
                  {ingredientIcons.map((icon, idx) => (
                    typeof icon === 'string' ? (
                      <span key={`${icon}-${idx}`} className="fridge-item-icon">{icon}</span>
                    ) : (
                      <img
                        key={`img-${idx}`}
                        src={icon}
                        alt="Surovina"
                        className="fridge-item-image"
                      />
                    )
                  ))}
                </div>
                <div className="fridge-shelf" />
                <div className="fridge-shelf shelf-lower" />
              </div>
              <div className="fridge-door" />
            </div>
            <span className="icon-label">Moje Lednice</span>
          </div>
        </button>

        <button onClick={() => onSelectMenu('saved')} className="menu-icon-btn">
          <div className="icon-tile">
            <div className="wallet-icon">
              <div className="wallet-top" />
              <div className="wallet-body">
                <div className="wallet-coin">Kč</div>
              </div>
            </div>
            <span className="icon-label">Ušetřeno</span>
          </div>
        </button>

        <button onClick={() => onSelectMenu('expiration')} className="menu-icon-btn">
          <div className="icon-tile">
            <div className="calendar-icon">
              <div className="calendar-header">{monthName}</div>
              <div className="calendar-grid">
                {dayNumbers.map(day => (
                  <div
                    key={day}
                    className={`calendar-day${day === currentDay ? ' current' : ''}`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>
            <span className="icon-label">Trvanlivost</span>
          </div>
        </button>
      </div>
    </div>
  );
}
