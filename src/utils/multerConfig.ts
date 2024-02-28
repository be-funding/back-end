// multerConfig.ts

import path from 'path';
import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.resolve(__dirname, 'uploads')
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

export const upload = multer({ storage })
