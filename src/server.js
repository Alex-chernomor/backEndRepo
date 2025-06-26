import 'dotenv/config';

import app from './app.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { getEnvVar } from './utils/getEnvVar.js';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';

async function bootstrap() {
  try {
    app.use(cors());
    const PORT = getEnvVar('PORT');

    await initMongoConnection();

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
