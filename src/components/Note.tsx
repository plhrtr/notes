import NoteModel from "@model/Note";

export default function Note({ note }: { note: NoteModel }) {
  return <div>{note.title}</div>;
}
