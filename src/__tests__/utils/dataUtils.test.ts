import { describe, it, expect } from 'vitest';
import { aggregateVisitorsByDate, aggregateVisitorsByCountry, calculateVisitorTotals } from '../../utils/dataUtils';
import { Booking } from '../../data/bookings';

const mockBookings: Booking[] = [
  {
    hotel: "Resort Hotel",
    arrival_date_year: 2015,
    arrival_date_month: "July",
    arrival_date_day_of_month: 1,
    adults: 2,
    children: 1,
    babies: 0,
    country: "PRT"
  },
  {
    hotel: "Resort Hotel",
    arrival_date_year: 2015,
    arrival_date_month: "July",
    arrival_date_day_of_month: 1,
    adults: 1,
    children: 0,
    babies: 1,
    country: "ESP"
  }
];

describe('Data Utils', () => {
  it('correctly calculates visitor totals', () => {
    const totals = calculateVisitorTotals(mockBookings);
    expect(totals).toEqual({
      adults: 3,
      children: 1,
      babies: 1
    });
  });

  it('correctly aggregates visitors by country', () => {
    const countryData = aggregateVisitorsByCountry(mockBookings);
    expect(countryData).toEqual([
      ['PRT', 1],
      ['ESP', 1]
    ]);
  });

 
});