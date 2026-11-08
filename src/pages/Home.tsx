import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState} from "react";
import {
  informationCircle,
  school,
} from "ionicons/icons";

const Home: React.FC = () => {
  const [name, setName] = useState("");

  return (
    <IonPage>
      {/* Lab 1: Header and toolbar */}
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>My Student App - Home</IonTitle>
          <IonButtons slot="end">
            <IonButton id="info-alert">
              <IonIcon slot="icon-only" icon={informationCircle} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* Lab 1: 1/3 addtional Ionic Ui Component */}
      <IonAlert
        trigger="info-alert"
        header="About"
        message="My Student App, built with Ionic React."
        buttons={["Back"]}
      />

      <IonContent className="ion-padding">
        {/* Lab 1: Welcome section (now with the name input) */}
        <div className="ion-text-center">
          <IonIcon icon={school} size="large" color="primary" />
          <IonTitle className="ion-text-center">
            {name === "" ? "Hi, welcome back!" : "Hi, " + name + "!"}
          </IonTitle>
          <p>
            Find campus events to join and check your modules this semester.
          </p>
        </div>

        <IonInput
          label="Your name"
          labelPlacement="floating"
          fill="outline"
          value={name}
          onIonInput={(e) => setName(e.detail.value ?? "")}
        />

      </IonContent>
    </IonPage>
  );
};

export default Home;
