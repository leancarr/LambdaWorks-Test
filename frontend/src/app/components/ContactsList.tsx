  'use client';
  import { useEffect, useState } from 'react';

  export default function ContactsList({ reload }: { reload: boolean }) {
    const [contactos, setContactos] = useState<any[]>([]);

  const fetchContacts = async () => {
    const res = await fetch('http://localhost:4000/contacts');
    const data = await res.json();
    setContactos(data);
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:4000/contacts/${id}`, {
      method: 'DELETE',
    });
    fetchContacts();
  };

  useEffect(() => {
    fetchContacts();
  }, [reload]);

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Mis Contactos</h2>
      <div className="w-full">
        <div className="grid grid-cols-4 bg-gray-800 text-white font-semibold rounded-lg px-4 py-2 mb-2">
          <span>ID</span>
          <span>Nombre</span>
          <span>Email</span>
          <span>Acciones</span>
        </div>
        {contactos.map((c) => (
          <div
            key={c.id}
            className="grid grid-cols-4 px-4 py-3 border-b border-gray-100 hover:bg-gray-50 items-center"
          >
            <span className="text-gray-600">{c.id}</span>
            <span className="text-gray-800 break-words pr-2">{c.nombre}</span>
            <span className="text-gray-800 break-all pr-2">{c.email}</span>
            <div>
              <button
                onClick={() => handleDelete(c.id)}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-lg transition-colors flex items-center gap-1"
              >
                🗑 Borrar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}