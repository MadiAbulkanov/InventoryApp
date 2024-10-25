import { PlaceController } from "@/controllers/place.controller";
import { Route } from "@/interfaces/Route.interface";
import { upload } from "@/middlewares/uploads";
import { Router } from "express";

export class PlaceRoute implements Route {
  public path = '/places';
  public router = Router();

  private controller: PlaceController;

  constructor() {
    this.controller = new PlaceController();
    this.init();
  }

  private init() {
    this.router.get('/', this.controller.getPlaces);
    this.router.get('/:id', this.controller.getPlace);
    this.router.delete('/:id', this.controller.deletePlace);
    this.router.put('/:id', upload.none(), this.controller.updatePlace);
    this.router.post('/', upload.none(), this.controller.createPlace);
  }
};