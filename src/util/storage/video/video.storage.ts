import multer from "multer";

// 🎯 Lista de MIME types de vídeo permitidos
const allowedMimeTypes = [
  "video/mp4",
  "video/mpeg",
  "video/quicktime",
  "video/x-msvideo",
  "video/x-ms-wmv",
  "video/webm",
  "video/3gpp",
  "video/ogg",
];

// 🎯 Tamanho total permitido: 50 MB
const totalSizeLimit = 50 * 1024 * 1024; // ⛔ 50 MB por vídeo

// 📦 Armazena os vídeos em memória (para depois enviar ao Supabase)
const storage = multer.memoryStorage();

// ✅ Filtro de tipo de arquivo
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Apenas vídeos são permitidos!"));
  }
};

// 📥 Middleware do Multer configurado
export const uploadVideo = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // ⛔ 50 MB por vídeo
  },
}).array("videos", 3); // até 3 vídeos por requisição

// ✅ Middleware adicional: validação de tamanho total
export const checkTotalVideoSize = (req: any, res: any, next: any) => {
  const files = req.files as Express.Multer.File[];
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);

  if (totalSize > totalSizeLimit) {
    return res.status(400).json({ error: "Limite total de 20 GB excedido." });
  }

  next();
};
