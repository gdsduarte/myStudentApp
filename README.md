# My Student App – Mobile and Social Computing CA1

- **Name:** Guilherme Duarte da Silva
- **Student number:** 10577768
- **Framework:** Ionic + React

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

<img src="screenshot/lab-1/Screenshot%202026-10-17%20234305.png" alt="Lab 1 home" width="220"> <img src="screenshot/lab-1/Screenshot%202026-10-17%20234331.png" alt="Lab 1 assignments done" width="220">

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

<img src="screenshot/lab-2/Screenshot%202026-11-01%20224743.png" width="220"> 
<img src="screenshot/lab-2/Screenshot%202026-11-01%20224836.png" width="220">

Events list (joined events show "Leave") and the event details page:

<img src="screenshot/lab-2/Screenshot%202026-11-01%20224522.png" width="220"> 
<img src="screenshot/lab-2/Screenshot%202026-11-01%20224540.png" width="220">

Search result and empty search message:

<img src="screenshot/lab-2/Screenshot%202026-11-01%20224649.png" width="220"> 
<img src="screenshot/lab-2/Screenshot%202026-11-01%20224716.png" width="220">

---

## Lab 3