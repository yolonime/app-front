import { useEffect, useState } from "react";
import { clsx } from "clsx";

const colors = ["R", "B", "Y", "G"];

const getColor = () => colors[Math.floor(Math.random() * colors.length)];

const MemoryColors = () => {
  const [status, setStatus] = useState<
    "init" | "ended" | "started" | "user" | "computer"
  >("init");
  const [round, setRound] = useState(0);
  const [computerValue, setComputerValue] = useState("");
  const [userValue, setUserValue] = useState("");
  const [activeBlue, setActiveBlue] = useState(false);
  const [activeGreen, setActiveGreen] = useState(false);
  const [activeYellow, setActiveYellow] = useState(false);
  const [activeRed, setActiveRed] = useState(false);

  useEffect(() => {
    if (userValue === "" || status !== "user") {
      return;
    }

    if (
      userValue === computerValue &&
      userValue.length === computerValue.length
    ) {
      return setRound((prev) => prev + 1);
    }
    if (!computerValue.startsWith(userValue)) {
      return setStatus("ended");
    }
  }, [userValue, computerValue, status]);

  useEffect(() => {
    if (activeRed) {
      window.setTimeout(() => {
        setActiveRed(false);
        console.log("red off");
      }, 1000);
    }
  }, [activeRed]);

  useEffect(() => {
    if (activeBlue) {
      window.setTimeout(() => {
        setActiveBlue(false);
      }, 1000);
    }
  }, [activeBlue]);

  useEffect(() => {
    if (activeGreen) {
      window.setTimeout(() => {
        setActiveGreen(false);
      }, 1000);
    }
  }, [activeGreen]);

  useEffect(() => {
    if (activeYellow) {
      window.setTimeout(() => {
        setActiveYellow(false);
      }, 1000);
    }
  }, [activeYellow]);

  useEffect(() => {
    if (round === 0) {
      return;
    }

    setComputerValue((prev) => prev + getColor());
    setStatus("computer");
    setUserValue("");
  }, [round]);

  useEffect(() => {
    if (!computerValue || status !== "computer") {
      return;
    }
    let count = 0;

    const interVal = window.setInterval(() => {
      if (count === computerValue.length) {
        window.clearInterval(interVal);
        return setStatus("user");
      }
      const currentColor = computerValue.charAt(count);

      if (currentColor === "R") {
        console.log("red on");
        setActiveRed(true);
      }
      if (currentColor === "B") {
        setActiveBlue(true);
      }
      if (currentColor === "Y") {
        setActiveYellow(true);
      }
      if (currentColor === "G") {
        setActiveGreen(true);
      }
      count += 1;
    }, 1200);
  }, [computerValue, status]);

  const handlePlay = (color: string) => {
    if (status === "computer") {
      return;
    }
    setUserValue((prev) => prev + color);
  };

  return (
    <>
      <div className="flex flex-col border-4 border-black flex-wrap w-[408px] h-[408px]">
        <div
          onClick={() => handlePlay("R")}
          className={clsx(
            "cursor-pointer hover:brightness-200 bg-red-600 border border-gray-300 flex-1 basis-[200px]",
            { "brightness-200": activeRed },
            { "cursor-default": status === "computer" }
          )}
        ></div>
        <div
          onClick={() => handlePlay("B")}
          className={clsx(
            "cursor-pointer hover:brightness-200 bg-blue-600  border border-gray-300 flex-1 basis-[200px]",
            { "brightness-200": activeBlue },
            { "cursor-default": status === "computer" }
          )}
        ></div>
        <div
          onClick={() => handlePlay("Y")}
          className={clsx(
            "cursor-pointer hover:brightness-200 bg-yellow-600 border border-gray-300 flex-1 basis-[200px]",
            { "brightness-200": activeYellow },
            { "cursor-default": status === "computer" }
          )}
        ></div>
        <div
          onClick={() => handlePlay("G")}
          className={clsx(
            "cursor-pointer hover:brightness-200 bg-green-600  border border-gray-300 flex-1 basis-[200px]",
            { "brightness-200": activeGreen },
            { "cursor-default": status === "computer" }
          )}
        ></div>
      </div>
      {status === "init" && (
        <button
          onClick={() => {
            setStatus("computer");
            setRound(1);
          }}
          className="mt-2 border p-2 w-[120px] border-black"
        >
          Start
        </button>
      )}
      {status === "ended" && <span>C'est perdu !</span>}
      {status === "user" && (
        <span className="font-bold">A vous de jouer !</span>
      )}
    </>
  );
};

export default MemoryColors;
