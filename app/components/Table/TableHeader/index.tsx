import React, { ReactNode } from 'react';

import {
  ASCENDING_ORDER_DIRECTION,
  ASCENDING_ORDER_DIRECTION_LABEL,
  ColumnDefinition,
  DESCENDING_ORDER_DIRECTION,
  DESCENDING_ORDER_DIRECTION_LABEL,
  NO_ORDER_DIRECTION_LABEL,
  TableHeaderSortingDirection,
  OrderDirection,
} from '../Table.constants';
import SortButton from './components/SortButton';
import THeadContent from './components/THeadContent';
import Th from './components/THeadCell';
import Thead from './components/THead';

export type TableHeaderProps = {
  columns: ColumnDefinition[];
  onColumnSort?: (columnId: string) => void;
  orderBy?: string;
  orderDirection?: OrderDirection;
};

function TableHeader(props: TableHeaderProps) {
  const { columns, onColumnSort, orderBy, orderDirection } = props;

  const renderHeader = (): ReactNode =>
    columns
      .filter((columnDef: ColumnDefinition) => !columnDef.hidden)
      .map((columnDef: ColumnDefinition) => {
        let content: ReactNode = <THeadContent>{columnDef.title}</THeadContent>;

        let sortOrder: TableHeaderSortingDirection = NO_ORDER_DIRECTION_LABEL;
        let sortLabel: TableHeaderSortingDirection = DESCENDING_ORDER_DIRECTION_LABEL;

        if (onColumnSort && columnDef.sorting) {
          const sortColumn = (): void => {
            onColumnSort(columnDef.id);
          };

          if (columnDef.id === orderBy) {
            if (orderDirection === ASCENDING_ORDER_DIRECTION) {
              sortOrder = DESCENDING_ORDER_DIRECTION_LABEL;
              sortLabel = DESCENDING_ORDER_DIRECTION_LABEL;
            } else if (orderDirection === DESCENDING_ORDER_DIRECTION) {
              sortOrder = ASCENDING_ORDER_DIRECTION_LABEL;
              sortLabel = ASCENDING_ORDER_DIRECTION_LABEL;
            }
          }

          content = (
            <SortButton
              orderDirection={columnDef.id === orderBy ? orderDirection : undefined}
              label={columnDef.title || ''}
              title={`Sort table by "${columnDef.title}" ${sortLabel}`}
              align={columnDef.align}
              onClick={sortColumn}
            />
          );
        }

        return (
          <Th
            key={columnDef.id}
            scope="col"
            role="columnheader"
            aria-sort={sortOrder}
            style={{ width: columnDef.width }}
            title={columnDef.tooltip}
            align={columnDef.align}
          >
            {content}
          </Th>
        );
      });

  return (
    <Thead>
      <tr>{renderHeader()}</tr>
    </Thead>
  );
}

export default TableHeader;
