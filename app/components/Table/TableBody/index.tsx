import React, { ReactNode } from 'react';

import { ColumnDefinition } from '../Table.constants';
import { OriginObject } from '../../../types';
import Td from './components/TDataCell';
import Tbody from './components/TBody';

type TableBody = {
  columns: ColumnDefinition[];
  data: OriginObject[];
};

function TableBody({ columns, data }: TableBody) {
  const renderTableRow = (rowData: OriginObject, index: number): ReactNode => (
    <tr key={`row-${index}-${rowData.id}`}>
      {columns.map((column: ColumnDefinition) => (
        <Td key={`${column.id}-${rowData.id}`} align={column.align}>{rowData[column.id]}</Td>
      ))}
    </tr>
  );

  const renderTableBody = (): ReactNode => {
    let content: ReactNode = <></>;

    if (columns && data && data.length > 0) {
      content = data.map((rowData: OriginObject, index: number) =>
        renderTableRow(rowData, index),
      );
    }

    return content;
  };

  return <Tbody>{renderTableBody()}</Tbody>;
}

export default TableBody;
