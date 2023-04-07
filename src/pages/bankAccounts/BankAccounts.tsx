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
import './BankAccounts.scss';

interface BackAccountsProps {}

const BackAccounts: React.FC<BackAccountsProps> = () => {
  return (
    <IonPage id="bank-account">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Bank Accounts</IonTitle>
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

export default React.memo(BackAccounts);
