import { CategoryController } from '@/controllers/category.controller';
import { Route } from '@/interfaces/Route.interface';
import { upload } from '@/middlewares/uploads';
import { Router } from 'express';

export class CategoryRoute implements Route {
  public path = '/categories';
  public router = Router();

  private controller: CategoryController;

  constructor() {
    this.controller = new CategoryController();
    this.init();
  }

  private init() {
    this.router.get('/', this.controller.getCategories);
    this.router.get('/:id', this.controller.getCategory);
    this.router.delete('/:id', this.controller.deleteCategory);
    this.router.put('/:id', upload.none(), this.controller.updateCategory);
    this.router.post('/', upload.none(), this.controller.createCategory);
  }
};