import { MdFilledButton } from "@material_web_componponents/Buttons";
import Location from "@model/Location";
import Note from "@model/Note";
import NoteManager from "@model/NoteManager";

function App() {
  const location = new Location();
  const noteManager = new NoteManager();

  return (
    <div>
      <MdFilledButton
        onClick={() =>
          noteManager.addNote(
            new Note(
              { coords: { latitude: 0, longitude: 0 } },
              "test",
              "test description",
            ),
          )
        }
      >
        Add note
      </MdFilledButton>
      <MdFilledButton onClick={() => (noteManager.notes = [])}>
        Clear notes
      </MdFilledButton>
    </div>
  );
}

export default App;
