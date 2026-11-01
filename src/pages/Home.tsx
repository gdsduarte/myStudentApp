import {
  IonAlert,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { useState, useEffect } from "react";
import {
  checkmarkCircle,
  codeSlash,
  informationCircle,
  locationOutline,
  phonePortrait,
  school,
  server,
  timeOutline,
} from "ionicons/icons";
import { events } from "../data/events";
import { assignments } from "../data/assignments";

// List of modules shown in the IonList
const modules = [
  { name: "Mobile Development", icon: phonePortrait, credits: 10 },
  { name: "Database Systems", icon: server, credits: 5 },
  { name: "Web Development", icon: codeSlash, credits: 5 },
];

const Home: React.FC = () => {
  // Lab 1: assignments state
 const [showDetails, setShowDetails] = useState("");
 const [doneList, setDoneList] = useState<string[]>([]);
 const [toastMessage, setToastMessage] = useState("");

 // Lab 2: events state
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");

  /* Lab 2: Task D — Join/Leave and persistence. */
  const [joinedIds, setJoinedIds] = useState<number[]>(() => {
    const saved = localStorage.getItem("joinedIds");
    return saved ? JSON.parse(saved) : [];
  });

  // the details page can change the joined events, so read them again
  // every time this page is shown
  useIonViewWillEnter(() => {
    const saved = localStorage.getItem("joinedIds");
    setJoinedIds(saved ? JSON.parse(saved) : []);
  });

  // save to localStorage every time the joined list changes
  useEffect(() => {
    localStorage.setItem("joinedIds", JSON.stringify(joinedIds));
  }, [joinedIds]);

  // join if not joined yet, leave if already joined
  const toggleJoin = (id: number) => {
    if (joinedIds.includes(id)) {
      setJoinedIds(joinedIds.filter((joinedId) => joinedId !== id));
    } else {
      setJoinedIds([...joinedIds, id]);
    }
  };
 
  // filter the events by title
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase()),
  );

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

        {/* Assignments (Lab 1) */}
        <div className="ion-text-center">
          <IonListHeader>
            <IonLabel>My Assignments</IonLabel>
          </IonListHeader>

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

        {/* Campus events (Lab 2) */}
        <div className="ion-text-center">
          <IonListHeader>
            <IonLabel>Campus Events</IonLabel>
          </IonListHeader>

          <IonChip color="success">
            <IonIcon icon={checkmarkCircle} />
            <IonLabel>
              {joinedIds.length} of {events.length} events joined
            </IonLabel>
          </IonChip>
        </div>
        
        {/* Lab 2: Task C - input */}
        <IonInput
          className="ion-margin-top"
          label="Search events"
          labelPlacement="floating"
          fill="outline"
          value={search}
          onIonInput={(e) => setSearch(e.detail.value ?? "")}
        />

        {filteredEvents.length === 0 && (
          <p className="ion-text-center">
            No events found. Try a different search.
          </p>
        )}

        {/* Lab 2: Task B - Ionic interface */}
        {filteredEvents.map((event) => {
          const joined = joinedIds.includes(event.id);
          return (
            <IonCard key={event.id}>
              <div className="ion-text-end">
                <IonBadge color="danger">{event.category}</IonBadge>
              </div>
              <IonCardHeader>
                <IonCardTitle>
                  {event.title}
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>
                  <IonIcon icon={locationOutline} /> {event.location}
                </p>
                <p>
                  <IonIcon icon={timeOutline} /> {event.time}
                </p>

                {/* Lab 2: Task C - interaction */}
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

        {/* Lab 1: Ionic list with three items */}
        <IonList inset>
          <IonListHeader>
            <IonLabel>My Modules</IonLabel>
          </IonListHeader>
          {modules.map((module) => (
            <IonItem key={module.name}>
              <IonIcon icon={module.icon} slot="start" color="primary" />
              <IonLabel>{module.name}</IonLabel>
              <IonBadge slot="end">{module.credits} credits</IonBadge>
            </IonItem>
          ))}
        </IonList>

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

export default Home;
