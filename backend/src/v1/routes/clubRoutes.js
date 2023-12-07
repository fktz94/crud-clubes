const express = require('express');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: './uploads/img' });

const clubController = require('../../controllers/clubController');

router
  .get('/', clubController.getAllClubs)

  .get('/:clubId', clubController.getOneClub)

  .post('/', upload.single('file'), clubController.createNewClub)

  .patch('/:clubId', upload.single('file'), clubController.updateOneClub)

  .delete('/:clubId', clubController.deleteOneClub);

module.exports = router;
