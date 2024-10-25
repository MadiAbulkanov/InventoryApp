import { ItemDto } from '@/dto/item.dto';
import { formatErrors } from '@/helpers/formatErrors';
import { IItem } from '@/interfaces/Item.interface';
import { ItemRepository } from '@/repositories/item.repository';
import { validate } from 'class-validator';

export class ItemService {
  private repository: ItemRepository;

  constructor() {
    this.repository = new ItemRepository();
  }

  getItems = async (): Promise<IItem[]> => {
    return await this.repository.getItems();
  };

  getItem = async (paramsId: string): Promise<IItem> => {
    const id = Number(paramsId);
    if (isNaN(id)) {
      throw Error('invalid id');
    }
    const item = await this.repository.getItem(id);
    if (item) return item;
    else throw new Error('invalid id');
  };

  createItem = async (itemDto: ItemDto): Promise<IItem> => {
    const errors = await validate(itemDto, { whitelist: true, validationError: { target: false, value: false } });
    if (errors.length) throw formatErrors(errors);
    return await this.repository.createItem(itemDto);
  };

  updateItem = async (paramsId: string, itemDto: ItemDto): Promise<IItem | null> => {
    const id = Number(paramsId);
    if (isNaN(id)) {
      throw Error('Invalid ID');
    }
    const errors = await validate(itemDto, { whitelist: true, validationError: { target: false, value: false } });
    if (errors.length) throw formatErrors(errors);
    return await this.repository.updateItem(id, itemDto);
  };

  deleteItem = async (paramsId: string): Promise<void> => {
    const id = Number(paramsId);
    if (isNaN(id)) {
      throw Error('Invalid ID');
    }
    await this.repository.deleteItem(id);
  };
};