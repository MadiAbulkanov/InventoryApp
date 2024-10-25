import { CategoryDto } from '@/dto/category.dto';
import { formatErrors } from '@/helpers/formatErrors';
import { ICategory } from '@/interfaces/Category.interface';
import { CategoryRepository } from '@/repositories/category.repository';
import { validate } from 'class-validator';

export class CategoryService {
  private repository: CategoryRepository;

  constructor() {
    this.repository = new CategoryRepository();
  }

  getCategories = async (): Promise<ICategory[]> => {
    return await this.repository.getCategories();
  };

  getCategory = async (paramsId: string): Promise<ICategory> => {
    const id = Number(paramsId);
    if (isNaN(id)) {
      throw Error('invalid id');
    }
    const category = await this.repository.getCategory(id);
    if (category) return category;
    else throw new Error('invalid id');
  };

  createCategory = async (categoryDto: CategoryDto): Promise<ICategory> => {
    const errors = await validate(categoryDto, { whitelist: true, validationError: { target: false, value: false } });
    if (errors.length) throw formatErrors(errors);
    return await this.repository.createCategory(categoryDto);
  };

  updateCategory = async (paramsId: string, categoryDto: CategoryDto): Promise<ICategory | null> => {
    const id = Number(paramsId);
    if (isNaN(id)) {
      throw Error('Invalid ID');
    }
    const errors = await validate(categoryDto, { whitelist: true, validationError: { target: false, value: false } });
    if (errors.length) throw formatErrors(errors);
    return await this.repository.updateCategory(id, categoryDto);
  };

  deleteCategory = async (paramsId: string): Promise<void> => {
    const id = Number(paramsId);
    if (isNaN(id)) {
      throw Error('Invalid ID');
    }
    await this.repository.deleteCategory(id);
  };
};