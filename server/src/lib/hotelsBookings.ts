import bookingsModel from '/api/bookings/bookings.model';
import errorHandler from '/errorHandler';

export async function excludeFromSearch(req) {
  try {
    const { startDate, endDate } = req.query;

    const filters: any = [];

    if (startDate && endDate) {
      const timeSearch = {
        $or: [
          { $and: [{ checkIn: { $lte: new Date(startDate) } }, { checkOut: { $gte: new Date(endDate) } }] }, // start and end are between
          { $and: [{ checkIn: { $gte: new Date(startDate) } }, { checkOut: { $lte: new Date(endDate) } }] }, // start and end are around
          { $and: [{ checkOut: { $gte: new Date(startDate) } }, { checkOut: { $lte: new Date(endDate) } }] }, // checkOut is between req dates
          { $and: [{ checkIn: { $gte: new Date(startDate) } }, { checkIn: { $lte: new Date(endDate) } }] }, //  checkIn is between req dates
        ],
      };
      filters.push(timeSearch);
    }

    if (filters.length > 0) return await bookingsModel.aggregate([{ $match: { $and: filters } }]);
    else return [];
  } catch (error) {
    errorHandler(error);
  }
}
