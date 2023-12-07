const request = require('supertest');
const app = require('../app');
// const db = require('../database/db.json');

const MAIN_PATH = '/api/v1/clubs';
const fakeDb = {
  clubs: [
    {
      id: 58,
      area: {
        id: 2072,
        name: 'England',
      },
      name: 'Aston Villa FC',
      shortName: 'Aston Villa',
      tla: 'AST',
      crestUrl:
        'https://upload.wikimedia.org/wikipedia/de/9/9f/Aston_Villa_logo.svg',
      address: 'Villa Park Birmingham B6 6HE',
      phone: '+44 (0121) 3272299',
      website: 'http://www.avfc.co.uk',
      email: null,
      founded: 1872,
      clubColors: 'Claret / Sky Blue',
      venue: 'Villa Park',
      lastUpdated: '2020-05-14T02:41:36Z',
    },
    {
      id: 61,
      area: {
        id: 2072,
        name: 'England',
      },
      name: 'Chelsea FC',
      shortName: 'Chelsea',
      tla: 'CHE',
      crestUrl: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
      address: 'Fulham Road London SW6 1HS',
      phone: '+44 (0871) 9841955',
      website: 'http://www.chelseafc.com',
      email: null,
      founded: 1905,
      clubColors: 'Royal Blue / White',
      venue: 'Stamford Bridge',
      lastUpdated: '2023-11-28T14:44:14.662Z',
    },
    {
      id: 62,
      area: {
        id: 2072,
        name: 'England',
      },
      name: 'Everton FC',
      shortName: 'Everton',
      tla: 'EVE',
      crestUrl:
        'https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg',
      address: 'Goodison Park Liverpool L4 4EL',
      phone: '+44 (0871) 6631878',
      website: 'http://www.evertonfc.com',
      email: 'everton@evertonfc.com',
      founded: 1878,
      clubColors: 'Blue / White',
      venue: 'Goodison Park',
      lastUpdated: '2020-05-14T02:41:42Z',
    },
    {
      id: 64,
      area: {
        id: 2072,
        name: 'England',
      },
      name: 'Liverpool FC',
      shortName: 'Liverpool',
      tla: 'LIV',
      crestUrl:
        'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
      address: 'Anfield Road Liverpool L4 OTH',
      phone: '+44 (0844) 4993000',
      website: 'http://www.liverpoolfc.tv',
      email: 'customercontact@liverpoolfc.tv',
      founded: 1892,
      clubColors: 'Red / White',
      venue: 'Anfield',
      lastUpdated: '2020-05-14T02:41:46Z',
    },
  ],
};

jest.mock('../database/db.json');

describe('GET ALL /clubs', () => {
  it('should respond with a 200 status', async () => {
    const response = await request(app).get(MAIN_PATH).send();
    expect(response.statusCode).toBe(200);
  });
  it('should specify json in the content type header', async () => {
    const response = await request(app).get(MAIN_PATH).send();
    expect(response.headers['content-type']).toMatch(/json/);
  });
  it('should respond array with proper information', async () => {
    const response = await request(app).get(MAIN_PATH).send();
    expect(Object.keys(response.body)).toContain('status', 'data');
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBe(fakeDb.clubs.length);
  });
});

describe('GET ONE /clubs/:id', () => {
  const ID_PATH = `${MAIN_PATH}/61`;
  it('should respond with a 200 status', async () => {
    const response = await request(app).get(ID_PATH).send();
    expect(response.statusCode).toBe(200);
  });
  it('should specify json in the content type header', async () => {
    const response = await request(app).get(ID_PATH).send();
    expect(response.headers['content-type']).toMatch(/json/);
  });
  it('should respond object with proper information', async () => {
    const response = await request(app).get(ID_PATH).send();
    expect(Object.keys(response.body)).toContain('status', 'data');
    expect(response.body.data).toBeInstanceOf(Object);
    expect(response.body.data.name).toEqual('Chelsea FC');
  });

  const BAD_REQ_ID = `${MAIN_PATH}/123456`;

  it('should respond status 400 with incorrect id', async () => {
    const response = await request(app).get(BAD_REQ_ID).send();
    expect(response.statusCode).toBe(400);
  });
  it('should respond error message with incorrect id', async () => {
    const response = await request(app).get(BAD_REQ_ID).send();
    expect(response.body.data).toHaveProperty('error');
    expect(response.body.data.error).toMatch('123456');
  });
  it('should show the incorrect id in the error message', async () => {
    const response = await request(app).get(BAD_REQ_ID).send();
    expect(response.body.data.error).toMatch(BAD_REQ_ID.split('/').at(-1));
  });
});

describe('POST NEW /clubs', () => {
  // const newPostedClub = { name: 'Fakeir', tla: 'FKT' };
  // it('should respond with a 201 status', async () => {
  //   const response = await request(app).post(MAIN_PATH).send(newPostedClub);
  //   expect(response.statusCode).toBe(201);
  // });
  // it('should specify json in the content type header', async () => {
  //   const response = await request(app).post(MAIN_PATH).send(newPostedClub);
  //   expect(response.headers['content-type']).toMatch(/json/);
  // });
  // it('should return complete new team', async () => {
  //   const response = await request(app).post(MAIN_PATH).send(newPostedClub);
  //   expect(response.body).toMatchObject(newPostedClub);
  //   expect(validateNewClub(response.body)).toBe(true);
  // });
});

describe('PATCH ONE /clubs/:id', () => {});

describe('DELETE ONE /clubs/:id', () => {});
