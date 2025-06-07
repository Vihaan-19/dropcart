import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
// Load environment variables
// dotenv.config();
dotenv.config({ path: __dirname + '/../.env' });
const app = express();
app.use(express.json());

console.log('JWT_SECRET:', process.env.JWT_SECRET);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'auth-service' });
});

app.use('/api', router);

const PORT = process.env.PORT || 4000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Auth service listening on port ${PORT}`);
  });
}

export default app; 