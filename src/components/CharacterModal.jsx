import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const CharacterModal = ({ character, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(character.isFavorite || false);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTranslateX(-100);

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (character.images?.length || 1));
        setTranslateX(0);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [character.images]);

  const handleFavorite = async () => {
    setIsFavorite(!isFavorite);
  
    if (!isFavorite) {
      const characterData = {
        name: character.name,
        birthdate: character.personal.birthdate,
        characterId: character.id,
      };
  
      try {
        const docRef = doc(db, 'favoritos', character.id.toString());
        await setDoc(docRef, characterData);
        console.log("Personaje añadido a favoritos:", characterData);
      } catch (error) {
        console.error("Error al añadir a favoritos:", error);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-6 rounded-lg max-w-md mx-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-4 overflow-hidden">
          <img
            src={character.images?.[currentImageIndex] || "https://es.pngtree.com/so/default-avatar"}
            alt={character.name || "Sin nombre"}
            className={`w-full h-64 object-cover rounded-md transition-transform duration-300 ease-in-out`}
            style={{ transform: `translateX(${translateX}%)` }}
          />
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">{character.name || "Nombre no disponible"}</h2>
          <p className="text-gray-600 mt-2">Debut en Manga: {character.debut?.manga || "No disponible"}</p>
          <p className="text-gray-600 mt-2">Clan: {character.clan || "Desconocido"}</p>
        </div>

        <button
          onClick={handleFavorite}
          className={`py-2 px-4 rounded-md text-white ${isFavorite ? "bg-red-500" : "bg-gray-500"}`}
        >
          {isFavorite ? "Añadido a Favoritos" : "Añadir a Favoritos"}
        </button>
      </div>
    </div>
  );
};

export default CharacterModal;
