import { Fragment } from 'react';
import { Container } from './components/container';
import { Scatterplot } from './components/scatterplot';
import {
  ClearFiltersButton,
  ColumnsSelect,
  DataTable,
  Pagination,
  RowCount,
  TableToolbar,
} from './components/data-table';
import { useData } from '@data';

export const App = () => {
  const { data } = useData();
 
  return (
    <Fragment>
      <Container flexDirection="row">
        <span>Filename:</span>
        <pre>src/data/visualization/data-goldstandard/rsvnet_hospitalization.csv</pre>
      </Container>

      <Container>
        <Scatterplot
          data={ data.graph }
          width={ 1000 }
          height={ 600 }
        />
      </Container>

      <Container>
        <TableToolbar>
          <RowCount table={ data.table } />
          <Pagination table={ data.table } />
          <ColumnsSelect table={ data.table } />
          <ClearFiltersButton table={ data.table } />
        </TableToolbar>

        <DataTable table={ data.table } />
        
        <TableToolbar>
          <Pagination table={ data.table } />
        </TableToolbar>
      </Container>
    </Fragment>
  );
};
