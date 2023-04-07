import React from 'react';
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { calendar, location, informationCircle, people, cash, card, reader } from 'ionicons/icons';
import SchedulePage from '../schedulePage/SchedulePage';
import SpeakerList from '../speakerList/SpeakerList';
import SpeakerDetail from '../speakerDetail/SpeakerDetail';
import SessionDetail from '../sessionDetail/SessionDetail';
import MapView from '../mapView/MapView';
import About from '../about/About';
import BankAccounts from '../bankAccounts/BankAccounts';
import CreditCards from '../creditcards/CreditCards';
import Cash from '../cash/Cash';

interface MainTabsProps {}

const MainTabs: React.FC<MainTabsProps> = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/schedule" />
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        <Route
          path="/tabs/schedule"
          render={() => <SchedulePage />}
          exact={true}
        />
        <Route
          path="/tabs/speakers"
          render={() => <SpeakerList />}
          exact={true}
        />
        <Route
          path="/tabs/speakers/:id"
          component={SpeakerDetail}
          exact={true}
        />
        <Route path="/tabs/schedule/:id" component={SessionDetail} />
        <Route path="/tabs/speakers/sessions/:id" component={SessionDetail} />
        <Route path="/tabs/map" render={() => <MapView />} exact={true} />
        <Route path="/tabs/about" render={() => <About />} exact={true} />
        <Route path="/tabs/bankaccounts" render={() => <BankAccounts />} exact={true} />
        <Route path="/tabs/creditcards" render={() => <CreditCards />} exact={true} />
        <Route path="/tabs/cash" render={() => <Cash />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="schedule" href="/tabs/schedule">
          <IonIcon icon={calendar} />
          <IonLabel>Schedule</IonLabel>
        </IonTabButton>
        <IonTabButton tab="speakers" href="/tabs/speakers">
          <IonIcon icon={people} />
          <IonLabel>Speakers</IonLabel>
        </IonTabButton>
        <IonTabButton tab="map" href="/tabs/map">
          <IonIcon icon={location} />
          <IonLabel>Map</IonLabel>
        </IonTabButton>
        <IonTabButton tab="about" href="/tabs/about">
          <IonIcon icon={informationCircle} />
          <IonLabel>About</IonLabel>
        </IonTabButton>
        <IonTabButton tab="bankaccounts" href="/tabs/bankaccounts">
          <IonIcon icon={reader} />
          <IonLabel>Bank Accounts</IonLabel>
        </IonTabButton>
        <IonTabButton tab="creditcards" href="/tabs/creditcards">
          <IonIcon icon={card} />
          <IonLabel>Credit Cards</IonLabel>
        </IonTabButton>
        <IonTabButton tab="cash" href="/tabs/cash">
          <IonIcon icon={cash} />
          <IonLabel>Cash</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
