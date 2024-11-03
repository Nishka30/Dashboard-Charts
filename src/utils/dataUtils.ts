import { Booking } from '../data/bookings';

export const aggregateVisitorsByDate = (bookings: Booking[]) => {
  const aggregated: { [key: string]: number } = {};
  
  bookings.forEach(booking => {
    const date = `${booking.arrival_date_year}-${String(booking.arrival_date_month).padStart(2, '0')}-${String(booking.arrival_date_day_of_month).padStart(2, '0')}`;
    const totalVisitors = booking.adults + booking.children + booking.babies;
    aggregated[date] = (aggregated[date] || 0) + totalVisitors;
  });
  
  return Object.entries(aggregated)
    .map(([date, count]) => ({
      x: date,
      y: count
    }))
    .sort((a, b) => a.x.localeCompare(b.x));
};

export const aggregateVisitorsByCountry = (bookings: Booking[]) => {
  const aggregated: { [key: string]: number } = {};
  
  bookings.forEach(booking => {
    aggregated[booking.country] = (aggregated[booking.country] || 0) + 1;
  });
  
  return Object.entries(aggregated)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
};

export const calculateVisitorTotals = (bookings: Booking[]) => {
  return bookings.reduce(
    (acc, booking) => ({
      adults: acc.adults + booking.adults,
      children: acc.children + booking.children,
      babies: acc.babies + booking.babies
    }),
    { adults: 0, children: 0, babies: 0 }
  );
};