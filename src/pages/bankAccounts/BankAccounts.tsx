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
  IonText,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonBadge,
  IonAlert,
  IonToast,
} from '@ionic/react';
import './BankAccounts.scss';
import { add } from 'ionicons/icons';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

interface BackAccountsProps {}
interface IBackAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  bankAccountTitle: string;
  ifscCode: string;
}

enum CONSTANTS {
  nameSingular = 'Bank Account',
  namePlural = 'Bank Accounts',
}

const BackAccounts: React.FC<BackAccountsProps> = () => {
  const [bankAccoutns, setBankAccounts] = useState<IBackAccount[]>([
    {
      id: '001',
      bankName: 'HDFC',
      accountNumber: '1234567890',
      bankAccountTitle: 'HDFC - Vizag Branch',
      ifscCode: '54321',
    },
  ]);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState<IBackAccount | null>(null);
  const [isInit, setIsInit] = useState<boolean>(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const addAccountModalRef = useRef<HTMLIonModalElement>(null);
  const bankNameRef = useRef<HTMLIonInputElement>(null);
  const accountNumberRef = useRef<HTMLIonInputElement>(null);
  const bankAccountTitleRef = useRef<HTMLIonInputElement>(null);
  const ifscCodeRef = useRef<HTMLIonInputElement>(null);

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
      history.pushState(null, 'Account Modal', '?AccountModal');
    }
    /* if (!isDeleteConfirmation && !isAccountModalOpen && isInit) {
      history.back();
    } */
  }, [isDeleteConfirmation, isAccountModalOpen]);

  const onAddOrEditConfirm = () => {
    const id = new Date().getTime().toString();
    const bankName = bankNameRef.current
      ? bankNameRef.current.value
      : undefined;
    const accountNumber = accountNumberRef.current
      ? accountNumberRef.current.value
      : undefined;
    const bankAccountTitle = bankAccountTitleRef.current
      ? bankAccountTitleRef.current.value
      : undefined;
    const ifscCode = ifscCodeRef.current
      ? ifscCodeRef.current.value
      : undefined;
    if (bankName && accountNumber && bankAccountTitle && ifscCode) {
      const data = { id, bankName, accountNumber, bankAccountTitle, ifscCode };
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

  const onEditAccountClick = (data: IBackAccount) => {
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
              {isEdit ? 'Update Account' : 'Add Account'}
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
        <IonLabel position="stacked">Bank Account Title</IonLabel>
        <IonInput
          ref={bankAccountTitleRef}
          clearInput={true}
          id="bankAccountTitle"
          value={isEdit ? isEdit.bankAccountTitle : ''}
          type="text"
          aria-label="text"
          placeholder="Bank Account Title"
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
        <IonLabel position="stacked">Account Number</IonLabel>
        <IonInput
          ref={accountNumberRef}
          clearInput={true}
          value={isEdit ? isEdit.accountNumber : ''}
          id="accountNumber"
          type="text"
          aria-label="text"
          placeholder="Account Number"
        />
      </IonItem>
    );
  };
  const renderIfscCodeInput = () => {
    return (
      <IonItem>
        <IonLabel position="stacked">IFSC Code</IonLabel>
        <IonInput
          ref={ifscCodeRef}
          clearInput={true}
          value={isEdit ? isEdit.ifscCode : ''}
          id="ifscCode"
          type="text"
          aria-label="text"
          placeholder="IFSC Code"
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
          {renderIfscCodeInput()}
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
        message={`Are you sure! Do you want to delete '${data.bankAccountTitle}' Bank Account`}
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
                    {data.bankAccountTitle} ({data.accountNumber})
                  </h2>
                  <div>
                    <IonBadge style={badgeStyle} color="tertiary">
                      Bank : {data.bankName}
                    </IonBadge>
                    <IonBadge style={badgeStyle} color="danger">
                      IFSC : {data.ifscCode}
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

export default React.memo(BackAccounts);
