import { useEffect, useState } from "react";

type Notes = {
  notes: string[];
};

const useLocalNotes = () => {
  const [saveNotes, setSaveNotes] = useState<Notes>();

  useEffect(() => {
    const notes = localStorage.getItem("notes") ?? "{notes: []}";
    try {
      const json = JSON.parse(notes) as Notes;
      setSaveNotes(json);
    } catch {}
  }, []);

  return saveNotes?.notes ?? [];
};

export default useLocalNotes;
