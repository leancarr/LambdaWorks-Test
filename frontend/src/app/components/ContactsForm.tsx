'use client';
import { useState } from 'react';

export default function ContactsForm({ onContactAdded }: { onContactAdded: () => void }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [errores, setErrores] = useState<{ nombre?: string; email?: string }>({});

  const validar = () => {
    const nuevosErrores: { nombre?: string; email?: string } = {};

    if (!nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    } else if (nombre.trim().length < 2) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 2 caracteres';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre.trim())) {
      nuevosErrores.nombre = 'El nombre solo puede contener letras';
    }

    if (!email.trim()) {
      nuevosErrores.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nuevosErrores.email = 'El email no tiene un formato válido';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validar()) return;

    const res = await fetch('http://localhost:4000/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email }),
    });

    if (res.ok) {
      setNombre('');
      setEmail('');
      setErrores({});
      onContactAdded();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Añadir Nuevo Contacto</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Nombre Completo</label>
          <input
            type="text"
            placeholder="Juan Pérez"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errores.nombre ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errores.nombre && (
            <span className="text-red-500 text-sm">{errores.nombre}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="juan.perez@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errores.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errores.email && (
            <span className="text-red-500 text-sm">{errores.email}</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors mt-2"
        >
          Agregar Contacto
        </button>
      </form>
    </div>
  );
}