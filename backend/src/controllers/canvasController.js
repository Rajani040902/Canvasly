const asyncHandler = require('express-async-handler');
const Canvas = require('../models/Canvas');

const createCanvas = asyncHandler(async (req, res) => {
  const { name, width, height, background, elements } = req.body;

  const canvas = await Canvas.create({
    name,
    width,
    height,
    background,
    elements,
  });

  res.status(201).json({ success: true, data: canvas });
});

 const getCanvases = asyncHandler(async (req, res) => {
  const canvases = await Canvas.find();
  res.status(200).json({ success: true, data: canvases });
});

const getCanvasById = asyncHandler(async (req, res) => {
  const canvas = await Canvas.findById(req.params.id);
  res.status(200).json({ success: true, data: canvas });
});

const updateCanvas = asyncHandler(async (req, res) => {
  const canvas = await Canvas.findById(req.params.id);

  if (!canvas) {
    res.status(404);
    throw new Error('Canvas not found');
  }

  const { name, width, height, background, elements } = req.body;

  if (name !== undefined) canvas.name = name;
  if (width !== undefined) canvas.width = width;
  if (height !== undefined) canvas.height = height;
  if (background !== undefined) canvas.background = background;
  if (elements !== undefined) canvas.elements = elements;

  const updated = await canvas.save();
  res.status(200).json({ success: true, data: updated });
});

const deleteCanvas = asyncHandler(async (req, res) => {
  const canvas = await Canvas.findById(req.params.id);

  if (!canvas) {
    res.status(404);
    throw new Error('Canvas not found');
  }

  await canvas.deleteOne();
  res.status(200).json({ success: true, data: { id: req.params.id } });
});

module.exports = { createCanvas, getCanvases, getCanvasById, updateCanvas, deleteCanvas };