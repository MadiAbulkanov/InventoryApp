import cors from 'cors';
import App from './app';
import logger from '@/middlewares/logger';
import { CategoryRoute } from '@/routes/category.route';
import { PlaceRoute } from '@/routes/place.route';
import { ItemRoute } from '@/routes/item.route';

const app = new App({
  port: 8000,
  middlewares: [logger(), cors()],
  routes: [new CategoryRoute(), new PlaceRoute(), new ItemRoute()],
});

app.listen();
