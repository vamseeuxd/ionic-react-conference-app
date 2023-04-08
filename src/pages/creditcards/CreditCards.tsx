import React, { useEffect, useRef, useState } from 'react';
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
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonButton,
  IonInput,
  IonFooter,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonBadge,
  IonAlert,
  IonToast,
} from '@ionic/react';
import './CreditCards.scss';
import { add } from 'ionicons/icons';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

interface CreditCardsProps {}
interface ICreditCard {
  id: string;
  bankName: string;
  creditCardNumber: string;
  creditCardTitle: string;
}

enum CONSTANTS {
  nameSingular = 'Credit Card',
  namePlural = 'Credit Cards',
}

const CreditCards: React.FC<CreditCardsProps> = () => {
  const [bankAccoutns, setBankAccounts] = useState<ICreditCard[]>([
    {
      id: '001',
      bankName: 'HDFC',
      creditCardNumber: '1234567890',
      creditCardTitle: 'HDFC - Vizag Branch',
    },
  ]);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState<ICreditCard | null>(null);
  const [isInit, setIsInit] = useState<boolean>(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const addAccountModalRef = useRef<HTMLIonModalElement>(null);
  const bankNameRef = useRef<HTMLIonInputElement>(null);
  const accountNumberRef = useRef<HTMLIonInputElement>(null);
  const bankAccountTitleRef = useRef<HTMLIonInputElement>(null);

  useEffect(() => {
    const onPopStateChange = (event: PopStateEvent) => {
      setIsDeleteConfirmation(false);
      setIsAccountModalOpen(false);
    };
    window.addEventListener('popstate', onPopStateChange);
    setIsInit(true);
    return () => {
      window.removeEventListener('popstate', onPopStateChange);
    };
  }, []);

  useEffect(() => {
    if (isDeleteConfirmation) {
      history.pushState(null, 'Delete Confirmation', '?DeleteConfirmation');
    }
    if (isAccountModalOpen) {
      history.pushState(null, 'Credit Card Modal', '?AccountModal');
    }
  }, [isDeleteConfirmation, isAccountModalOpen]);

  const onAddOrEditConfirm = () => {
    const id = new Date().getTime().toString();
    const bankName = bankNameRef.current
      ? bankNameRef.current.value
      : undefined;
    const creditCardNumber = accountNumberRef.current
      ? accountNumberRef.current.value
      : undefined;
    const creditCardTitle = bankAccountTitleRef.current
      ? bankAccountTitleRef.current.value
      : undefined;
    if (bankName && creditCardNumber && creditCardTitle) {
      const data = { id, bankName, creditCardNumber, creditCardTitle };
      addAccountModalRef.current?.dismiss(data, 'confirm');
    } else {
      setIsToastOpen(true);
      setToastMessage(`Please provide valid ${CONSTANTS.namePlural} details`);
    }
  };

  const onAddOrEditAccountWillDismiss = (
    ev: CustomEvent<OverlayEventDetail>
  ) => {
    if (ev.detail.role === 'confirm') {
      if (!isEdit) {
        setBankAccounts([...bankAccoutns, ev.detail.data]);
        setToastMessage(`${CONSTANTS.nameSingular} added successfully.`);
        setIsToastOpen(true);
        history.back();
      } else {
        setBankAccounts(
          bankAccoutns.map((account) => {
            if (isEdit.id === account.id) {
              return { ...ev.detail.data, id: account.id };
            } else {
              return account;
            }
          })
        );
        setToastMessage(`${CONSTANTS.nameSingular} updated successfully.`);
        setIsToastOpen(true);
        history.back();
      }
    }
  };

  const onEditAccountClick = (data: ICreditCard) => {
    setIsEdit(data);
    setIsAccountModalOpen(true);
  };

  const renderFooter = () => {
    return (
      <IonFooter>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                addAccountModalRef.current?.dismiss();
                history.back();
              }}
            >
              Cancel
            </IonButton>
          </IonButtons>
          <IonButtons slot="start">
            <IonButton strong={true} onClick={() => onAddOrEditConfirm()}>
              {isEdit ? 'Update Credit Card' : 'Add Credit Card'}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    );
  };

  const renderToast = () => {
    return (
      <IonToast
        isOpen={isToastOpen}
        message={toastMessage}
        onDidDismiss={() => setIsToastOpen(false)}
        duration={3000}
        style={{ height: '90%' }}
        buttons={[
          {
            text: 'Dismiss',
            role: 'cancel',
            handler: () => {
              setIsToastOpen(false);
            },
          },
        ]}
      ></IonToast>
    );
  };

  const renderBankAccountTitleInput = () => {
    return (
      <IonItem>
        <IonLabel position="stacked">Credit Card Title</IonLabel>
        <IonInput
          ref={bankAccountTitleRef}
          clearInput={true}
          id="creditCardTitle"
          value={isEdit ? isEdit.creditCardTitle : ''}
          type="text"
          aria-label="text"
          placeholder="Credit Card Title"
        />
      </IonItem>
    );
  };
  const renderBankNameInput = () => {
    return (
      <IonItem>
        <IonLabel position="stacked">Bank Name</IonLabel>
        <IonInput
          ref={bankNameRef}
          clearInput={true}
          value={isEdit ? isEdit.bankName : ''}
          id="bankName"
          type="text"
          aria-label="text"
          placeholder="Bank Name"
        />
      </IonItem>
    );
  };
  const renderAccountNumberInput = () => {
    return (
      <IonItem>
        <IonLabel position="stacked">Credit Card Number</IonLabel>
        <IonInput
          ref={accountNumberRef}
          clearInput={true}
          value={isEdit ? isEdit.creditCardNumber : ''}
          id="creditCardNumber"
          type="text"
          aria-label="text"
          placeholder="Credit Card Number"
        />
      </IonItem>
    );
  };

  const renderAddNewAccountModal = (title: string, isOpen: boolean) => {
    return (
      <IonModal
        ref={addAccountModalRef}
        isOpen={isOpen}
        onDidDismiss={() => {
          setIsAccountModalOpen(false);
        }}
        onWillDismiss={(ev) => onAddOrEditAccountWillDismiss(ev)}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>{title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {renderBankAccountTitleInput()}
          {renderBankNameInput()}
          {renderAccountNumberInput()}
        </IonContent>
        {renderFooter()}
      </IonModal>
    );
  };

  const renderAddButton = () => {
    return (
      <IonFab slot="fixed" horizontal="end" vertical="bottom">
        <IonFabButton
          onClick={() => {
            setIsEdit(null);
            setIsAccountModalOpen(true);
          }}
        >
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
    );
  };

  const renderAlert = (data: any) => {
    return (
      <IonAlert
        header="Delete Confirmation"
        message={`Are you sure! Do you want to delete '${data.creditCardTitle}' ${CONSTANTS.nameSingular}`}
        isOpen={isDeleteConfirmation}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              setIsDeleteConfirmation(false);
              history.back();
            },
          },
          {
            text: 'OK',
            role: 'confirm',
            handler: () => {
              setIsDeleteConfirmation(false);
              history.back();
              setBankAccounts(bankAccoutns.filter((ba) => ba.id !== data.id));
              setToastMessage(
                `${CONSTANTS.nameSingular} deleted successfully.`
              );
              setIsToastOpen(true);
            },
          },
        ]}
      ></IonAlert>
    );
  };

  const renderOptions = (data: any) => {
    const styles = { width: '80px' };
    return (
      <IonItemOptions side="start">
        <IonItemOption onClick={() => onEditAccountClick(data)} style={styles}>
          EDIT
        </IonItemOption>
        <IonItemOption
          onClick={() => {
            setIsDeleteConfirmation(true);
          }}
          style={styles}
          color="danger"
        >
          Delete
        </IonItemOption>
        {renderAlert(data)}
      </IonItemOptions>
    );
  };

  const renderList = () => {
    const badgeStyle = {
      fontWeight: 'normal',
      padding: '2px 10px',
      margin: '5px 5px 0 0',
    };
    return (
      <IonList lines="full" className="ion-no-padding ion-no-margin">
        {bankAccoutns.map((data) => {
          return (
            <IonItemSliding key={data.id}>
              {renderOptions(data)}
              <IonItem>
                <IonLabel>
                  <h2>
                    {data.creditCardTitle} ({data.creditCardNumber})
                  </h2>
                  <div>
                    <IonBadge style={badgeStyle} color="tertiary">
                      Bank : {data.bankName}
                    </IonBadge>
                  </div>
                </IonLabel>
              </IonItem>
            </IonItemSliding>
          );
        })}
      </IonList>
    );
  };

  return (
    <IonPage id="bank-account">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>{CONSTANTS.namePlural}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-no-padding ion-no-margin">
        {renderList()}
        {renderAddButton()}
        {renderAddNewAccountModal(
          isEdit
            ? `Edit ${CONSTANTS.nameSingular}`
            : `Add New ${CONSTANTS.nameSingular}`,
          isAccountModalOpen
        )}
      </IonContent>
      {renderToast()}
    </IonPage>
  );
};

export default React.memo(CreditCards);
