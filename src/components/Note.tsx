import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import useLocalNotes from "../hooks/useLocalNote";

const Note = () => {
  const savedNotes = useLocalNotes();
  const [localNotes, setLocalNotes] = useState<string[]>(savedNotes);
  const [value, setValue] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (savedNotes.length === 0) {
      return;
    }
    setLocalNotes(savedNotes);
  }, [savedNotes]);

  useEffect(() => {
    if (localNotes.length === 0) {
      return;
    }
    const data = {
      notes: localNotes,
    };
    localStorage.setItem("notes", JSON.stringify(data));
  }, [localNotes]);

  const handleSave = () => {
    setLocalNotes((prev) => [...prev, text]);
    setText("");
  };

  const handleLoad: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (e) => {
      const value = e.target.value;

      setValue(value);

      if (value === "") {
        return setText("");
      }

      setText(localNotes[parseInt(value, 10)]);
    },
    [localNotes]
  );

  const handleChange = (str: string) => {
    setText(str);
  };

  //fonction pour supprimer une note

  const handleDelete = () => {
    setLocalNotes((prev) => {
      const newNotes = [...prev];
      newNotes.splice(parseInt(value, 10), 1);
      return newNotes;
    });
    setValue("");
    setText("");
  };



  return (
    <div className="flex flex-col">
      <div>
        <span>Charger une note</span>
        <select onChange={handleLoad}>
          <option value="">Nouvelle note</option>
          {localNotes.map((el, i) => {
            return (
              <option value={i} key={`k-${i}`}>
                {el.substring(0, 10)}
              </option>
            );
          })}
        </select>
      </div>
      <textarea
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        className="border border-black"
      />
      {value === "" && <button onClick={handleSave}>Save</button>}
      {value !== "" && <button onClick={handleDelete}>Delete</button>}
    </div>
  );
};

export default Note;
