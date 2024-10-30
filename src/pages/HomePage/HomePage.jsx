import React, { useState, useEffect } from "react";
import axios from 'axios';
import CharacterCard from "../../components/CharacterCard";
import CharacterModal from "../../components/CharacterModal";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [characters, setCharacters] = useState([]);

  // Maneja el click en una tarjeta de personaje
  const handleCardClick = (character) => {
    setSelectedCharacter(character);
    setShowModal(true);
  };

  // Llama a la API para obtener personajes
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get("https://dattebayo-api.onrender.com/characters");
        setCharacters(response.data.characters);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <>
      <section className="py-28">
        <div className="max-w-screen-lg mx-auto px-4 md:px-8">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-gray-800 text-2xl font-extrabold sm:text-3xl">
              Personajes de Naruto
            </h1>
            <p className="text-gray-600 mt-2">
              Estos son todos los personajes de Naruto, obtenidos desde la API.
            </p>
          </div>

          <ul className="mt-12 divide-y space-y-3 max-w-2xl mx-auto">
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onClick={() => handleCardClick(character)}
              />
            ))}
          </ul>
        </div>
      </section>

      {showModal && selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          onClose={() => setShowModal(false)}
          isFavoritePage={false}
        />
      )}
    </>
  );
};

export default HomePage;
