import React, { useState, useEffect, createContext } from "react";
import { db } from "../firebase";
import { collection, addDoc, updateDoc, deleteDoc, onSnapshot, doc } from "firebase/firestore";

const NotesContext = createContext();

const NotesContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  // Cargar notas al inicio
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "notes"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(data);
    });

    return () => unsubscribe();
  }, []);

  // Agregar nota
  const addNote = async ({ title, content }) => {
    try {
      await addDoc(collection(db, "notes"), {
        title,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Error al agregar Nota: ", error);
    }
  };

  // Actualizar nota
  const updateNote = async ({ id, title, content }) => {
    try {
      const noteDoc = doc(db, "notes", id);
      await updateDoc(noteDoc, {
        title,
        content,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Error al actualizar Nota: ", error);
    }
  };

  // Eliminar nota
  const deleteNote = async (id) => {
    try {
      const noteDoc = doc(db, "notes", id);
      await deleteDoc(noteDoc);
    } catch (error) {
      console.error("Error al eliminar Nota: ", error);
    }
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export { NotesContext, NotesContextProvider };
