import Location from "@model/Location";
import NoteManager from "@model/NoteManager";
import { useState } from "react";
import AddNoteButton from "./AddNoteButton";
import Note from "./Note";

export default function NotesOverview() {
  const noteManager = NoteManager.getInstance();
  const location = Location.getInstance();
  const [currentLocation, setCurrentLocation] =
    useState<null | GeolocationPosition>(null);
  location.subscribe("currentLocation", (currentLocation) => {
    setCurrentLocation(currentLocation);
    setNotes([...noteManager.notes]);
  });

  const [notes, setNotes] = useState([...noteManager.notes]);
  noteManager.subscribe("notes", () => setNotes([...noteManager.notes]));

  return (
    <div className="flex flex-col gap-2">
      {notes.map((note) => (
        <Note note={note} key={note.id} />
      ))}
      {currentLocation && <AddNoteButton />}
    </div>
  );
}
