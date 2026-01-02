import Location from "./Location";
import NoteModel from "./Note";
import { calculateDistance } from "./util/LocationUtil";
import { Observable } from "./util/Observable";

type NoteManagerProperties = {
  notes: NoteModel[];
};

type NoteData = {
  location: GeolocationPosition;
  title: string;
  description: string;
};

export const NodeSorting = {
  ASCENDING: "ASCENDING",
  DESCENDINGk: "DESCENDING",
} as const;
export type NodeSorting = (typeof NodeSorting)[keyof typeof NodeSorting];

export const NodeFilter = {
  NONE: "NONE",
  FIVE_KM: "5KM",
  TEN_KM: "10KM",
  FIFTEEN_KM: "15KM",
} as const;
export type NodeFilter = (typeof NodeFilter)[keyof typeof NodeFilter];

export default class NoteManager extends Observable<NoteManagerProperties> {
  private static NOTE_STORE_NAME = "notes";
  private static instance: NoteManager | null = null;

  public sortingOrder: NodeSorting = NodeSorting.ASCENDING;
  public filter: NodeFilter = NodeFilter.NONE;

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
      this.notes = notesArray.map((data) => {
        const tmp = new NoteModel(data.location, data.title, data.description);
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

  addNote(note: NoteModel) {
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
    this.updateNotes();
  }

  get notes() {
    // when no location available return the unsorted and unfiltered notes
    if (this.location.currentLocation == null) {
      return this._notes;
    }
    const currentLocation = this.location.currentLocation;

    // Filter notes
    const filteredNotes = this._notes.filter((note) => {
      switch (this.filter) {
        case "NONE":
          return true;
        case "15KM":
          return calculateDistance(note.location, currentLocation) < 15000;
        case "10KM":
          return calculateDistance(note.location, currentLocation) < 10000;
        case "5KM":
          return calculateDistance(note.location, currentLocation) < 5000;
        default:
          return true;
      }
    });

    const sortedNotes = filteredNotes.sort((a, b) => {
      const distanceA = calculateDistance(a.location, currentLocation);
      const distanceB = calculateDistance(b.location, currentLocation);

      switch (this.sortingOrder) {
        case "ASCENDING":
          return distanceA - distanceB;
        case "DESCENDING":
          return distanceB - distanceA;
        default:
          return 0;
      }
    });

    return sortedNotes;
  }
  set notes(notes: NoteModel[]) {
    this._notes = notes;
    this.updateNotes();
  }
}
