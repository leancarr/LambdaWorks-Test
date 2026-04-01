'use client';
import { useEffect, useState } from 'react';

export default function ContactsList({ reload }: { reload: boolean }) {
  const [contactos, setContactos] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [editando, setEditando] = useState<number | null>(null);
  const [editNombre, setEditNombre] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [errores, setErrores] = useState<{ nombre?: string; email?: string }>({});

  const fetchContacts = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts`);
    const data = await res.json();
    setContactos(data);
  };

  const contactosFiltrados = contactos.filter(
    (c) =>
      c.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.email?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const validar = () => {
    const nuevosErrores: { nombre?: string; email?: string } = {};

    if (!editNombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    } else if (editNombre.trim().length < 2) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 2 caracteres';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(editNombre.trim())) {
      nuevosErrores.nombre = 'El nombre solo puede contener letras';
    }

    if (!editEmail.trim()) {
      nuevosErrores.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editEmail)) {
      nuevosErrores.email = 'El email no tiene un formato válido';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleDelete = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts/${id}`, {
      method: 'DELETE',
    });
    fetchContacts();
  };

  const handleEdit = (c: any) => {
    setEditando(c.id);
    setEditNombre(c.nombre);
    setEditEmail(c.email);
    setErrores({});
  };

  const handleUpdate = async (id: number) => {
    if (!validar()) return;

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: editNombre, email: editEmail }),
    });
    setEditando(null);
    setErrores({});
    fetchContacts();
  };

  useEffect(() => {
    fetchContacts();
  }, [reload]);

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 w-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Mis Contactos</h2>

      <input
        type="text"
        placeholder="Buscar por nombre o email..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="w-full">
        <div className="grid grid-cols-4 bg-gray-800 text-white font-semibold rounded-lg px-4 py-2 mb-2">
          <span>Nombre</span>
          <span>Email</span>
          <span className="col-span-2">Acciones</span>
        </div>
        {contactosFiltrados.length === 0 && (
          <p className="text-gray-400 text-center py-4">No se encontraron contactos</p>
        )}
        {contactosFiltrados.map((c) => (
          <div
            key={c.id}
            className="grid grid-cols-4 px-4 py-3 border-b border-gray-100 hover:bg-gray-50 items-start"
          >
            {editando === c.id ? (
              <>
                <div className="flex flex-col gap-1 pr-2">
                  <input
                    value={editNombre}
                    onChange={(e) => setEditNombre(e.target.value)}
                    className={`border rounded px-2 py-1 ${errores.nombre ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errores.nombre && <span className="text-red-500 text-xs">{errores.nombre}</span>}
                </div>
                <div className="flex flex-col gap-1 pr-2">
                  <input
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className={`border rounded px-2 py-1 ${errores.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errores.email && <span className="text-red-500 text-xs">{errores.email}</span>}
                </div>
                <div className="col-span-2 flex gap-3 pt-1">
                  <button
                    onClick={() => handleUpdate(c.id)}
                    className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-lg transition-colors"
                  >
                    ✅ Guardar
                  </button>
                  <button
                    onClick={() => setEditando(null)}
                    className="bg-gray-400 hover:bg-gray-500 text-white text-sm px-3 py-1 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="text-gray-800 break-words pr-2">{c.nombre}</span>
                <span className="text-gray-800 break-all pr-2">{c.email}</span>
                <div className="col-span-2 flex gap-3 pt-1">
                  <button
                    onClick={() => handleEdit(c)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-lg transition-colors"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-lg transition-colors"
                  >
                    🗑 Borrar
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}