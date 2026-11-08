import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";
import { useState } from "react";
import { assignments } from "../data/assignments";

const Assignments: React.FC = () => {
  const [doneList, setDoneList] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string>("");

  return (
    <IonPage>
      {/* Assignments (Lab 1) */}
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Assignments</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="ion-text-center">
          <IonChip color="success">
            <IonIcon icon={checkmarkCircle} />
            <IonLabel>
              {doneList.length} of {assignments.length} assignments done
            </IonLabel>
          </IonChip>
        </div>
        
        {/* Lab 1: Ionic cards */}
        {assignments.map((assignment) => (
          <IonCard key={assignment.name}>
            <div className="ion-text-end">
              <IonBadge color="danger">{assignment.status}</IonBadge>
            </div>
            <IonCardHeader>
              <IonCardTitle>{assignment.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>{assignment.description}</p>

              {showDetails === assignment.name && (
                <p style={{ marginTop: "8px", fontWeight: 500 }}>
                  {assignment.details}
                </p>
              )}

              {/* Lab 1: Buttons and interaction */}
              <IonButton
                fill="outline"
                onClick={() =>
                  setShowDetails(
                    showDetails === assignment.name ? "" : assignment.name,
                  )
                }
              >
                {showDetails === assignment.name ? "Hide" : "Show"}
              </IonButton>
              <IonButton
                disabled={doneList.includes(assignment.name)}
                onClick={() => {
                  setDoneList([...doneList, assignment.name]);
                  setToastMessage("Well done! Assignment marked as done.");
                }}
              >
                <IonIcon slot="start" icon={checkmarkCircle} />
                {doneList.includes(assignment.name) ? "Done" : "Mark as done"}
              </IonButton>
            </IonCardContent>
          </IonCard>
        ))}

        {/* Lab 1: 3/3 addtional Ionic Ui Component */}
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

export default Assignments;
