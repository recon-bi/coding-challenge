import bookingsModel from "/api/bookings/bookings.model";
import errorHandler from "/errorHandler";

export async function excludeFromSearch(req) {
  try {
    const { startDate, endDate } = req.query;

    const filters: any = []

    if (startDate && endDate) {
      const timeSearch = {
        $or: [
          {$and: [{ checkIn: { $lte: new Date(startDate) } }]},
          {$and: [{ checkOut: { $gte: new Date(endDate) } }]},
        ],
      }
      filters.push(timeSearch)
    }

    console.log(JSON.stringify(filters))

    if (filters.length > 0) return await bookingsModel.aggregate([
      { $match: { $and: filters } }
    ])
    else return []
  } catch (error) {
    errorHandler(error)
  }
}