export const NO_ORDER_DIRECTION_LABEL = 'none';

export const ASCENDING_ORDER_DIRECTION_LABEL = 'ascending';

export const DESCENDING_ORDER_DIRECTION_LABEL = 'descending';

export type OrderDirection = 'ASC' | 'DESC';

export interface SortOrder {
  order: OrderDirection;
  sortBy: string;
}

export const ASCENDING_ORDER_DIRECTION = 'ASC';

export const DESCENDING_ORDER_DIRECTION = 'DESC';

export const OTHER_ORDER_DIRECTION_LABEL = 'other';

export type TableHeaderSortingDirection =
  | 'none'
  | 'ascending'
  | 'descending'
  | 'other';

export enum TableHeaderColumnAlignment {
  left = 'left',
  center = 'center',
  right = 'right',
}

export interface TableAction {
  disableIfDefault?: boolean;
  disableIfEmpty?: boolean;
  label: string;
  handleOnClick: (entityId: number) => void;
  dependentActions?: {
    property: string;
    action: { [val: string]: TableAction };
  };
}

export interface ColumnDefinition {
  id: string;
  actions?: TableAction[];
  align?: TableHeaderColumnAlignment;
  hidden?: boolean;
  path?: string;
  sorting?: boolean;
  title?: string;
  tooltip?: string;
  width?: number | string;
}
