import React from "react";
import CatList from "./components/CatList";
import Roulette from "./components/Roulette";
import Main from "./pages/Main";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Note from "./components/Note";
import Counter from "./components/Counter";
import Context from "./components/ContextDemo";
import Movies from "./components/Movies";
import Pendu from "./components/Pendu";
import Calculator from "./components/Calculator";
import MemoryColors from "./components/MemoryColors";
import Get from "./components/Get";
import Imc from "./components/IMC";
import Carte from "./components/Carte";
import Focus from "./Focus";
import Storage from "./Storage";
import Todo from "./Todo";
import Bataille from "./components/Bataille";
import Poker from "./components/Poker";
import InfiniteLoader from "./InfiniteLoader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Counter2 from "./components/Counter/CounterZustand";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "bataille",
        element: <Bataille />,
      },
      {
        path: "cat",
        element: <CatList />,
      },
      {
        path: "roulette",
        element: <Roulette />,
      },
      {
        path: "poker",
        element: <Poker />,
      },
      {
        path: "note",
        element: <Note />,
      },
      {
        path: "counter",
        element: <Counter />,
      },
      {
        path: "context",
        element: <Context />,
      },
      {
        path: "movies",
        element: <Movies />,
      },
      {
        path: "pendu",
        element: <Pendu />,
      },
      {
        path: "calculator",
        element: <Calculator />,
      },
      {
        path: "memory",
        element: <MemoryColors />,
      },
      {
        path: "imc",
        element: <Imc />,
      },
      {
        path: "carte",
        element: <Carte />,
      }
    ],
  },
  {
    path: "/get/:id",
    element: <Get />,
  },
  {
    path: "/focus",
    element: <Focus />,
  },
  {
    path: "/storage",
    element: <Storage />,
  },
  {
    path: "/todo",
    element: <Todo />,
  },
  {
    path: "/infinite",
    element: <InfiniteLoader />,
  },
  {
    path: "/counter2",
    element: <Counter2 />,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
