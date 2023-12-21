const stateToFormData = (data) => {
  const form = new FormData();

  Object.entries(data)
    .filter(([_, value]) => value)
    .map(([key, value]) => {
      return form.append(key, value);
    });

  return form;
};

export default stateToFormData;
