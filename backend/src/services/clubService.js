const { newClubEntity } = require('../../entities/newClub');
const Club = require('../database/Club');

const getAllClubs = () => {
  const allClubs = Club.getAllClubs();
  return allClubs;
};

const getOneClub = (clubId) => {
  const club = Club.getOneClub(clubId);
  return club;
};

const createNewClub = (newClub) => {
  const clubToInsert = newClubEntity(newClub);
  const createdClub = Club.createNewClub(clubToInsert);
  return createdClub;
};

const updateOneClub = (clubId, changes) => {
  const updatedClub = Club.updateOneClub(clubId, changes);
  return updatedClub;
};

const deleteOneClub = (clubId) => {
  Club.deleteOneClub(clubId);
};

module.exports = {
  getAllClubs,
  getOneClub,
  createNewClub,
  updateOneClub,
  deleteOneClub,
};
