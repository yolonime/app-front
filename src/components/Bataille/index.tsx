//creation d'un jeu de bataille
import { useState, useEffect } from "react";

// regle du jeu:
// chaque joueur a une main de 26 cartes
// chaque joueur la 1ere carte de sa main lorsqu'il appuis sur le bouton bataille
// le joueur qui a la carte la plus forte gagne et remporte les 2 cartes qui vont dans sa main
// si les cartes sont egales on fait une bataille : chaque joueur met une carte face cachee et une carte face visible
// le joueur qui a la carte la plus forte gagne et remporte toutes les cartes
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
    const [inGame, setInGame] = useState<boolean>(false);
    const [btnBataille, setBtnBataille] = useState<boolean>(true);
    const [mainJoueur, setMainJoueur] = useState<string[]>([]);
    const [mainDealer, setMainDealer] = useState<string[]>([]);
    const [carteJoueur, setCarteJoueur] = useState<string>("");
    const [carteDealer, setCarteDealer] = useState<string>("");
    const [carteVisibleJoueur, setCarteVisibleJoueur] = useState<string>("");
    const [carteVisibleDealer, setCarteVisibleDealer] = useState<string>("");
    const [carteCacheeJoueur, setCarteCacheeJoueur] = useState<string>("");
    const [carteCacheeDealer, setCarteCacheeDealer] = useState<string>("");
    const [bataille, setBataille] = useState<boolean>(false);
    const [gagnant, setGagnant] = useState<string>("");
    const [perdant, setPerdant] = useState<string>("");
    const [fin, setFin] = useState<boolean>(false);
    const [carteEnJeu, setCarteEnJeu] = useState<string[]>([]); //todo metre les cartes en jeu dans un tableau au cas ou plusieurs batailles s'enchainent
    const [carteBatailleJoueur, setCarteBatailleJoueur] = useState<string>("");
    const [carteBatailleDealer, setCarteBatailleDealer] = useState<string>("");

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
        setBtnBataille(true);
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
        let poidsCarteJoueur = poidsCarte(carteJoueur);
        let poidsCarteDealer = poidsCarte(carteDealer);
        setMainJoueur(mainJoueur.slice(1));
        setMainDealer(mainDealer.slice(1));
        console.log(mainJoueur);
        console.log(mainDealer);
        if (poidsCarteJoueur === poidsCarteDealer) {
            setBataille(true);
            setBtnBataille(false);
            setCarteVisibleJoueur(mainJoueur[0]);
            setCarteVisibleDealer(mainDealer[0]);
            setCarteCacheeJoueur(mainJoueur[1]);
            setCarteCacheeDealer(mainDealer[1]);
            setCarteBatailleJoueur(mainJoueur[2]);
            setCarteBatailleDealer(mainDealer[2]);
            setMainJoueur(mainJoueur.slice(2));
            setMainDealer(mainDealer.slice(2));
            console.log("bataille!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            
        } else if (carteJoueur > carteDealer) {
            let newMainJoueur = [...mainJoueur, carteJoueur, carteDealer];
            newMainJoueur.shift();
            setMainJoueur(newMainJoueur);
            
        } else {
            let newMainDealer = [...mainDealer, carteDealer, carteJoueur];
            newMainDealer.shift();
            setMainDealer(newMainDealer);

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
        let poidsCarteJoueur = poidsCarte(carteJoueur);
        let poidsCarteDealer = poidsCarte(carteDealer);
        setMainJoueur(mainJoueur.slice(1));
        setMainDealer(mainDealer.slice(1));
        let carteEnJeu = [carteJoueur, carteDealer, carteVisibleJoueur, carteVisibleDealer, carteCacheeJoueur, carteCacheeDealer];
        setCarteEnJeu(carteEnJeu);
        console.log(carteEnJeu);
        if (poidsCarteJoueur === poidsCarteDealer) {
            setBataille(true);
            setCarteVisibleJoueur(mainJoueur[0]);
            setCarteVisibleDealer(mainDealer[0]);
            setCarteCacheeJoueur(mainJoueur[1]);
            setCarteCacheeDealer(mainDealer[1]);
            setMainJoueur(mainJoueur.slice(2));
            setMainDealer(mainDealer.slice(2));
        } else if (carteJoueur > carteDealer) {
            let newMainJoueur = [...mainJoueur, carteJoueur, carteDealer, carteVisibleJoueur, carteVisibleDealer, carteCacheeJoueur, carteCacheeDealer];
            newMainJoueur.shift();
            setMainJoueur(newMainJoueur);
            console.log(newMainJoueur);
            setBtnBataille(true);
            
        } else {
            let newMainDealer = [...mainDealer, carteDealer, carteJoueur, carteVisibleDealer, carteVisibleJoueur, carteCacheeDealer, carteCacheeJoueur];
            newMainDealer.shift();
            setMainDealer(newMainDealer);
            setMainDealer(newMainDealer);
            console.log(newMainDealer);
            setBtnBataille(true);
            
            
        }
    };
    


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
            <h1 className="text-3xl font-bold mb-5">Jeu de Bataille</h1>
            <button onClick={init} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Nouvelle Partie</button>
            <div className="flex justify-center items-center">
                <div className="flex flex-col items-center justify-center px-5">
                    <h2 className="text-2xl font-bold">Joueur</h2>
                    <p>prochaine cartes: {mainJoueur[0]}</p>
                    <p>Nombre de cartes: {mainJoueur.length}</p>
                    {inGame && (
                        <div className="flex flex-col items-center justify-center">
                            <p>Carte:</p>
                            <div className="flex flex-col items-center justify-center border-2 border-stone-800 font-bold h-20 w-10 rounded text-center">
                                <p>{carteJoueur}</p>
                            </div> 
                        </div>        
                    )}
                    
                    {bataille && (
                        <div className="flex flex-col items-center justify-center">
                            <p>Carte Cachee:</p>
                            <div className="flex flex-col items-center justify-center border-2 border-stone-800 font-bold h-20 w-10 rounded text-center">
                                <p>?</p>
                            </div> 
                        </div>
                    )}
                    {bataille && (
                        <div className="flex flex-col items-center justify-center">
                            <p>Carte Bataille:</p>
                            <div className="flex flex-col items-center justify-center border-2 border-stone-800 font-bold h-20 w-10 rounded text-center">
                                <p>{carteBatailleJoueur}</p>
                            </div> 
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-center justify-center px-5">
                    <h2 className="text-2xl font-bold">Dealer</h2>
                    <p>prochaine cartes: ?</p>
                    <p>Nombre de cartes: {mainDealer.length}</p>
                    {inGame && (
                        <div className="flex flex-col items-center justify-center">
                            <p>Carte:</p>
                            <div className="flex flex-col items-center justify-center border-2 border-stone-800 font-bold h-20 w-10 rounded text-center">
                                <p>{carteDealer}</p>
                            </div> 
                        </div>        
                    )} 
                    {bataille && (
                        <div className="flex flex-col items-center justify-center">
                            <p>Carte Cachee:</p>
                            <div className="flex flex-col items-center justify-center border-2 border-stone-800 font-bold h-20 w-10 rounded text-center">
                                <p>?</p>
                            </div> 
                        </div>
                    )}
                    {bataille && (
                        <div className="flex flex-col items-center justify-center">
                            <p>Carte Bataille:</p>
                            <div className="flex flex-col items-center justify-center border-2 border-stone-800 font-bold h-20 w-10 rounded text-center">
                                <p>{carteBatailleDealer}</p>
                            </div> 
                        </div>
                    )}
                    
                    
                </div>
            </div>
            {btnBataille && (
                <button onClick={jouerCarte} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">Bataille</button>
            )}
            {bataille && (
                <button onClick={faireBataille} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">Faire Bataille</button>
            )}
            
            {fin && (
                <div>
                    <h2 className="text-2xl font-bold mt-5">Gaganant: {gagnant}</h2>
                    <h2 className="text-2xl font-bold mt-5">Perdant: {perdant}</h2>
                </div>
            )}
            <div className="fixed bottom-0 left-0 p-6 bg-gray-100 rounded-t-lg shadow-md w-full sm:w-1/3">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Règles du jeu de la bataille</h2>
                <p className="text-gray-700 mb-2">
                    Le jeu se joue généralement à deux joueurs. Les 52 cartes sont distribuées équitablement et placées face cachée en piles devant chaque joueur.
                </p>
                <p className="text-gray-700 mb-2">
                    À chaque tour, les joueurs tirent la carte du dessus de leur paquet et la posent face visible sur la table. Celui qui a la carte la plus forte remporte les cartes jouées.
                </p>
                <p className="text-gray-700 mb-2">
                    Les cartes sont classées par valeur : As (le plus fort), Roi, Dame, Valet, 10, etc. Les couleurs n'ont pas d'importance dans ce jeu.
                </p>
                <h3 className="text-md font-semibold text-gray-800 mt-4 mb-2">Cas de bataille</h3>
                <p className="text-gray-700 mb-2">
                    Si deux cartes de même valeur sont jouées, il y a "bataille". Les joueurs posent alors une carte face cachée sur leur carte précédente, puis une deuxième carte face visible. La valeur de cette dernière carte départage les joueurs. Celui qui a la carte la plus forte remporte toutes les cartes en jeu.
                </p>
                <h3 className="text-md font-semibold text-gray-800 mt-4 mb-2">Condition de victoire</h3>
                <p className="text-gray-700">
                    Le gagnant est le joueur qui parvient à remporter toutes les cartes du paquet.
                </p>
            </div>

        </div>

    );
}
export default Bataille;

