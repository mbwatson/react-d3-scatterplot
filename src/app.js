import { Fragment } from 'react';
import { Container } from './components/container';
import { Scatterplot } from './components/scatterplot';
import data from './data/rsvnet_hospitalization.csv';

const dataWithIDs = data.map(d => ({ ...d, id: self.crypto.randomUUID() }));

export const App = () => {
  return (
    <Fragment>
      <Container>
        <Scatterplot
          data={ dataWithIDs }
          width={ 1000 }
          height={ 600 }
        />
      </Container>
    </Fragment>
  );
};
