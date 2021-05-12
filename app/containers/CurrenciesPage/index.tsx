import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { makeSelectLocation } from '../App/selectors';
import {
  makeSelectCurrencies,
  makeSelectLoading,
  makeSelectError
} from './currencies.selectors';
import reducer from './currencies.reducer';
import saga from './currencies.saga';
import { loadCurrenciesAction } from './currencies.actions';
import { CurrencyTableColumns } from './currencies.constants';
import {
  ASCENDING_ORDER_DIRECTION,
  DESCENDING_ORDER_DIRECTION, OrderDirection,
  SortOrder,
} from '../../components/Table/Table.constants';

import H2 from 'components/H2';
import LoadingIndicator from 'components/LoadingIndicator';
import Table from 'components/Table';
import Backdrop from './components/Backdrop';
import CenteredSection from './components/CenteredSection';
import Section from './components/Section';

const key = 'currencies';

const stateSelector = createStructuredSelector({
  currencies: makeSelectCurrencies(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  router: makeSelectLocation(),
});

export default function CurrenciesPage() {
  const { currencies, loading, error, router } = useSelector(stateSelector);
  const [tableData, setTableData] = useState<any>([]);
  const [sortOption, setSortOption] = useState<SortOrder>();
  const [intervalId, setIntervalId] = useState<any>(null);

  useInjectReducer({ key: key, reducer: reducer });
  useInjectSaga({ key: key, saga: saga });

  const dispatch = useDispatch();

  const handleSortByChanged = (fieldName: string): void => {
    let orderDirection: OrderDirection = ASCENDING_ORDER_DIRECTION;

    if (sortOption) {
      orderDirection =
        sortOption.sortBy !== fieldName
        ? ASCENDING_ORDER_DIRECTION
        : sortOption.order === ASCENDING_ORDER_DIRECTION
          ? DESCENDING_ORDER_DIRECTION
          : ASCENDING_ORDER_DIRECTION;
    }

    setSortOption({
      order: orderDirection,
      sortBy: fieldName || '',
    })
  };

  useEffect(() => {
    if (currencies) {
      const { bpi } = currencies;
      const bpiArray = Object.values(bpi);

      if (sortOption) {
        const sortedData = bpiArray.sort((dt1, dt2) => {
          const firstData = dt1[sortOption.sortBy].replace(/,/g, '');
          const secondData = dt2[sortOption.sortBy].replace(/,/g, '');
          const order = sortOption.order === ASCENDING_ORDER_DIRECTION ? -1 : 1;
          return (firstData > secondData ? -1 : 1) * order;
        });
        setTableData(sortedData);
      } else {
        setTableData(bpiArray);
      }
    }
  }, [sortOption, currencies]);

  useEffect(() => {
    dispatch(loadCurrenciesAction());
  }, [dispatch]);

  useEffect(() => {
    let timeId: any = null;
    if (intervalId === null) {
      timeId = setInterval(() => dispatch(loadCurrenciesAction()), 15000);
      setIntervalId(timeId);
    }

    return () => clearInterval(timeId);
  }, []);

  useEffect(() => {
    if (error) {
      console.log(error)
    }
  }, [error]);

  return (
    <article>
      <Helmet>
        <title>Currencies</title>
        <meta name="description" content="Currencies" />
      </Helmet>
      <div>
        <CenteredSection>
          <H2>
            {currencies?.chartName}
          </H2>
          <p>
            {currencies?.disclaimer}
          </p>
        </CenteredSection>
        <Section>
          {loading && (
            <Backdrop>
              <LoadingIndicator />
            </Backdrop>
          )}
          <Table
            data={tableData}
            columns={CurrencyTableColumns}
            sortingOptions={sortOption}
            onSortByColumn={handleSortByChanged}
          />
        </Section>
      </div>
    </article>
  );
}
