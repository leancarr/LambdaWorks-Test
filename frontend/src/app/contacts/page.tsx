'use client';
import { useState } from 'react';
import ContactsForm from '../components/ContactsForm';
import ContactsList from '../components/ContactsList';

export default function ContactsPage() {
  const [reload, setReload] = useState(false);

  const handleContactAdded = () => {
    // alterna el valor de reload para forzar el re-fetch
    setReload((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <ContactsForm onContactAdded={handleContactAdded} />
        </div>
        <div className="w-full md:w-2/3">
          <ContactsList reload={reload} />
        </div>
      </div>
    </div>
  );
}
