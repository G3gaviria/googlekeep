import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

const NotesContext = React.createContext();

const NotesContextProvider = ({ children }) => {
  const [notes, setNotes] = useState(() => {
    // Inicialización con el valor del localStorage
    const savedNotes = localStorage.getItem("Notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  // Guardar los datos en localStorage cada vez que notes cambia
  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);

  // addNote function
  const addNote = ({ title, content }) => {
    const newNote = {
      id: uuid(),
      title,
      content,
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  // deleteNote function
  const deleteNote = (noteId) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
  };

  // updateNote
  const updateNote = (updatedNote) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, updateNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export { NotesContext, NotesContextProvider };
