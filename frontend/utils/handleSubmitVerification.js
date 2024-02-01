export default function handleSubmitVerification(formData, setError, isCreating) {
  if (formData.founded && formData.founded.length < 4) {
    setError((prev) => {
      return { ...prev, founded: `Debe ingresar un año entre 1800 y ${new Date().getFullYear()}` };
    });
    return true;
  }

  if (formData.phone && formData.phone.length < 8) {
    setError((prev) => {
      return { ...prev, phone: `El número ingresado es muy corto` };
    });
    return true;
  }

  if (isCreating && !formData.name) {
    setError((prev) => {
      return { ...prev, name: 'El nombre es requerido' };
    });
    return true;
  }
  return false;
}
