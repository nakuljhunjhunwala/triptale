import { Request, Response } from "express";

import { TripServices } from "../services/trip-services";

const tripServices = new TripServices();

export class ProductController {
  async create(req: Request, res: Response): Promise<void> {
    const body = req.body;
    try {
      const data = Object.assign({}, body);
      data["createdBy"] = req.userId;
      let newTrip = await tripServices.createTrip(data);
      res.status(global.httpStatus.OK).json(newTrip);
    } catch (err) {
      res.status(err.status || global.httpStatus.BAD_REQUEST).json({
        message: err.message || "Error While creating trip",
      });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const id = req.userId;
      const trips = await tripServices.getAllTripById(id);
      
      res.status(global.httpStatus.OK).json(trips);
    } catch (err) {
      res.status(err.status || global.httpStatus.BAD_REQUEST).json({
        message: err.message || "Error While fetching trips",
      });
    }
  }

}
