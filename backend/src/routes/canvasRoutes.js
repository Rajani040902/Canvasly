const express = require('express');
const { createCanvas, getCanvases, getCanvasById, updateCanvas, deleteCanvas } = require('../controllers/canvasController');
const { body, param  } = require('express-validator');
const validate = require('../middleware/validate');
const protect = require('../middleware/auth');

const router = express.Router();
router.use(protect);

router.post('/', [body('name').notEmpty()], validate, createCanvas);
router.get('/', getCanvases);
router.get('/:id', [param('id').isMongoId()], validate, getCanvasById);
router.put('/:id', [param('id').isMongoId()], validate, updateCanvas);
router.delete('/:id', [param('id').isMongoId()], validate, deleteCanvas);

module.exports = router;