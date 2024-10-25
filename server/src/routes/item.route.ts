import { ItemController } from "@/controllers/item.controller";
import { Route } from "@/interfaces/Route.interface";
import { upload } from "@/middlewares/uploads";
import { Router } from "express";

export class ItemRoute implements Route {
  public path = '/items';
  public router = Router();

  private controller: ItemController;

  constructor() {
    this.controller = new ItemController();
    this.init();
  }

  private init() {
    this.router.get('/', this.controller.getItems);
    this.router.get('/:id', this.controller.getItem);
    this.router.delete('/:id', this.controller.deleteItem);
    this.router.put('/:id', upload.single('image'), this.controller.updateItem);
    this.router.post('/', upload.single('image'), this.controller.createItem);
  }
};