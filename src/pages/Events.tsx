import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { Preferences } from "@capacitor/preferences";
import {
  calendarOutline,
  checkmarkCircle,
  heart,
  heartOutline,
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

const Events: React.FC = () => {
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  const [search, setSearch] = useState("");
  const [onlyFavourites, setOnlyFavourites] = useState(false);

  const [favourites, setFavourites] = useState<string[]>([]);
  const favouritesRef = useRef<string[]>([]);
  const [message, setMessage] = useState("");

  // Joined events are saved in localStorage
  const [joinedIds, setJoinedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("joinedIds");
    return saved ? JSON.parse(saved) : [];
  });

  // Save the joined events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("joinedIds", JSON.stringify(joinedIds));
  }, [joinedIds]);

  // Join if not joined yet, leave if already joined
  const toggleJoin = (id: string) => {
    if (joinedIds.includes(id)) {
      setJoinedIds(joinedIds.filter((joinedId) => joinedId !== id));
    } else {
      setJoinedIds([...joinedIds, id]);
    }
  };

  // Task 1: fetch the events when the screen opens
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");

    fetch("/../events.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setError(error.message);
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [reload]);

  // Task 3: restore the saved favourites when the app starts
  useEffect(() => {
    const loadFavourites = async () => {
      try {
        const { value } = await Preferences.get({ key: "favourites" });
        if (value === null) {
          return; // nothing saved yet = no favourites
        }
        const saved = JSON.parse(value);
        if (
          Array.isArray(saved) &&
          saved.every((id) => typeof id === "string")
        ) {
          favouritesRef.current = saved;
          setFavourites(saved);
        } else {
          setMessage("Saved favourites were not valid, starting with none.");
        }
      } catch {
        setMessage("Could not read your saved favourites, starting with none.");
      }
    };
    loadFavourites();
  }, []);

  // Add or remove one event, keep the others, and save the whole list
  const toggleFavourite = async (id: string) => {
    const current = favouritesRef.current;
    const updated = current.includes(id)
      ? current.filter((favId) => favId !== id)
      : [...current, id];

    favouritesRef.current = updated;
    setFavourites(updated);

    try {
      await Preferences.set({
        key: "favourites",
        value: JSON.stringify(updated),
      });
    } catch {
      setMessage(
        "Could not save your favourites. They may be lost on restart.",
      );
    }
  };

  // Task 4: search by title or location
  const visibleEvents = events.filter((event) => {
    const matches =
      event.title.toLowerCase().includes(search.trim().toLowerCase()) ||
      event.location.toLowerCase().includes(search.trim().toLowerCase());
    const allowed = !onlyFavourites || favourites.includes(event.id);
    return matches && allowed;
  });

  // Task 5: pick the right message for an empty list
  let emptyMessage = "";
  if (events.length === 0) {
    emptyMessage = "There are no events available right now.";
  } else if (onlyFavourites && favourites.length === 0) {
    emptyMessage =
      "You have no favourite events yet. Tap the heart on an event.";
  } else if (visibleEvents.length === 0) {
    emptyMessage = "No events match your search.";
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Campus Events</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonSearchbar
          placeholder="Search by title or location"
          value={search}
          onIonInput={(e) => setSearch(e.detail.value ?? "")}
        />

        <IonSegment
          value={onlyFavourites ? "favourites" : "all"}
          onIonChange={(e) =>
            setOnlyFavourites(e.detail.value === "favourites")
          }
        >
          <IonSegmentButton value="all">
            <IonLabel>All events</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="favourites">
            <IonLabel>Favourites ({favourites.length})</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {loading && (
          <div className="ion-text-center ion-padding">
            <IonSpinner name="crescent" />
            <p>Loading events...</p>
          </div>
        )}

        {!loading && error && (
          <div className="ion-text-center ion-padding">
            <p>{error}</p>
            <IonButton onClick={() => setReload(reload + 1)}>Retry</IonButton>
          </div>
        )}

        {!loading && !error && emptyMessage && (
          <p className="ion-text-center">{emptyMessage}</p>
        )}

        {/* Task 2: one card for each event, using the id as key */}
        {!loading &&
          !error &&
          visibleEvents.map((event) => {
            const saved = favourites.includes(event.id);
            const joined = joinedIds.includes(event.id);
            return (
              <IonCard key={event.id}>
                <IonCardHeader>
                  <IonCardTitle>
                    {event.title}
                    {/* favourite heart: filled = saved, outline = not saved */}
                    <IonButton
                      fill="clear"
                      color="danger"
                      className="ion-float-end"
                      aria-label={
                        saved
                          ? "Remove " + event.title + " from favourites"
                          : "Add " + event.title + " to favourites"
                      }
                      onClick={() => toggleFavourite(event.id)}
                    >
                      <IonIcon
                        slot="icon-only"
                        icon={saved ? heart : heartOutline}
                      />
                    </IonButton>
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p>
                    <IonIcon icon={calendarOutline} /> {event.date}{" "}
                    <IonIcon icon={timeOutline} /> {event.time}
                  </p>
                  <p>
                    <IonIcon icon={locationOutline} /> {event.location}
                  </p>
                  <p>{event.description}</p>

                  <IonButton fill="outline" routerLink={"/event/" + event.id}>
                    Details
                  </IonButton>
                  <IonButton
                    color={joined ? "danger" : "primary"}
                    onClick={() => toggleJoin(event.id)}
                  >
                    <IonIcon slot="start" icon={checkmarkCircle} />
                    {joined ? "Leave" : "Join"}
                  </IonButton>
                </IonCardContent>
              </IonCard>
            );
          })}

        <IonToast
          isOpen={message !== ""}
          message={message}
          duration={3000}
          color="danger"
          onDidDismiss={() => setMessage("")}
        />
      </IonContent>
    </IonPage>
  );
};

export default Events;
