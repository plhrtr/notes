import Note from "./Note";
import { Observable } from "./util/Observable";

type NoteManagerProperties = {
  notes: Note[];
};

type NoteData = {
  location: GeolocationPosition;
  title: string;
  description: string;
};

export default class NoteManager extends Observable<NoteManagerProperties> {
  private static NOTE_STORE_NAME = "notes";

  private _notes: Note[] = [];

  constructor() {
    super();
    this.loadNotes();
  }

  private loadNotes() {
    const notesString = window.localStorage.getItem(
      NoteManager.NOTE_STORE_NAME,
    );

    if (notesString) {
      const notesArray: NoteData[] = JSON.parse(notesString);
      this.notes = notesArray.map((data) => {
        const tmp = new Note(data.location, data.title, data.description);
        tmp.connect("note-updated", () => {
          this.updateNotes();
        });
        return tmp;
      });
      JSON.parse(notesString);
    }
  }

  private updateNotes() {
    window.localStorage.setItem(
      NoteManager.NOTE_STORE_NAME,
      JSON.stringify(
        this._notes.map((note) => {
          return {
            location: note.location,
            title: note.title,
            description: note.description,
          };
        }),
      ),
    );
  }

  addNote(note: Note) {
    note.connect("note-updated", () => {
      this.updateNotes();
    });
    this.notes = [...this.notes, note];

    this.updateNotes();
  }

  removeNote(index: number) {
    this.notes = this.notes.filter((_, idx) => {
      return idx !== index;
    });
  }

  get notes() {
    return this._notes;
  }

  set notes(notes: Note[]) {
    this._notes = notes;
    this.updateNotes();
  }
}
