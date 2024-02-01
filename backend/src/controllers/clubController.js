const {
  validateNewClub,
  validateUpdatedClub,
} = require('../../schemas/clubSchema');
const clubService = require('../services/clubService');

const getAllClubs = (req, res) => {
  try {
    const allClubs = clubService.getAllClubs();
    res.status(200).send({ status: 'OK', data: allClubs });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

const getOneClub = (req, res) => {
  const {
    params: { clubId },
  } = req;

  if (!clubId) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: 'Parameter :clubId cannot be missing' },
    });
    return;
  }

  try {
    const selectedClub = clubService.getOneClub(clubId);
    res.status(200).send({ status: 'OK', data: selectedClub });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

const createNewClub = (req, res) => {
  const { body, file } = req;

  const validated = validateNewClub(body);

  if (validated.error) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: JSON.parse(validated.error) },
    });
    return;
  }

  const newClub = { ...validated.data, file };

  try {
    const createdClub = clubService.createNewClub(newClub);
    res.status(201).send({ status: 'OK', data: createdClub });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

const updateOneClub = (req, res) => {
  const {
    body,
    file,
    params: { clubId },
  } = req;

  if (!clubId) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: 'Parameter :clubId cannot be missing' },
    });
    return;
  }

  const validated = validateUpdatedClub(body);

  if (validated.error) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: JSON.parse(validated.error) },
    });
    return;
  }

  const allChanges = file
    ? { ...validated.data, crestUrl: file.filename }
    : validated.data;

  try {
    const updatedClub = clubService.updateOneClub(clubId, allChanges);
    res.status(200).send({ status: 'OK', data: updatedClub });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

const deleteOneClub = (req, res) => {
  const {
    params: { clubId },
  } = req;

  if (!clubId) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: 'Parameter :clubId cannot be missing' },
    });
    return;
  }

  try {
    clubService.deleteOneClub(clubId);
    res.status(204).send({ status: 'OK' });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllClubs,
  getOneClub,
  createNewClub,
  updateOneClub,
  deleteOneClub,
};
