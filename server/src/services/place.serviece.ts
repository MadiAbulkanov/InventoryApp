import { PlaceDto } from '@/dto/place.dto';
import { formatErrors } from '@/helpers/formatErrors';
import { IPlace } from '@/interfaces/Place.interface';
import { PlaceRepository } from '@/repositories/place.repository';
import { validate } from 'class-validator';

export class PlaceService {
  private repository: PlaceRepository;

  constructor() {
    this.repository = new PlaceRepository();
  }

  getPlaces = async (): Promise<IPlace[]> => {
    return await this.repository.getPlaces();
  };

  getPlace = async (paramsId: string): Promise<IPlace> => {
    const id = Number(paramsId);
    if (isNaN(id)) {
      throw Error('invalid id');
    }
    const place = await this.repository.getPlace(id);
    if (place) return place;
    else throw new Error('invalid id');
  };

  createPlace = async (placeDto: PlaceDto): Promise<IPlace> => {
    const errors = await validate(placeDto, { whitelist: true, validationError: { target: false, value: false } });
    if (errors.length) throw formatErrors(errors);
    return await this.repository.createPlace(placeDto);
  };

  updatePlace = async (paramsId: string, placeDto: PlaceDto): Promise<IPlace | null> => {
    const id = Number(paramsId);
    if (isNaN(id)) {
      throw Error('Invalid ID');
    }
    const errors = await validate(placeDto, { whitelist: true, validationError: { target: false, value: false } });
    if (errors.length) throw formatErrors(errors);
    return await this.repository.updatePlace(id, placeDto);
  };

  deletePlace = async (paramsId: string): Promise<void> => {
    const id = Number(paramsId);
    if (isNaN(id)) {
      throw Error('Invalid ID');
    }
    await this.repository.deletePlace(id);
  };
};