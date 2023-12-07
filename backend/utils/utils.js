function getRandomID(data) {
  const newId = Math.ceil(Math.random() * 500);

  if (typeof data === 'number')
    return data === newId ? getRandomID(data) : newId;

  const existingIds = data?.map((team) => team.id || team);
  return existingIds?.includes(newId) ? getRandomID(existingIds) : newId;
}

module.exports = { getRandomID };
