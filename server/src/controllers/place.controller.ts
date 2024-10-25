import { PlaceDto } from '@/dto/place.dto';
import { PlaceService } from '@/services/place.serviece';
import { plainToInstance } from 'class-transformer';
import { RequestHandler } from 'express';

export class PlaceController {
  private service: PlaceService;

  constructor() {
    this.service = new PlaceService();
  }

  getPlaces: RequestHandler = async (req, res): Promise<void> => {
    const places = await this.service.getPlaces();
    const response = places.map((place) => ({
      id: place.id,
      title: place.title,
    }));
    res.send(response);
  };

  getPlace: RequestHandler = async (req, res): Promise<void> => {
    try {
      const place = await this.service.getPlace(req.params.id);
      res.send(place);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: `${error}` });
      }
    }
  };

  createPlace: RequestHandler = async (req, res): Promise<void> => {
    try {
      const placeDto = plainToInstance(PlaceDto, req.body);
      const place = await this.service.createPlace(placeDto);
      res.send(place);
    } catch (e) {
      if (Array.isArray(e)) {
        console.log(e);
        res.status(400).send({ errors: e });
      } else {
        res.status(500).send(e);
      }
    }
  };

  updatePlace: RequestHandler = async (req, res): Promise<void> => {
    try {
      const placeDto = plainToInstance(PlaceDto, req.body);
      const place = await this.service.updatePlace(req.params.id, placeDto);
      res.send(place);
    } catch (e) {
      if (Array.isArray(e)) {
        res.status(400).send({ errors: e });
      } else {
        res.status(500).send(e);
      }
    }
  };

  deletePlace: RequestHandler = async (req, res): Promise<void> => {
    try {
      await this.service.deletePlace(req.params.id);
      res.send({ message: 'Place deleted successfully' });
    } catch (e) {
      if (e instanceof Error) {
        res.status(400).send({ message: `${e}` });
      } else {
        res.status(500).send(e);
      }
    }
  };
};