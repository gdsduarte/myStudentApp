import {
  IonBadge,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { modules } from "../data/modules";

const Modules: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string>("");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Modules</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <IonList>
          {modules.map((module) => (
            <IonItem key={module.name}>
              <IonIcon icon={module.icon} slot="start" color="primary" />
              <IonLabel>{module.name}</IonLabel>
              <IonBadge slot="end">{module.credits} credits</IonBadge>
            </IonItem>
          ))}
        </IonList>
        <IonToast
          isOpen={toastMessage !== ""}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setToastMessage("")}
        />
      </IonContent>
    </IonPage>
  );
};

export default Modules;
