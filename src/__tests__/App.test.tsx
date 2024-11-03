import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from '../App';

// Mock the ApexCharts component since it's not compatible with jsdom
vi.mock('react-apexcharts', () => ({
  default: () => <div data-testid="mock-chart">Chart</div>,
}));

describe('Hotel Dashboard', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('renders the dashboard title', () => {
    expect(screen.getByText('Hotel Bookings Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Monitor booking trends and visitor statistics')).toBeInTheDocument();
  });

  it('displays visitor cards with correct titles', () => {
    expect(screen.getByText('Adult Visitors')).toBeInTheDocument();
    expect(screen.getByText('Children Visitors')).toBeInTheDocument();
  });

  it('renders all chart sections', () => {
    expect(screen.getByText('Daily Visitors')).toBeInTheDocument();
    expect(screen.getByText('Visitors by Country')).toBeInTheDocument();
    expect(screen.getAllByTestId('mock-chart')).toHaveLength(4); // 2 sparklines + 2 main charts
  });
});