import { ItemDto } from '@/dto/item.dto';
import { ItemService } from '@/services/item.service';
import { plainToInstance } from 'class-transformer';
import { RequestHandler } from 'express';

export class ItemController {
  private service: ItemService;

  constructor() {
    this.service = new ItemService();
  }

  getItems: RequestHandler = async (req, res): Promise<void> => {
    const items = await this.service.getItems();
    const response = items.map((item) => ({
      id: item.id,
      title: item.title,
      image: item.image,
    }));
    res.send(response);
  };

  getItem: RequestHandler = async (req, res): Promise<void> => {
    try {
      const item = await this.service.getItem(req.params.id);
      res.send(item);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: `${error}` });
      }
    }
  };

  createItem: RequestHandler = async (req, res): Promise<void> => {
    try {
      const itemDto = plainToInstance(ItemDto, req.body);
      if (req.file) itemDto.image = req.file?.filename;
      const product = await this.service.createItem(itemDto);
      res.send(product);
    } catch (e) {
      if (Array.isArray(e)) {
        console.log(e);
        res.status(400).send({ errors: e });
      } else {
        res.status(500).send(e);
      }
    }
  };

  updateItem: RequestHandler = async (req, res): Promise<void> => {
    try {
      const itemDto = plainToInstance(ItemDto, req.body);
      if (req.file) itemDto.image = req.file.filename;
      const item = await this.service.updateItem(req.params.id, itemDto);
      res.send(item);
    } catch (e) {
      if (Array.isArray(e)) {
        res.status(400).send({ errors: e });
      } else {
        res.status(500).send(e);
      }
    }
  };

  deleteItem: RequestHandler = async (req, res): Promise<void> => {
    try {
      await this.service.deleteItem(req.params.id);
      res.send({ message: 'Item deleted successfully' });
    } catch (e) {
      if (e instanceof Error) {
        res.status(400).send({ message: `${e}` });
      } else {
        res.status(500).send(e);
      }
    }
  };
};