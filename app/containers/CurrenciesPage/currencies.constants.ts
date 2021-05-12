import {
  ColumnDefinition,
  TableHeaderColumnAlignment,
} from '../../components/Table/Table.constants';

enum ActionTypes {
  REQUEST_STARTED = 'REQUEST_STARTED',
  REQUEST_SUCCEEDED = 'REQUEST_SUCCEEDED',
  REQUEST_FAILED = 'REQUEST_FAILED',
  CLEAR_REQUEST_FAILED = 'CLEAR_REQUEST_FAILED',
  LOAD_CURRENCIES = 'LOAD_CURRENCIES',
  SET_CURRENCIES = 'SET_CURRENCIES',
}

export const CurrencyTableColumns: ColumnDefinition[] = [
  {
    id: 'code',
    sorting: true,
    title: 'Currency Name',
    align: TableHeaderColumnAlignment.left,
  },
  {
    id: 'rate',
    sorting: true,
    title: 'Rate',
    align: TableHeaderColumnAlignment.right,
  },
  {
    id: 'symbol',
    title: 'Symbol',
    align: TableHeaderColumnAlignment.right,
  },
  {
    id: 'description',
    title: 'Description',
    align: TableHeaderColumnAlignment.right,
  },
  {
    id: 'rate_float',
    title: 'Rate Float',
    align: TableHeaderColumnAlignment.right,
  },
];

export default ActionTypes;
