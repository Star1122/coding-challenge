import React, { useEffect, useState } from 'react';

import { OriginObject } from '../../types';
import {
  ASCENDING_ORDER_DIRECTION,
  ColumnDefinition,
  DESCENDING_ORDER_DIRECTION,
  OrderDirection, SortOrder,
} from './Table.constants';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import StyledTable from './Table.style';

interface TableProps {
  data: OriginObject[];
  columns: ColumnDefinition[];
  sortingOptions?: SortOrder;
  onSortByColumn?: (fieldId: string) => void;
}

function Table(props: TableProps) {
  const { data, columns, sortingOptions, onSortByColumn } = props;
  const [fieldToSortBy, setFieldToSortBy] = useState('');
  const [order, setOrder] = useState(
    ASCENDING_ORDER_DIRECTION as OrderDirection,
  );

  useEffect(() => {
    if (sortingOptions) {
      const { order: newOrder, sortBy } = sortingOptions;
      if (order !== newOrder) {
        setOrder(order);
      }

      if (fieldToSortBy !== sortBy) {
        setFieldToSortBy(sortBy);
      }
    }
  }, [sortingOptions]);

  const sortColumnByField = (fieldId: string): void => {
    if (onSortByColumn) {
      const newOrder =
        fieldId === fieldToSortBy && order === DESCENDING_ORDER_DIRECTION
          ? ASCENDING_ORDER_DIRECTION
          : DESCENDING_ORDER_DIRECTION;
      setFieldToSortBy(fieldId);
      setOrder(newOrder);
      onSortByColumn(fieldId);
    }
  };

  return (
    <StyledTable>
      <TableHeader columns={columns} onColumnSort={sortColumnByField} orderDirection={order} orderBy={fieldToSortBy} />
      <TableBody columns={columns} data={data} />
    </StyledTable>
  );
}

export default Table;
