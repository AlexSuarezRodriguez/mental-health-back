const { Router } = require('express');
const multer = require('multer');

const { uploadImageHandler } = require('./upload.controller');

const router = Router();

const upload = multer({ dest: './temp' });

router.post('/image', upload.single('file'), uploadImageHandler);

module.exports = router;
