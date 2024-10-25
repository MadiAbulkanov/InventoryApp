import { appDataSource } from '@/config/dataSource';
import { PlaceDto } from '@/dto/place.dto';
import { Item } from '@/entities/item.entity';
import { Place } from '@/entities/place.entity';
import { IPlace } from '@/interfaces/Place.interface';
import { Repository } from 'typeorm';

export class PlaceRepository extends Repository<Place> {
  constructor() {
    super(Place, appDataSource.createEntityManager());
  }

  async getPlaces(): Promise<IPlace[]> {
    return await this.find();
  }

  async getPlace(id: number): Promise<IPlace | null> {
    const place = await this.findOne({
      where: { id },
    });
    if (!place) {
      throw new Error('Place with such ID does not exists');
    }
    return place;
  }

  async createPlace(placeDto: PlaceDto): Promise<IPlace> {
    const place = await this.save(placeDto);
    return place;
  }

  async updatePlace(id: number, placeDto: PlaceDto): Promise<IPlace | null> {
    await this.update(id, placeDto);
    return await this.getPlace(id);
  }

  async deletePlace(id: number): Promise<void> {
    const itemsCount = await this.manager.count(Item, { where: { placeId: id } });
    if (itemsCount > 0) {
      throw new Error('Place cannot be deleted as it has related items');
    }

    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new Error('Place with such ID does not exist');
    }
  }
};