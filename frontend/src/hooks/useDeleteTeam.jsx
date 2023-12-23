import { useState } from 'react';

export default function useDeleteTeam() {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/api/v1/clubs/${id}`, { method: 'DELETE' });
    setIsDeleting(false);
  };

  const toggleDelete = () => {
    setIsDeleting(!isDeleting);
  };

  return { handleDelete, toggleDelete, isDeleting };
}
