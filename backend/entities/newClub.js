function newClubEntity(newClub) {
  const {
    name,
    shortName,
    tla,
    file,
    address,
    phone,
    website,
    email,
    founded,
    clubColors,
    venue,
  } = newClub;

  if (!name) throw new Error('name must be provided');

  const clubToInsert = {
    area: { id: 2072, name: 'England' },
    name,
    shortName: shortName || null,
    tla: tla || null,
    crestUrl: file ? file.path : null,
    address: address || null,
    phone: phone || null,
    website: website || null,
    email: email || null,
    founded: founded || null,
    clubColors: clubColors || null,
    venue: venue || null,
    lastUpdated: new Date().toISOString(),
  };

  return clubToInsert;
}

module.exports = { newClubEntity };
