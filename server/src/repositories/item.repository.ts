import { appDataSource } from '@/config/dataSource';
import { ItemDto } from '@/dto/item.dto';
import { Item } from '@/entities/item.entity';
import { IItem } from '@/interfaces/Item.interface';
import { Repository } from 'typeorm';

export class ItemRepository extends Repository<Item> {
  constructor() {
    super(Item, appDataSource.createEntityManager());
  }

  async getItems(): Promise<IItem[]> {
    return await this.find({ relations: { category: true, place: true } });
  }

  async getItem(id: number): Promise<IItem | null> {
    const item = await this.findOne({
      where: { id },
      relations: { category: true, place: true },
    });
    if (!item) {
      throw new Error('Item with such ID does not exists');
    }
    return item;
  }

  async createItem(itemDto: ItemDto): Promise<IItem> {
    const item = await this.save(itemDto);
    return item;
  }

  async updateItem(id: number, itemDto: ItemDto): Promise<IItem | null> {
    await this.update(id, itemDto);
    return await this.getItem(id);
  }

  async deleteItem(id: number): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new Error('Item with such ID does not exist');
    }
  }
};