import multer from "multer";
import path from "path";

// Armazena os arquivos na memória como Buffer
const storage = multer.memoryStorage();

const fileFilter = function (req: any, file: any, cb: any) {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Apenas imagens são permitidas!"), false);
  }
};

// Define o middleware de upload
export const uploadImage = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // até 10 MB por imagem
}).array("image", 60); // até 60 imagens por requisição
