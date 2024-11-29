import { Link, Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="flex w-full flex-col justify-center items-center">
      <nav className="w-full flex justify-between list-none p-5">
        <li>
          <Link to="/bataille">Bataille</Link>
        </li>
        <li>
          <Link to="/Poker">Poker</Link>
        </li>
        <li>
          <Link to="/cat">Cat</Link>
        </li>
        <li>
          <Link to="/roulette">Roulette</Link>
        </li>
        <li>
          <Link to="/note">Note</Link>
        </li>
        <li>
          <Link to="/counter">Counter</Link>
        </li>
        <li>
          <Link to="/context">Context</Link>
        </li>
        <li>
          <Link to="/movies">Movies</Link>
        </li>
        <li>
          <Link to="/pendu">Pendu</Link>
        </li>
        <li>
          <Link to="/calculator">Calculette</Link>
        </li>
        <li>
          <Link to="/memory">Memory</Link>
        </li>
        <li>
          <Link to="/imc">IMC</Link>
        </li>
        <li>
          <Link to="/carte">Carte</Link>
        </li>
      </nav>
      <Outlet />
    </div>
  );
};

export default Main;
