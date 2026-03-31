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
    <div className="flex gap-8 p-8">
      <div className="w-1/3">
        <ContactsForm onContactAdded={handleContactAdded} />
      </div>
      <div className="w-2/3">
        <ContactsList reload={reload} />
      </div>
    </div>
  );
}
