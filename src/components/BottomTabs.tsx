import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { Navigate, Route } from "react-router-dom";
import { calendarOutline, clipboardOutline, homeOutline } from "ionicons/icons";
import Home from "../pages/Home";
import Events from "../pages/Events";
import Assignments from "../pages/Assignments";
import Modules from "../pages/Modules";

const BottomTabs: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route path="/home" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/assignments" element={<Assignments />} />
      <Route path="/modules" element={<Modules />} />
      <Route path="/" element={<Navigate to="/home" replace />} />
    </IonRouterOutlet>

    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/home">
        <IonIcon aria-hidden="true" icon={homeOutline} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>

      <IonTabButton tab="events" href="/events">
        <IonIcon aria-hidden="true" icon={calendarOutline} />
        <IonLabel>Events</IonLabel>
      </IonTabButton>

      <IonTabButton tab="assignments" href="/assignments">
        <IonIcon aria-hidden="true" icon={clipboardOutline} />
        <IonLabel>Assignments</IonLabel>
      </IonTabButton>

      <IonTabButton tab="modules" href="/modules">
        <IonIcon aria-hidden="true" icon={calendarOutline} />
        <IonLabel>Modules</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default BottomTabs;
