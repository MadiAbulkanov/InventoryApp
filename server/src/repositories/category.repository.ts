import { appDataSource } from '@/config/dataSource';
import { CategoryDto } from '@/dto/category.dto';
import { Category } from '@/entities/category.entity';
import { Item } from '@/entities/item.entity';
import { ICategory } from '@/interfaces/Category.interface';
import { Repository } from 'typeorm';

export class CategoryRepository extends Repository<Category> {
  constructor() {
    super(Category, appDataSource.createEntityManager());
  }

  async getCategories(): Promise<ICategory[]> {
    return await this.find();
  }

  async getCategory(id: number): Promise<ICategory | null> {
    const category = await this.findOne({
      where: { id },
    });
    if (!category) {
      throw new Error('Category with such ID does not exists');
    }
    return category;
  }

  async createCategory(categoryDto: CategoryDto): Promise<ICategory> {
    const category = await this.save(categoryDto);
    return category;
  }

  async updateCategory(id: number, categoryDto: CategoryDto): Promise<ICategory | null> {
    await this.update(id, categoryDto);
    return await this.getCategory(id);
  }

  async deleteCategory(id: number): Promise<void> {
    const itemsCount = await this.manager.count(Item, { where: { categoryId: id } });
    if (itemsCount > 0) {
      throw new Error('Category cannot be deleted as it has related items');
    }

    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new Error('Category with such ID does not exist');
    }
  }
};