import NoteManager from "@model/NoteManager";
import { useState } from "react";
import Note from "./Note";
import { MdFab } from "@material_web_componponents/Fab";
import { MdIcon } from "@material_web_componponents/Icon";
import Location from "@model/Location";
import AddNoteButton from "./AddNoteButton";

export default function NotesOverview() {
  const noteManager = NoteManager.getInstance();
  const location = Location.getInstance();
  const [currentLocation, setCurrentLocation] =
    useState<null | GeolocationPosition>(null);
  location.subscribe("currentLocation", (currentLocation) =>
    setCurrentLocation(currentLocation),
  );

  const [notes, setNotes] = useState([...noteManager.notes]);
  noteManager.subscribe("notes", (notes) => setNotes([...notes]));

  return (
    <div className="flex flex-col gap-2">
      {notes.map((note) => (
        <Note note={note} />
      ))}
      {currentLocation && <AddNoteButton />}
    </div>
  );
}
