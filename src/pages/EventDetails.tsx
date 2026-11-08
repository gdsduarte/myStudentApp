import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  calendarOutline,
  checkmarkCircle,
  locationOutline,
  timeOutline,
} from "ionicons/icons";

type CampusEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
};

// read the joined event ids from localStorage (only keeps text ids)
const readJoined = (): string[] => {
  try {
    const saved = JSON.parse(localStorage.getItem("joinedIds") || "[]");
    return Array.isArray(saved) ? saved.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
};

const EventDetails: React.FC = () => {
  // get the id from the URL, then find the matching event in events.json
  const { id } = useParams();
  const [event, setEvent] = useState<CampusEvent | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/events.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load the event.");
        }
        return response.json();
      })
      .then((data) => {
        setEvent(data.find((e: CampusEvent) => e.id === id));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // joined ids are loaded from localStorage (same key as the Home page)
  const [joinedIds, setJoinedIds] = useState<string[]>(readJoined);

  useEffect(() => {
    localStorage.setItem("joinedIds", JSON.stringify(joinedIds));
  }, [joinedIds]);

  const toggleJoin = (eventId: string) => {
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
            <IonBackButton defaultHref="/events" text="Back" />
          </IonButtons>
          <IonTitle>Event Details</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {loading && (
          <div className="ion-text-center">
            <IonSpinner name="crescent" />
          </div>
        )}
        {!loading && error && <p className="ion-text-center">{error}</p>}
        {!loading && !error && !event && (
          <p className="ion-text-center">Event not found.</p>
        )}
        {event && (
          <>
            <h1>{event.title}</h1>
            <p>
              <IonIcon icon={calendarOutline} /> {event.date}
            </p>
            <p>
              <IonIcon icon={timeOutline} /> {event.time}
            </p>
            <p>
              <IonIcon icon={locationOutline} /> {event.location}
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
