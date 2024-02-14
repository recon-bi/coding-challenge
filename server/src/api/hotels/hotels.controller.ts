import { Request, Response } from 'express';
import AbstractController from '../../classes/AbstractController';
import model from './hotels.model';
import errorHandler from '/errorHandler';
import { excludeFromSearch } from "../../lib/hotelsBookings"

type SearchRequestType = {
  startDate: string;
  endDate: string;
  city: string;
  country: string;
  priceMin: string;
  priceMax: string;
}

class HotelController extends AbstractController {
  constructor() {
    super(model);
  }

  public getSearchOptions = async (req: Request, res: Response) => {
    try {
      const cities = await this.model.distinct("city")
      const countries = await this.model.distinct("country")
      return res.status(200).json({cities, countries})
    } catch (error) {
      errorHandler(error, res)
    }
  }

  public getSearchResults = async (req: Request<object, object, object, SearchRequestType>, res: Response) => {
    try {
      const excludeIds = await excludeFromSearch(req);
      const { city, country, priceMin, priceMax } = req.query;

      const filters: any = []
      if (excludeIds.length > 0) {
        
        const ids = excludeIds.map((x: any) => (x.hotel._id))
        filters.push({ _id:{ $nin:ids} })
      }
      if (city) filters.push({city})
      if (country) filters.push({country})
      if (priceMin) filters.push({ price: { $gte: Number(priceMin) } })
      if (priceMax) filters.push({ price: { $lte: Number(priceMax) } })

      const query = filters.length > 0 ? { $and: filters } : {}

      const results = await this.model.find(query)
      return res.status(200).json(results)

    } catch (error) {
      errorHandler(error, res)
    }
  }
}

export default HotelController;
