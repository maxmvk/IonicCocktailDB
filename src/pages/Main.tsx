import React from 'react';
import { 
  IonRouterOutlet
} from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import DrinksContainer from './Drinks/DrinksContainer';
import FiltersContainer from './Filters/FiltersContainer';

const Main: React.FC = () => {
  return (
    <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/drinks" component={DrinksContainer} exact={true} />
          <Route path="/filters" component={FiltersContainer} exact={true} />
          <Route path="/" render={() => <Redirect to="/drinks" />} exact={true} />
        </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Main;
