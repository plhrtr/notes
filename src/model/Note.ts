import { Observable } from "./util/Observable";

type NoteSignals = "note-updated";

type NoteProperties = {
  location: GeolocationPosition;
  title: string;
  description: string;
};

/**
 * Represents a single note the user took.
 */
export default class NoteModel extends Observable<NoteProperties, NoteSignals> {
  private _location;
  private _title;
  private _description;

  constructor(
    location: GeolocationPosition,
    title: string,
    description: string,
  ) {
    super();
    this._location = location;
    this._title = title;
    this._description = description;
  }

  toJson() {
    return JSON.stringify({
      location: this.location,
      title: this.title,
      description: this.description,
    });
  }

  get location() {
    return this._location;
  }

  get title() {
    return this._title;
  }

  set title(title: string) {
    this._title = title;
    this.notify("note-updated");
  }

  get description() {
    return this._description;
  }

  set description(description: string) {
    this._description = description;
    this.notify("note-updated");
  }
}
