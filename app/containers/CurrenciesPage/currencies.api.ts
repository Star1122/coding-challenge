import { get } from '../../utils/api';
import { CurrencyDto } from './currencies.dto';

export const getCurrenciesRequest = (): Promise<CurrencyDto> =>
  get<CurrencyDto>('https://api.coindesk.com/v1/bpi/currentprice.json');
