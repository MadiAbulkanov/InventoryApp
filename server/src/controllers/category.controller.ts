import { CategoryDto } from '@/dto/category.dto';
import { CategoryService } from '@/services/category.service';
import { plainToInstance } from 'class-transformer';
import { RequestHandler } from 'express';

export class CategoryController {
  private service: CategoryService;

  constructor() {
    this.service = new CategoryService();
  }

  getCategories: RequestHandler = async (req, res): Promise<void> => {
    const categories = await this.service.getCategories();
    const response = categories.map((category) => ({
      id: category.id,
      title: category.title,
    }));
    res.send(response);
  };

  getCategory: RequestHandler = async (req, res): Promise<void> => {
    try {
      const category = await this.service.getCategory(req.params.id);
      res.send(category);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: `${error}` });
      }
    }
  };

  createCategory: RequestHandler = async (req, res): Promise<void> => {
    try {
      const categoryDto = plainToInstance(CategoryDto, req.body);
      const category = await this.service.createCategory(categoryDto);
      res.send(category);
    } catch (e) {
      if (Array.isArray(e)) {
        console.log(e);
        res.status(400).send({ errors: e });
      } else {
        res.status(500).send(e);
      }
    }
  };

  updateCategory: RequestHandler = async (req, res): Promise<void> => {
    try {
      const categoryDto = plainToInstance(CategoryDto, req.body);
      const category = await this.service.updateCategory(req.params.id, categoryDto);
      res.send(category);
    } catch (e) {
      if (Array.isArray(e)) {
        res.status(400).send({ errors: e });
      } else {
        res.status(500).send(e);
      }
    }
  };

  deleteCategory: RequestHandler = async (req, res): Promise<void> => {
    try {
      await this.service.deleteCategory(req.params.id);
      res.send({ message: 'Category deleted successfully' });
    } catch (e) {
      if (e instanceof Error) {
        res.status(400).send({ message: `${e}` });
      } else {
        res.status(500).send(e);
      }
    }
  };
};