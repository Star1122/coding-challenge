import React from 'react';

import { ASCENDING_ORDER_DIRECTION, DESCENDING_ORDER_DIRECTION, OrderDirection } from '../../Table.constants';
import Button from './Button';
import ArrowUp from './arrow-up.svg';
import ArrowDown from './arrow-down.svg';
import ArrowUpDown from './arrows-up-down.svg';
import SortImg from './SortImg';
import THeadContent from './THeadContent';

export type TableHeaderProps = {
  orderDirection?: OrderDirection;
  label: string;
  [key: string]: any;
};

function SortButton(props: TableHeaderProps) {
  const { label, orderDirection, ...rest } = props;

  return (
    <Button {...rest}>
      <THeadContent>{label}</THeadContent>
      {orderDirection === ASCENDING_ORDER_DIRECTION
        ? <SortImg src={ArrowDown} alt="arrow-down" />
        : orderDirection === DESCENDING_ORDER_DIRECTION
          ? <SortImg src={ArrowUp} alt="arrow-up" />
          : <SortImg src={ArrowUpDown} alt="arrow-up-down" />
      }
    </Button>
  );
}

export default SortButton;
