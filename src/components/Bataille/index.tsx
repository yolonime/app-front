//creation d'un jeu de bataille
import { useState, useEffect } from "react";

// regle du jeu:
// chaque joueur a une main de 26 cartes
// chaque joueur la 1ere carte de sa main lorsqu'il appuis sur le bouton bataille
// le joueur qui a la carte la plus forte gagne
// si les cartes sont egales on fait une bataille : chaque joueur met une carte face cachee et une carte face visible
// le joueur qui a la carte la plus forte gagne
// si les cartes sont egales on refait une bataille
// si un joueur n'a plus de carte il a perdu


const Bataille = () => {
  //carte existante
    const cartes_coeur = ["2♥", "3♥", "4♥", "5♥", "6♥", "7♥", "8♥", "9♥", "10♥", "V♥", "D♥", "R♥", "A♥"];
    const cartes_carreau = ["2♦", "3♦", "4♦", "5♦", "6♦", "7♦", "8♦", "9♦", "10♦", "V♦", "D♦", "R♦", "A♦"];
    const cartes_pique = ["2♠", "3♠", "4♠", "5♠", "6♠", "7♠", "8♠", "9♠", "10♠", "V♠", "D♠", "R♠", "A♠"];
    const cartes_trefle = ["2♣", "3♣", "4♣", "5♣", "6♣", "7♣", "8♣", "9♣", "10♣", "V♣", "D♣", "R♣", "A♣"];
    const allcartes = [...cartes_coeur, ...cartes_carreau, ...cartes_pique, ...cartes_trefle];

    //etat du jeu
    const [mainJoueur, setMainJoueur] = useState<string[]>([]);
    const [mainDealer, setMainDealer] = useState<string[]>([]);
    const [carteJoueur, setCarteJoueur] = useState<string>("");
    const [carteDealer, setCarteDealer] = useState<string>("");
    const [carteVisibleJoueur, setCarteVisibleJoueur] = useState<string>("");
    const [carteVisibleDealer, setCarteVisibleDealer] = useState<string>("");
    const [carteCacheeJoueur, setCarteCacheeJoueur] = useState<string>("");
    const [carteCacheeDealer, setCarteCacheeDealer] = useState<string>("");
    const [scoreJoueur, setScoreJoueur] = useState<number>(0);
    const [scoreDealer, setScoreDealer] = useState<number>(0);
    const [bataille, setBataille] = useState<boolean>(false);
    const [gagnant, setGagnant] = useState<string>("");
    const [perdant, setPerdant] = useState<string>("");
    const [fin, setFin] = useState<boolean>(false);

    //initialisation du jeu
    const init = () => {
        //melange des cartes
        allcartes.sort(() => Math.random() - 0.5);
        //distribution des cartes
        let mainJoueur = allcartes.slice(0, 26);
        let mainDealer = allcartes.slice(26, 52);
        setMainJoueur(mainJoueur);
        setMainDealer(mainDealer);
        setScoreJoueur(0);
        setScoreDealer(0);
        setFin(false);
    };

    //fonction pour jouer une carte
    const jouerCarte = () => {
        if (mainJoueur.length === 0 || mainDealer.length === 0) {
            setFin(true);
            return;
        }
        let carteJoueur = mainJoueur[0];
        let carteDealer = mainDealer[0];
        setCarteJoueur(carteJoueur);
        setCarteDealer(carteDealer);
        setMainJoueur(mainJoueur.slice(1));
        setMainDealer(mainDealer.slice(1));
        if (carteJoueur === carteDealer) {
            setBataille(true);
            setCarteVisibleJoueur(mainJoueur[0]);
            setCarteVisibleDealer(mainDealer[0]);
            setCarteCacheeJoueur(mainJoueur[1]);
            setCarteCacheeDealer(mainDealer[1]);
            setMainJoueur(mainJoueur.slice(2));
            setMainDealer(mainDealer.slice(2));
        } else if (carteJoueur > carteDealer) {
            setScoreJoueur(scoreJoueur + 1);
        } else {
            setScoreDealer(scoreDealer + 1);
        }
    };

    //fonction pour faire une bataille
    const faireBataille = () => {
        setBataille(false);
        if (mainJoueur.length === 0 || mainDealer.length === 0) {
            setFin(true);
            return;
        }
        let carteJoueur = mainJoueur[0];
        let carteDealer = mainDealer[0];
        setCarteJoueur(carteJoueur);
        setCarteDealer(carteDealer);
        setMainJoueur(mainJoueur.slice(1));
        setMainDealer(mainDealer.slice(1));
        if (carteJoueur === carteDealer) {
            setBataille(true);
            setCarteVisibleJoueur(mainJoueur[0]);
            setCarteVisibleDealer(mainDealer[0]);
            setCarteCacheeJoueur(mainJoueur[1]);
            setCarteCacheeDealer(mainDealer[1]);
            setMainJoueur(mainJoueur.slice(2));
            setMainDealer(mainDealer.slice(2));
        } else if (carteJoueur > carteDealer) {
            setScoreJoueur(scoreJoueur + 1);
        } else {
            setScoreDealer(scoreDealer + 1);
        }
    };

    //fonction pour terminer la bataille
    const terminerBataille = () => {
        setBataille(false);
        if (carteJoueur > carteDealer) {
            setScoreJoueur(scoreJoueur + 1);
        } else {
            setScoreDealer(scoreDealer + 1);
        }
    };

    //fonction pour afficher le gagnant
    useEffect(() => {
        if (fin) {
            if (scoreJoueur > scoreDealer) {
                setGagnant("Joueur");
                setPerdant("Dealer");
            } else {
                setGagnant("Dealer");
                setPerdant("Joueur");
            }
        }
    }, [fin, scoreJoueur, scoreDealer]);



        
        
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-5">Jeu de Bataille</h1>
            <button onClick={init} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Nouvelle Partie</button>
            <div className="flex justify-center items-center">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold">Joueur</h2>
                    <p>cartes: {mainJoueur}</p>
                    <p>Score: {scoreJoueur}</p>
                    <p>Carte: {carteJoueur}</p>
                    {bataille && (
                        <div>
                            <p>Carte Visible: {carteVisibleJoueur}</p>
                            <p>Carte Cachee: {carteCacheeJoueur}</p>
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold">Dealer</h2>
                    <p>cartes: {mainDealer}</p>
                    <p>Score: {scoreDealer}</p>
                    <p>Carte: {carteDealer}</p>
                    {bataille && (
                        <div>
                            <p>Carte Visible: {carteVisibleDealer}</p>
                            <p>Carte Cachee: {carteCacheeDealer}</p>
                        </div>
                    )}
                </div>
            </div>
            <button onClick={jouerCarte} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">Bataille</button>
            {bataille && (
                <button onClick={faireBataille} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">Faire Bataille</button>
            )}
            {bataille && (
                <button onClick={terminerBataille} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">Terminer Bataille</button>
            )}
            {fin && (
                <div>
                    <h2 className="text-2xl font-bold mt-5">Gaganant: {gagnant}</h2>
                    <h2 className="text-2xl font-bold mt-5">Perdant: {perdant}</h2>
                </div>
            )}
        </div>

    );
}
export default Bataille;