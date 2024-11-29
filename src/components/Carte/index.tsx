//jeu de black jack
import { useState } from 'react';
import { clsx } from 'clsx';
import './carte.css';

const cartes_coeur = ["1♥","2♥", "3♥", "4♥", "5♥", "6♥", "7♥", "8♥", "9♥", "10♥", "V♥", "D♥", "R♥", "A♥"];
const cartes_carreau = ["1♦","2♦", "3♦", "4♦", "5♦", "6♦", "7♦", "8♦", "9♦", "10♦", "V♦", "D♦", "R♦", "A♦"];
const cartes_pique = ["1♠","2♠", "3♠", "4♠", "5♠", "6♠", "7♠", "8♠", "9♠", "10♠", "V♠", "D♠", "R♠", "A♠"];
const cartes_trefle = ["1♣","2♣", "3♣", "4♣", "5♣", "6♣", "7♣", "8♣", "9♣", "10♣", "V♣", "D♣", "R♣", "A♣"];

//fonction start qui initialise le jeu
const start = () => {
  console.log('start');

  const main = getMain();
  const main_dealer = getMainDealer();


}

const hit = () => {
  console.log('hit');
}

const stand = () => {
  console.log('stand');
}

const double = () => {
  console.log('double');
}

const split = () => {
  console.log('split');
}

//fonction getCarte qui retourne une carte aleatoire
const getCarte = () => {
  const cartes = [...cartes_coeur, ...cartes_carreau, ...cartes_pique, ...cartes_trefle];
  return cartes[Math.floor(Math.random() * cartes.length)];
}

//fonction getValeur qui retourne la valeur d'une carte
const getValeur = (carte: string) => {
  if (carte === "V" || carte === "D" || carte === "R") {
    return 10;
  } else if (carte === "A") {
    return 11;
  } else {
    return parseInt(carte);
  }
}

//fonction getScore qui retourne le score d'une main
const getScore = (main: string[]) => {
    let score = 0;
  let nb_as = 0;
  for (let carte of main) {
    const valeur = getValeur(carte);
    if (valeur === 11) {
      nb_as++;
    }
    score += valeur;
  }
  while (score > 21 && nb_as > 0) {
    score -= 10;
    nb_as--;
  }
  return score;
}

//fonction getMain qui retourne la main du joueur
const getMain = () => {
  const main = [];
  main.push(getCarte());
  main.push(getCarte());
  return main;
}

//fonction getMainDealer qui retourne la main du dealer
const getMainDealer = () => {
  const main = [];
  main.push(getCarte());
  main.push(getCarte());
  return main;
}




const Carte = () => {
  return (
    <div>
      <div className='titre'>
        <h1>Carte</h1>
      </div>
      <div className='allcarte'>
        <div className='carte_rouge'>
          <div className='carte'>
            <h2>Carte de coeur</h2>
            <ul>
              {cartes_coeur.map((carte) => (
                <li key={carte}>{carte}</li>
              ))}
            </ul>
          </div>
          <div className='carte'>
            <h2>Carte de carreau</h2>
            <ul>
              {cartes_carreau.map((carte) => (
                <li key={carte}>{carte}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='carte_noir'>
          <div className='carte'>
            <h2>Carte de pique</h2>
            <ul>
              {cartes_pique.map((carte) => (
                <li key={carte}>{carte}</li>
              ))}
            </ul>
          </div>
          <div className='carte'>
            <h2>Carte de trefle</h2>
            <ul>
              {cartes_trefle.map((carte) => (
                <li key={carte}>{carte}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className='jeu'>
        <div className = 'dealer'>
          <h2>Dealer</h2>
          <div className='carte'>
            <ul>
              <li>Carte 1</li>
              <li>Carte 2</li>
            </ul>
          </div>
        </div>
        <div className = 'joueur'>
          <h2>Joueur</h2>
          <div className='carte'>
            <ul>
              <li>Carte 1</li>
              <li>Carte 2</li>
            </ul>
          </div>
        </div>
        <div className='resultat'>
          <h2>Resultat</h2>
          <p>Resultat</p>
        </div>
      </div>
      <div className='bouton'>
        <button onClick={start}>Start</button>
        <button onClick={hit}>Hit</button>
        <button onClick={stand}>Stand</button>
        <button onClick={double}>Double</button>
        <button onClick={split}>Split</button>
      </div>
    </div>
  );
}

export default Carte;