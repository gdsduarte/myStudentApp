# My Student App – Mobile and Social Computing CA1

- **Name:** Guilherme Duarte da Silva
- **Student number:** 10577768
- **Framework:** Ionic + React
- **GitHub:** https://github.com/gdsduarte/myStudentApp

## How to run

```bash
npm install
ionic serve
```

## Project structure

- `src/App.tsx` – routes (`/home` and `/event/:id`).
- `src/pages/Home.tsx` – main page.
- `src/pages/EventDetails.tsx` – event details page.
- `src/data/assignments.ts` – assignments array.
- `src/data/events.ts` – campus events array.

---

## Lab 1

### Features

- **Header and toolbar** with an info button that opens an `IonAlert`.
- **Welcome section** with an icon, a title and a short message.
- **Assignment cards** (`IonCard`) with a status `IonBadge`.
- **Show / Hide** button to display more details of each assignment.
- **Mark as done** button that disables itself, updates the "x of 3 assignments done" chip and shows an `IonToast`.
- **My Modules** list (`IonList` / `IonItem`) with three modules and their credits.

### Screenshots

Home page, and after marking two assignments as done (with the toast):

<table><tr><td><img src="screenshot/lab-1/Screenshot%202026-10-17%20234305.png" alt="Lab 1 home" width="220"></td><td><img src="screenshot/lab-1/Screenshot%202026-10-17%20234331.png" alt="Lab 1 assignments done" width="220"></td></tr></table>

---

## Lab 2

### Features

- **Two pages:** the Home page lists the events and the Event Details page (`/event/:id`) shows one event, with a back button to return.
- **Events:** campus events shown as Ionic cards with title, location, time and category.
- **Name input:** shows a personalised greeting in the welcome section.
- **Search events input:** filters events by title and shows a message when nothing matches.
- **Join / Leave:** works on the cards and on the details page. The joined count uses an array of ids.
- **Persistence:** joined event ids are saved to `localStorage` with `useEffect` and restored after a refresh.

### Screenshots

Greeting with the name input:

<table><tr><td><img src="screenshot/lab-2/Screenshot%202026-11-01%20224743.png" width="220"></td><td><img src="screenshot/lab-2/Screenshot%202026-11-01%20224836.png" width="220"></td></tr></table>

Events list (joined events show "Leave") and the event details page:

<table><tr><td><img src="screenshot/lab-2/Screenshot%202026-11-01%20224522.png" width="220"></td><td><img src="screenshot/lab-2/Screenshot%202026-11-01%20224540.png" width="220"></td></tr></table>

Search result and empty search message:

<table><tr><td><img src="screenshot/lab-2/Screenshot%202026-11-01%20224649.png" width="220"></td><td><img src="screenshot/lab-2/Screenshot%202026-11-01%20224716.png" width="220"></td></tr></table>

---

## Lab 3

### What changed from Lab 2

- **Bottom tabs:** the app now has an `IonTabs` bar with four tabs: **Home**, **Events**, **Assignments** and **Modules** (`src/components/BottomTabs.tsx`). `App.tsx` routes the tab paths to it and keeps `/event/:id` as a separate page.
- **Home page** (`Home.tsx`) now only has the header, the info alert and the welcome section with the "Your name" input.
- **Assignments page** (`Assignments.tsx`) and **Modules page** (`Modules.tsx`): the Lab 1 assignment cards and the modules list moved to their own pages. Modules now come from `src/data/modules.ts`.
- **Events page** (`Events.tsx`) is the new Lab 3 screen. The events are no longer a hard-coded array: they are fetched from `public/events.json` (the old `src/data/events.ts` is not used for the list any more).
- **New events data:** each event has a text id (`"evt-01"`), `title`, `date`, `time`, `location` and `description`. The old category field was removed.
- **Event Details page** now fetches `/events.json` and finds the event with the id from the URL, instead of reading the old array. Join/Leave stays at the bottom.
- **New package:** `@capacitor/preferences` for saving favourites.
- **Removed:** the unused `ExploreContainer` component and `Home.css`. The old search input and the localStorage join code were kept (Join/Leave) but now use the text ids.

### Features

- **Fetch with `useEffect`:** the Events page loads `/events.json` when it opens. It checks the HTTP status, the JSON and that every event has the expected fields. The effect only runs again when Retry is pressed, so it does not loop.
- **Dynamic cards:** one `IonCard` per event (key = event id) showing title, date, time, location and description, plus the Details and Join/Leave buttons from Lab 2.
- **Favourites:** a heart icon on each card (filled = saved, outline = not saved) with an `aria-label`. Several events can be saved at the same time, and toggling one keeps the others.
- **Favourites view:** an "All events / Favourites (n)" segment shows only the saved events.
- **Search:** `IonSearchbar` filters by title or location (case-insensitive, whitespace trimmed), also inside the favourites view.
- **States and errors:** loading spinner, fetch error with a Retry button, and separate messages for no events, no search matches and no favourites. Problems reading or saving Preferences show a toast.

### How favourites are stored

`Preferences` only saves strings, so the favourites are saved as a JSON array of event ids under the key `favourites`, for example:

```json
["evt-01","evt-03"]
```

On startup the app reads the key and uses `JSON.parse`. If nothing is saved it starts with no favourites. If the value is invalid, it starts with none and shows a message. The list is only saved when the user taps a heart, so an empty list can never overwrite saved data before it is loaded.

Joined events (Join/Leave) still use `localStorage` with the key `joinedIds`, as in Lab 2.

### Screenshots

Events list with no favourites, then two favourites saved (filled hearts):

<table><tr><td><img src="screenshot/lab-3/Screenshot%202026-11-08%20231200.png" width="220"></td><td><img src="screenshot/lab-3/Screenshot%202026-11-08%20231221.png" width="220"></td></tr></table>

Removing one favourite keeps the other, and searching "Campus" in all events:

<table><tr><td><img src="screenshot/lab-3/Screenshot%202026-11-08%20231244.png" width="220"></td><td><img src="screenshot/lab-3/Screenshot%202026-11-08%20231318.png" width="220"></td></tr></table>

Search inside the Favourites view with no match:

<table><tr><td><img src="screenshot/lab-3/Screenshot%202026-11-08%20231335.png" width="220"></td></tr></table>

Loading state and fetch error with the Retry button:

<table><tr><td><img src="screenshot/lab-3/Screenshot%202026-11-08%20232239.png" width="220"></td><td><img src="screenshot/lab-3/Screenshot%202026-11-08%20231453.png" width="220"></td></tr></table>

---

## AI assistance

AI was only used to create and update this README file. All the app code was written by me and the copilot inline suggestions.
