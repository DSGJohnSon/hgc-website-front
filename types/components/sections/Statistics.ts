//SECTION STATISTICS

export interface StatisticsData {
  stats: Array<{
    value: number;
    plus: boolean;
    label: string;
    sublabel?: string;
  }>;
}

export interface StatisticsProps {
  data: StatisticsData;
}
