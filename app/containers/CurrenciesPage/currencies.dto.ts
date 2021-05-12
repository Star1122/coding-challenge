export interface CurrencyDto {
  time: {
    updated: string;
    updatedISO: string;
    updateduk: string;
  };
  disclaimer: string;
  chartName: 'Bitcoin';
  bpi: {
    [key: string]: Bpi;
  };
}

export interface Bpi {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}
