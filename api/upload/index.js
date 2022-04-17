const { Router } = require('express');
// eslint-disable-next-line import/no-unresolved
const multer = require('multer');

const { uploadImageHandler } = require('./upload.controller');

const router = Router();

const upload = multer({ dest: './temp' });

router.post('/image', upload.single('file'), uploadImageHandler);

module.exports = router;
