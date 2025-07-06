import 'dotenv/config';
import app from './app.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

async function bootstrap() {
  try {
    const PORT = getEnvVar('PORT') || 3000;

    await initMongoConnection();

    app.use('/api-docs', swaggerDocs());

    app.get('/', (req, res) => {
      res.json({ message: 'Welcome!' });
    });

    app.use(notFoundHandler);
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`🚀 Server started on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Server startup error:', error);
  }
}

bootstrap();
