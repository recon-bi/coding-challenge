import bookingsModel from '/api/bookings/bookings.model';
import errorHandler from '/errorHandler';

export async function excludeFromSearch(req) {
  try {
    const { startDate, endDate } = req.query;

    const filters: any = [];

    if (startDate && endDate) {
      const timeSearch = {
        $or: [
          { $and: [{ checkIn: { $lt: new Date(startDate) } }, { checkIn: { $lt: new Date(endDate) } }] },
          { $and: [{ checkOut: { $gt: new Date(startDate) } }, { checkOut: { $gt: new Date(endDate) } }] },
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
