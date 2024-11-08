import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar } from 'lucide-react';

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onChange: (dates: [Date | null, Date | null]) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onChange,
}) => {
  const initialStartDate = new Date(2015, 6, 1); // Set to a specific year (e.g., January 1, 2023)
  const initialEndDate = new Date(2015, 8, 31); // Set to a specific year (e.g., December 31, 2023)

  // State to track the current selected date range
  const [currentStartDate, setCurrentStartDate] = useState<Date>(startDate || initialStartDate);
  const [currentEndDate, setCurrentEndDate] = useState<Date>(endDate || initialEndDate);

  // Helper function to set date ranges (Last 7, 30, or 60 Days)
  const handleDateRange = (days: number) => {
    const end = new Date(2015, 7, 1);
    const start = new Date(2015, 8, 31);
    start.setDate(end.getDate() - days);
    setCurrentStartDate(start);
    setCurrentEndDate(end);
    onChange([start, end]);
  };

  // Reset function to set the dates back to initialStartDate and initialEndDate
  const handleReset = () => {
    setCurrentStartDate(initialStartDate);
    setCurrentEndDate(initialEndDate);
    onChange([initialStartDate, initialEndDate]);
  };


  return (
    <div className="relative space-y-4">
      {/* Date Range Picker */}
      <div className="relative">
        <DatePicker
          selectsRange={true}
          startDate={currentStartDate}
          endDate={currentEndDate}
          onChange={(dates: [Date, Date]) => {
            setCurrentStartDate(dates[0]);
            setCurrentEndDate(dates[1]);
            onChange(dates);
          }}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          dateFormat="MMMM d, yyyy"
        />
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => handleDateRange(7)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Last 7 Days
        </button>
        <button
          onClick={() => handleDateRange(30)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Last 30 Days
        </button>
        <button
          onClick={() => handleDateRange(60)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Last 60 Days
        </button>
      </div>

      {/* Reset Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Reset Date Range
        </button>
      </div>
    </div>
  );
};