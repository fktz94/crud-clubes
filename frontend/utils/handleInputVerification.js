export default function handleInputVerification(name, data, value, setError, setSuccess) {
  if (value === ' ' || (value.split('').slice(-2)[0] === ' ' && data === ' ')) return false;

  // CLUB FOUNDATION YEAR verification
  if (name === 'founded' && data && (!data.match(/[\d]/) || value.length > 4)) {
    return false;
  }

  if (
    name === 'founded' &&
    value.length === 4 &&
    (value < 1800 || value > new Date().getFullYear())
  ) {
    setError((prev) => {
      return { ...prev, [name]: `Debe ingresar un año entre 1800 y  ${new Date().getFullYear()}` };
    });
  } else if (name === 'founded') {
    setError((prev) => {
      return { ...prev, [name]: '' };
    });
  }

  if (name === 'founded' && value.length === 4) {
    setSuccess((prev) => {
      return { ...prev, [name]: true };
    });
  } else if (name === 'founded') {
    setSuccess((prev) => {
      return { ...prev, [name]: false };
    });
  }

  // CLUB ABREVIATION verification
  if (name === 'tla' && data && (!data.match(/[A-Za-z]/) || value.length > 3)) return false;

  if (name === 'tla' && value.length === 3) {
    setSuccess((prev) => {
      return { ...prev, [name]: true };
    });
  } else if (name === 'tla') {
    setSuccess((prev) => {
      return { ...prev, [name]: false };
    });
  }

  // CLUB PHONE verification
  if (name === 'phone' && data && !data.match(/[+()\-\d\s]/)) return false;
  if (
    name === 'phone' &&
    (value.split(/\D/).join('').length > 15 ||
      value.match(/-{2,}/) ||
      value.match(/\({2,}/) ||
      value.match(/\){2,}/) ||
      value.match(/\+{2,}/))
  )
    return false;

  if (name === 'phone') {
    setError((prev) => {
      return { ...prev, [name]: '' };
    });
  }

  if (name === 'name') {
    setError((prev) => {
      return { ...prev, [name]: '' };
    });
  }
  return true;
}
