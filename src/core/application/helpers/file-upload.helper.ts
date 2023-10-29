import { randomUUID } from "crypto";
import { diskStorage } from "multer";
import path = require("path");

const fs = require('fs');

export class FileUploadHelper {

  static saveFileToStorage() {
    return ({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileExtension: string = path.extname(file.originalname);
          const fileName: string = randomUUID() + fileExtension;
          cb(null, fileName);
        },

      }),
      fileFilter: (req, file, cb) => {
        cb(null, true)
        // const allowedMimeTypes: validMimeType[] = validMimeTypes;
        // allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
      },
    })
  }

  static removeFiles(filePaths: string[]) {
    try {
      filePaths.forEach(filePath => {
        fs.unlinkSync(filePath);
      })
    } catch (err) {
      console.error(err);
    }
  }
}