import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkmarkCircle, locationOutline, timeOutline } from "ionicons/icons";
import { events } from "../data/events";

const EventDetails: React.FC = () => {
  // get the id from the URL and find the matching event
  const { id } = useParams();
  const event = events.find((e) => e.id === Number(id));

  // joined ids are loaded from localStorage
  const [joinedIds, setJoinedIds] = useState<number[]>(() => {
    const saved = localStorage.getItem("joinedIds");
    return saved ? JSON.parse(saved) : [];
  });

  // save to localStorage every time the joined list changes
  useEffect(() => {
    localStorage.setItem("joinedIds", JSON.stringify(joinedIds));
  }, [joinedIds]);

  const toggleJoin = (eventId: number) => {
    if (joinedIds.includes(eventId)) {
      setJoinedIds(joinedIds.filter((joinedId) => joinedId !== eventId));
    } else {
      setJoinedIds([...joinedIds, eventId]);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Back" />
          </IonButtons>
          <IonTitle>Event Details</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {!event ? (
          <p className="ion-text-center">Event not found.</p>
        ) : (
          <>
            <IonBadge color="danger">{event.category}</IonBadge>
            <h1>{event.title}</h1>
            <p>
              <IonIcon icon={locationOutline} /> {event.location}
            </p>
            <p>
              <IonIcon icon={timeOutline} /> {event.time}
            </p>
            <p>{event.description}</p>
          </>
        )}
      </IonContent>

      {/* Join/Leave button */}
      {event && (
        <IonFooter>
          <IonToolbar>
            <IonButton
              expand="block"
              className="ion-margin"
              color={joinedIds.includes(event.id) ? "danger" : "primary"}
              onClick={() => toggleJoin(event.id)}
            >
              <IonIcon slot="start" icon={checkmarkCircle} />
              {joinedIds.includes(event.id) ? "Leave event" : "Join event"}
            </IonButton>
          </IonToolbar>
        </IonFooter>
      )}
    </IonPage>
  );
};

export default EventDetails;
