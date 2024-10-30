import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { db } from "../../firebaseConfig";
import CharacterCard from "../../components/CharacterCard";
import CharacterModal from "../../components/CharacterModal";

const FavoritePage = () => {
    const [favoriteCharacters, setFavoriteCharacters] = useState([]);
    const [charactersData, setCharactersData] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Efecto para obtener personajes favoritos de Firestore
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'favoritos'));
                const favorites = [];
                querySnapshot.forEach((doc) => {
                    favorites.push({ id: doc.id, ...doc.data() });
                });
                setFavoriteCharacters(favorites);
            } catch (error) {
                console.error("Error al obtener los personajes favoritos:", error);
            }
        };

        fetchFavorites();
    }, []);

    // Efecto para obtener datos de los personajes desde la API
    useEffect(() => {
        const fetchCharacterData = async () => {
            try {
                const requests = favoriteCharacters.map((character) =>
                    axios.get(`https://dattebayo-api.onrender.com/characters/${character.characterId}`)
                );

                const responses = await Promise.all(requests);
                const charactersInfo = responses.map(response => response.data);
                setCharactersData(charactersInfo);
            } catch (error) {
                console.error("Error al obtener datos de personajes de la API:", error);
            }
        };

        if (favoriteCharacters.length > 0) {
            fetchCharacterData();
        }
    }, [favoriteCharacters]);

    const handleCharacterClick = (character) => {
        setSelectedCharacter(character);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCharacter(null);
    };

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-3xl font-bold underline text-center mb-4">Personajes Favoritos</h1>
            <p className="text-center mb-8">
                Aquí encontrarás todos los personajes que has marcado como favoritos.
                Haz clic en ellos para ver más detalles.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {charactersData.map(character => (
                    <CharacterCard
                        key={character.id}
                        character={character}
                        onClick={() => handleCharacterClick(character)}
                    />
                ))}
            </ul>

            {isModalOpen && selectedCharacter && (
                <CharacterModal
                    character={selectedCharacter}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default FavoritePage;
