/* eslint-disable no-throw-literal */
const DB = require('./db.json');
const { saveToDatabase } = require('./utils');
const { getRandomID } = require('../../utils/utils');

const getAllClubs = () => {
  try {
    return DB.clubs;
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};

const getOneClub = (clubId) => {
  const selectedClub = DB.clubs.find((club) => club.id === +clubId);

  if (!selectedClub) {
    throw {
      status: 400,
      message: `Club with ID ${clubId} does not exist`,
    };
  }

  try {
    return selectedClub;
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};

const createNewClub = (newClub) => {
  const isAlreadyAdded =
    DB.clubs.findIndex((club) => club.name === newClub.name) > -1;

  if (isAlreadyAdded) {
    throw {
      status: 400,
      message: `Club with name ${newClub.name} already exists`,
    };
  }

  const createdClub = {
    id: getRandomID(DB.clubs),
    ...newClub,
  };

  try {
    DB.clubs.push(createdClub);
    saveToDatabase(DB);
    return createdClub;
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};

const updateOneClub = (clubId, changes) => {
  const indexForUpdated = DB.clubs.findIndex((club) => club.id === +clubId);

  if (indexForUpdated === -1) {
    throw {
      status: 400,
      message: `Club with ID ${clubId} does not exist`,
    };
  }

  if (Object.keys(changes).length === 0) {
    throw {
      status: 400,
      data: { error: 'There is no content to modify' },
    };
  }

  const updatedClub = {
    ...DB.clubs[indexForUpdated],
    ...changes,
    lastUpdated: new Date().toISOString(),
  };

  try {
    DB.clubs[indexForUpdated] = updatedClub;
    saveToDatabase(DB);
    return updatedClub;
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};

const deleteOneClub = (clubId) => {
  const indexForDeleted = DB.clubs.findIndex((club) => club.id === +clubId);

  if (indexForDeleted === -1) {
    throw {
      status: 400,
      message: `Club with ID ${clubId} does not exist`,
    };
  }

  try {
    DB.clubs.splice(indexForDeleted, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};

module.exports = {
  getAllClubs,
  getOneClub,
  createNewClub,
  updateOneClub,
  deleteOneClub,
};
