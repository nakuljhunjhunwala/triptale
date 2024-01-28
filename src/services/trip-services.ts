import { ITrip, TripModal } from "../models/trip-model";

export class TripServices {
  async createTrip(trip: ITrip): Promise<ITrip> {
    try {
      const tripData = new TripModal();
      if (trip.title) tripData.title = trip.title;
      if (trip.description) tripData.description = trip.description;
      if (trip.isPrivate) tripData.isPrivate = trip.isPrivate;
      if (trip.createdBy) tripData.createdBy = trip.createdBy;
      const newTrip = await tripData.save();
      return newTrip;
    } catch (error) {
      throw {
        status: error.status || 500,
        message: error.message || "Error Ocurred while creating trip"
      };
    }
  }

  async getAllTripById(id: string): Promise<ITrip[]> {
    try {
      const trips = await TripModal.find({ createdBy: id });
      return trips;
    } catch (error) {
      throw {
        status: error.status || 500,
        message: error.message || "Error Ocurred while fetching trips"
      };
    }
  }
}
