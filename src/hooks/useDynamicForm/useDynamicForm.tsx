import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { useRef, useState } from 'react';

const useDynamicForm = (
  formConfig: any[] = []
): [JSX.Element, string, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isOpen, setIsOpen] = useState(false);
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [message, setMessage] = useState(
    'This modal example uses triggers to automatically open a modal when the button is clicked.'
  );

  const confirm = () => {
    modal.current?.dismiss(input.current?.value, 'confirm');
  };

  const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
    if (ev.detail.role === 'confirm') {
      setMessage(`Hello, ${ev.detail.data}!`);
      formConfig.forEach((config) => {
        console.log((document.getElementById(config.id) as HTMLIonInputElement).value);
      });
    }
  };

  const renderForm = () => {
    return (
      <IonList className="ion-no-padding ion-no-margin">
        {formConfig.map((config) => {
          return (
            <IonItem>
              <IonInput ref={input} {...config}></IonInput>
            </IonItem>
          );
        })}
      </IonList>
    );
  };

  const dynamicForm = () => {
    return (
      <IonModal
        ref={modal}
        isOpen={isOpen}
        trigger="open-modal"
        onDidDismiss={() => setIsOpen(false)}
        onWillDismiss={(ev) => onWillDismiss(ev)}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Welcome</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-no-padding ion-no-margin">
          {renderForm()}
        </IonContent>
        <IonFooter>
          <IonToolbar>
            <IonButtons slot="end">
              <IonButton onClick={() => modal.current?.dismiss()}>
                Cancel
              </IonButton>
              <IonButton strong={true} onClick={() => confirm()}>
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonFooter>
      </IonModal>
    );
  };
  return [dynamicForm(), message, setIsOpen];
};

export default useDynamicForm;
