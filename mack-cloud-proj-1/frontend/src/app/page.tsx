"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Pet {
  nome: string;
  tipo: string;
  idade: number;
  raca: string;
}

export default function Home() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar os dados dos pets
  useEffect(() => {
    const fetchPets = async () => {
      try {
        // URL da API FastAPI
        const response = await axios.get('http://127.0.0.1:25000/pets');
        setPets(response.data as Pet[]);
      } catch (error) {
        console.error('Erro ao buscar dados dos pets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  // Se estiver carregando os dados, mostra um texto de loading
  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lista de Pets</h1>
      {pets.length === 0 ? (
        <p>Nenhum pet encontrado!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {pets.map((pet, index) => (
            <li
              key={index}
              style={{
                padding: '10px',
                marginBottom: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
              }}
            >
              <h3>{pet.nome}</h3>
              <p><strong>Tipo:</strong> {pet.tipo}</p>
              <p><strong>Idade:</strong> {pet.idade} anos</p>
              <p><strong>Raça:</strong> {pet.raca}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
