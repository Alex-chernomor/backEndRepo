import 'dotenv/config';
import express from 'express';
import app from './app.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { getEnvVar } from './utils/getEnvVar.js';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import router from './router/index.js';

async function bootstrap() {
  try {
    app.use(cors());
    // може краще const PORT = parseInt(getEnvVar('PORT', '3000'));?
    const PORT = getEnvVar('PORT');

    await initMongoConnection();

    app.use(express.json());
    app.use(router);
    app.use(notFoundHandler);
    app.use(errorHandler);

    app.get('/', (req, res) => {
      res.json({
        message: 'Wellcome!',
      });
    });

    app.listen(PORT, (error) => {
      if (error) {
        throw error;
      }
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

bootstrap();
