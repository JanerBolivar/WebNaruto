import React from "react";

const CharacterCard = ({ character, onClick }) => {
  return (
    <li
      onClick={onClick}
      className="px-4 py-5 duration-150 hover:border-white hover:rounded-xl hover:bg-gray-50 bg-gray-100 rounded-xl cursor-pointer"
    >
      <div className="space-y-3">
        <div className="flex items-center gap-x-3">
          <div className="bg-white w-14 h-14 border rounded-full flex items-center justify-center overflow-hidden">
            <img
              src={character.images?.[0] || "https://es.pngtree.com/so/default-avatar"}
              alt={character.name || "Sin nombre"}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <span className="block text-sm text-indigo-600 font-medium">
              {character.name || "Nombre no disponible"}
            </span>
            <h3 className="text-base text-gray-800 font-semibold mt-1">
              Nacido en {character.personal.birthdate || "No definido"}
            </h3>
          </div>
        </div>
        <p className="text-gray-600 sm:text-sm">
          Padre: {character.family?.father || "Desconocido"}, Madre: {character.family?.mother || "Desconocida"}, Esposa: {character.family?.wife || "Desconocida"}, Hijos: {character.family?.son || "N/A"}, {character.family?.daughter || "N/A"}
        </p>
        <p className="text-gray-600 sm:text-sm">Aparece en: {character.debut?.appearsIn || "No disponible"}</p>
      </div>
    </li>
  );
};

export default CharacterCard;
