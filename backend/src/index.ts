import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT ?? '3000';

app.listen(PORT, () => {
  console.log(`[VNR] Backend démarré sur http://localhost:${PORT}`);
  console.log(`[VNR] Environnement : ${process.env.NODE_ENV ?? 'development'}`);
});
