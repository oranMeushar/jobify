const express = require('express');

const router = express.Router();
const protected = require('../middleware/protected');
const jobController = require('../controllers/job');

router.post('/', protected, jobController.addJob);
router.get('/', protected, jobController.getAllJobs);
router.delete('/:id', protected, jobController.deleteJob);
router.patch('/:id', protected, jobController.editJob);

module.exports = router;