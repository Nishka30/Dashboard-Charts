import React, { useState, useMemo } from 'react';
import Chart from 'react-apexcharts';
import { format, parse, isWithinInterval } from 'date-fns';
import { DateRangePicker } from './components/DateRangePicker';
import { SparklineCard } from './components/SparklineCard';
import { bookings } from './data/bookings';
import { BarChart3, LineChart, Users } from 'lucide-react';
import { aggregateVisitorsByDate, aggregateVisitorsByCountry, calculateVisitorTotals } from './utils/dataUtils';

function App() {
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    parse('2015-07-01', 'yyyy-MM-dd', new Date()),
    parse('2015-08-31', 'yyyy-MM-dd', new Date()),
  ]);

  const filteredData = useMemo(() => {
    return bookings.filter(booking => {
      const bookingDate = parse(
        `${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`,
        'yyyy-MMMM-d',
        new Date()
      );
      return isWithinInterval(bookingDate, { start: dateRange[0], end: dateRange[1] });
    });
  }, [dateRange]);

  const timeSeriesData = useMemo(() => aggregateVisitorsByDate(filteredData), [filteredData]);
  const countryData = useMemo(() => aggregateVisitorsByCountry(filteredData), [filteredData]);
  const visitorTotals = useMemo(() => calculateVisitorTotals(filteredData), [filteredData]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hotel Bookings Dashboard</h1>
            <p className="text-gray-500">Monitor booking trends and visitor statistics</p>
          </div>
          <DateRangePicker
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            onChange={(dates) => setDateRange(dates as [Date, Date])}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <SparklineCard
            title="Adult Visitors"
            total={visitorTotals.adults}
            data={timeSeriesData.map(d => d.y)}
            color="blue"
          />
          <SparklineCard
            title="Children Visitors"
            total={visitorTotals.children}
            data={timeSeriesData.map(d => d.y)}
            color="green"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-lg bg-purple-100">
                <LineChart className="text-purple-600" size={24} />
              </div>
              <h2 className="text-lg font-semibold">Daily Visitors</h2>
            </div>
            <Chart
              options={{
                chart: {
                  type: 'line',
                  zoom: { enabled: true },
                },
                xaxis: {
                  type: 'datetime',
                },
                stroke: {
                  curve: 'smooth',
                  width: 3,
                },
                colors: ['#6366f1'],
              }}
              series={[{ name: 'Visitors', data: timeSeriesData }]}
              type="line"
              height={350}
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-lg bg-orange-100">
                <BarChart3 className="text-orange-600" size={24} />
              </div>
              <h2 className="text-lg font-semibold">Visitors by Country</h2>
            </div>
            <Chart
              options={{
                chart: {
                  type: 'bar',
                },
                plotOptions: {
                  bar: {
                    borderRadius: 4,
                    horizontal: true,
                  },
                },
                colors: ['#f97316'],
                xaxis: {
                  categories: countryData.map(([country]) => country),
                },
                dataLabels: {
                  enabled: true,
                },
              }}
              series={[
                {
                  name: 'Bookings',
                  data: countryData.map(([, count]) => count),
                },
              ]}
              type="bar"
              height={350}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;