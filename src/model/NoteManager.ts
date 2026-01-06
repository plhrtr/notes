import Location from "./Location";
import NoteModel from "./NoteModel";
import { calculateDistance } from "./util/LocationUtil";
import { Observable } from "./util/Observable";

type NoteManagerProperties = {
  notes: NoteModel[];
};

type NoteData = {
  location: GeolocationPosition;
  title: string;
  description: string;
  id: number;
};

export const NoteFilter = {
  NONE: "NONE",
  FIVE_KM: "5KM",
  TEN_KM: "10KM",
  FIFTEEN_KM: "15KM",
} as const;
export type NoteFilter = (typeof NoteFilter)[keyof typeof NoteFilter];

/**
 * Class that internally manages the notes of the user
 * Is a singleton class
 */
export default class NoteManager extends Observable<NoteManagerProperties> {
  private static NOTE_STORE_NAME = "notes";
  private static instance: NoteManager | null = null;

  private _notes: NoteModel[] = [];
  private location = Location.getInstance();

  constructor() {
    super();
    this.loadNotes();
  }

  public static getInstance(): NoteManager {
    if (!NoteManager.instance) {
      NoteManager.instance = new NoteManager();
    }
    return NoteManager.instance;
  }

  private loadNotes() {
    const notesString = window.localStorage.getItem(
      NoteManager.NOTE_STORE_NAME,
    );

    if (notesString) {
      const notesArray: NoteData[] = JSON.parse(notesString);
      this._notes = notesArray.map((data) => {
        const tmp = new NoteModel(
          data.location,
          data.title,
          data.description,
          data.id,
        );
        tmp.connect("note-updated", () => {
          this.saveNotes();
        });
        return tmp;
      });
      JSON.parse(notesString);
    }
  }

  private saveNotes() {
    window.localStorage.setItem(
      NoteManager.NOTE_STORE_NAME,
      JSON.stringify(
        this._notes.map((note) => {
          return {
            location: note.location,
            title: note.title,
            description: note.description,
            id: note.id,
          };
        }),
      ),
    );
  }

  /**
   * Adds a note to manager
   */
  addNote(note: NoteModel) {
    note.connect("note-updated", () => {
      this.saveNotes();
    });
    this._notes.push(note);
    this.notes = this._notes;

    this.saveNotes();
  }

  /**
   * Removes the note specified by the id
   */
  removeNote(id: number) {
    this._notes = this.notes.filter((note) => {
      return note.id !== id;
    });
    this.notes = this._notes;
    this.saveNotes();
  }

  get notes() {
    const position = this.location.currentLocation;

    if (position == null) {
      return this._notes;
    }
    return this._notes.sort(
      (a, b) =>
        calculateDistance(position, a.location) -
        calculateDistance(position, b.location),
    );
  }

  private set notes(notes: NoteModel[]) {
    this._notes = notes;
    this.saveNotes();
  }
}
