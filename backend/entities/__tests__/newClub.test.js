/// <reference types='jest' />

const { newClubEntity } = require('../newClub');

describe('test newClubEntity', () => {
  const FIXED_SYSTEM_TIME = '2023-12-01T14:30:55.027Z';
  beforeEach(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(Date.parse(FIXED_SYSTEM_TIME));
  });

  it('should return a new club entity', () => {
    const desiredClub = {
      area: { id: 2072, name: 'England' },
      name: 'Faketz',
      shortName: null,
      tla: null,
      crestUrl: null,
      address: 'calle falsa 123',
      phone: null,
      website: null,
      email: null,
      founded: null,
      clubColors: null,
      venue: null,
      lastUpdated: FIXED_SYSTEM_TIME,
    };
    expect(
      newClubEntity({
        name: 'Faketz',
        address: 'calle falsa 123',
      }),
    ).toMatchObject(desiredClub);
  });

  it('does not return unexpected fields', () => {
    const desiredClub = {
      area: { id: 2072, name: 'England' },
      name: 'Faketz',
      shortName: null,
      tla: null,
      crestUrl: null,
      address: null,
      phone: null,
      website: 'www.faketz.com',
      email: 'fktz@email.com',
      founded: 1985,
      clubColors: null,
      venue: null,
      lastUpdated: FIXED_SYSTEM_TIME,
    };
    expect(
      newClubEntity({
        name: 'Faketz',
        website: 'www.faketz.com',
        email: 'fktz@email.com',
        founded: 1985,
        SQL: 'GIVE ME EVERYTHING',
        hack: 'athron',
      }),
    ).toMatchObject(desiredClub);
  });

  it('should throw an error because of no name provided', () => {
    expect(() => newClubEntity({ tla: 'FKT' })).toThrowError();
  });
});
