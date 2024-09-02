import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

import './App.css'
import api from './api.js'

// Define types for state
interface Room {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await api.get<Room[]>('');
        setRooms(response.data);
      } catch (err) {
        // Type guard to check if it's an AxiosError
        if (axios.isAxiosError(err)) {
          // Access properties on AxiosError
          const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
          setError(errorMessage);
        } else if (err instanceof Error) {
          // Handle generic errors
          setError(err.message);
        } else {
          // Handle unknown errors
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {rooms.map((room) => (
        <div key={room.id}>
          {room.code}
        </div>
      ))}
    </div>
  );
};

export default App;
