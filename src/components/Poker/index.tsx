//creation d'un jeu de bataille
import { set } from "mongoose";
import { useState, useEffect } from "react";

// regle du jeu:
// chaque joueur a une main de 26 cartes
// chaque joueur possede 5 dans sa main lors du debut de la partie
// chaque joueur choisit une carte de sa main et la pose face visible
// le joueur qui a la carte la plus forte gagne et remporte les 2 cartes qui vont dans sa main
// si les cartes sont egales on fait une bataille : chaque joueur met une carte face cachee et une carte face visible
// le joueur qui a la carte la plus forte gagne et remporte toutes les cartes
// si les cartes sont egales on refait une bataille
// si un joueur n'a plus de carte il a perdu


const Poker = () => {
  //carte existante
    const cartes_coeur = ["2♥", "3♥", "4♥", "5♥", "6♥", "7♥", "8♥", "9♥", "10♥", "V♥", "D♥", "R♥", "A♥"];
    const cartes_carreau = ["2♦", "3♦", "4♦", "5♦", "6♦", "7♦", "8♦", "9♦", "10♦", "V♦", "D♦", "R♦", "A♦"];
    const cartes_pique = ["2♠", "3♠", "4♠", "5♠", "6♠", "7♠", "8♠", "9♠", "10♠", "V♠", "D♠", "R♠", "A♠"];
    const cartes_trefle = ["2♣", "3♣", "4♣", "5♣", "6♣", "7♣", "8♣", "9♣", "10♣", "V♣", "D♣", "R♣", "A♣"];
    const allcartes = [...cartes_coeur, ...cartes_carreau, ...cartes_pique, ...cartes_trefle];

    //etat du jeu
    const [inGame, setInGame] = useState<boolean>(false);
    const [fin, setFin] = useState<boolean>(false);
    const [gagnant, setGagnant] = useState<string>("");
    const [perdant, setPerdant] = useState<string>("");
    const [mainJoueur, setMainJoueur] = useState<string[]>([]);
    const [mainDealer, setMainDealer] = useState<string[]>([]);
    const [mainJoueur5, setMainJoueur5] = useState<string[]>([]);
    const [mainDealer5, setMainDealer5] = useState<string[]>([]);


    //initialisation du jeu
    const init = () => {
        //melange des cartes
        allcartes.sort(() => Math.random() - 0.5);
        //distribution des cartes
        let mainJoueur = allcartes.slice(0, 26);
        let mainDealer = allcartes.slice(26, 52);
        setMainJoueur(mainJoueur);
        setMainDealer(mainDealer);;
        setFin(false);
        setInGame(true);
        //distribu 5 carte au joueur et 5 carte au dealer
        let mainJoueur5 = mainJoueur.slice(0, 5);
        let mainDealer5 = mainDealer.slice(0, 5);
        setMainJoueur5(mainJoueur5);
        setMainDealer5(mainDealer5);
        console.log(mainJoueur5);
        console.log(mainDealer5);
    };

    //fonction pour donner un poids a chaque carte
    const poidsCarte = (carte: string) => {
        let poids = 0;
        if (carte.includes("2")) {
            poids = 2;
        } else if (carte.includes("3")) {
            poids = 3;
        } else if (carte.includes("4")) {
            poids = 4;
        } else if (carte.includes("5")) {
            poids = 5;
        } else if (carte.includes("6")) {
            poids = 6;
        } else if (carte.includes("7")) {
            poids = 7;
        } else if (carte.includes("8")) {
            poids = 8;
        } else if (carte.includes("9")) {
            poids = 9;
        } else if (carte.includes("10")) {
            poids = 10;
        } else if (carte.includes("V")) {
            poids = 11;
        } else if (carte.includes("D")) {
            poids = 12;
        } else if (carte.includes("R")) {
            poids = 13;
        } else if (carte.includes("A")) {
            poids = 14;
        }
        return poids 
    }
    
    //fonction qui refrechit les main des joueurs

    //fonction qui prend la carte selectionnee par le joueur
    const thisCarte = (carte: string) => {

        let carteDealer = mainDealer5[0];
        let carteJoueur = carte;
        //poids des cartes
        let poidsCarteDealer = poidsCarte(carteDealer);
        let poidsCarteJoueur = poidsCarte(carteJoueur);

        if (poidsCarteJoueur > poidsCarteDealer) {
            let newMainJoueur = [...mainJoueur, carteDealer, carteJoueur];
            setMainJoueur(newMainJoueur);
            let newMainDealer = mainDealer5.slice(1);
            setMainDealer(newMainDealer);

            let newMainJoueur5 = mainJoueur5.slice(1);
            setMainJoueur5(newMainJoueur5);
            let newMainDealer5 = mainDealer5.slice(1);
            setMainDealer5(newMainDealer5);
        }
        if (poidsCarteJoueur < poidsCarteDealer) {
            let newMainDealer = [...mainDealer, carteDealer, carteJoueur];
            setMainDealer(newMainDealer);
            let newMainJoueur = mainJoueur5.slice(1);
            setMainJoueur(newMainJoueur);
            let newMainJoueur5 = mainJoueur5.slice(1);
            setMainJoueur5(newMainJoueur5);
            let newMainDealer5 = mainDealer5.slice(1);
            setMainDealer5(newMainDealer5);
        }
        if (poidsCarteJoueur === poidsCarteDealer) {
            let newMainDealer = [...mainDealer, carteDealer, carteJoueur];
            setMainDealer(newMainDealer);
            let newMainJoueur = mainJoueur5.slice(1);
            setMainJoueur(newMainJoueur);
            let newMainJoueur5 = mainJoueur5.slice(1);
            setMainJoueur5(newMainJoueur5);
            let newMainDealer5 = mainDealer5.slice(1);
            setMainDealer5(newMainDealer5);
        }
        if (mainJoueur.length === 0) {
            setFin(true);
        }
        if (mainDealer.length === 0) {
            setFin(true);
        }
    }




    //fonction pour afficher le gagnant
    
    useEffect(() => {
        if (fin) {
            setInGame(false);
            if (mainDealer.length === 0) {
                setGagnant("Joueur");
                setPerdant("Dealer");
            }
            if (mainJoueur.length === 0) {
                setGagnant("Dealer");
                setPerdant("Joueur");
            }
        }
    }, [mainJoueur, mainDealer, fin]);


        
        
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Poker</h1>
            <button className="bg-blue-500 text-white p-2 rounded" onClick={init}>
                Commencer
            </button>
            {inGame && (
                <div className="flex justify-between w-1/2">
                    <div>
                        <h2>Joueur</h2>
                        <div className="flex items-center justify-center">
                            {mainJoueur5.map((carte, index) => (
                                <button onClick={() => thisCarte(carte)} key={index} className="border-2 border-stone-800 font-bold h-20 w-10 rounded text-center">
                                    {carte}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2>Dealer</h2>
                        <div className="flex items-center justify-center">
                            {mainDealer5.map((carte, index) => (
                                <button key={index} className="border-2 border-stone-800 font-bold h-20 w-10 rounded text-center">
                                    ?
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}
export default Poker;

