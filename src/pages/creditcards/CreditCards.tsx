import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import './CreditCards.scss';

interface CreditCardsProps {}

const CreditCards: React.FC<CreditCardsProps> = () => {
  return (
    <IonPage id="bank-account">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>CreditCards</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-no-padding ion-no-margin">
        <IonList lines="full" className="ion-no-padding ion-no-margin">
          <IonItem>
            <IonLabel>HDFC</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>ICICI</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>SBI</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Axis</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Standard Chartered Bank</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(CreditCards);
