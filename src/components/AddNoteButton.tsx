import {
  MdFilledTonalButton,
  MdTextButton,
} from "@material_web_componponents/Buttons";
import { MdDialog } from "@material_web_componponents/Dialogs";
import { MdFab } from "@material_web_componponents/Fab";
import { MdIcon } from "@material_web_componponents/Icon";
import { MdOutlinedTextField } from "@material_web_componponents/TextField";
import Location from "@model/Location";
import NoteModel from "@model/NoteModel";
import NoteManager from "@model/NoteManager";
import { useRef, useState } from "react";

export default function AddNoteButton() {
  const location = Location.getInstance();
  const noteManager = NoteManager.getInstance();

  const dialogRef = useRef<any>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState(false);

  const closeDialog = () => {
    dialogRef.current?.close();
    setTitle("");
    setDescription("");
    setTitleError(false);
  };

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.open = true;
    }
  };

  const handleCreate = () => {
    if (!title.trim()) {
      setTitleError(true);
      return;
    }
    noteManager.addNote(
      new NoteModel(
        location.currentLocation ?? new GeolocationPosition(),
        title,
        description,
      ),
    );

    closeDialog();
  };

  return (
    <>
      <MdDialog id="add-note-dialog" ref={dialogRef}>
        <div slot="headline">Add new note</div>
        <form
          slot="content"
          id="add-note-form"
          method="dialog"
          className="w-full flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate();
          }}
        >
          <MdOutlinedTextField
            label="Title"
            value={title}
            onInput={(e) => {
              setTitle((e.target as HTMLInputElement).value);
              setTitleError(false);
            }}
            error={titleError}
            error-text={titleError ? "The title is required" : ""}
            required
          />
          <MdOutlinedTextField
            label="Description"
            value={description}
            onInput={(e) =>
              setDescription((e.target as HTMLInputElement).value)
            }
          />
        </form>
        <div slot="actions">
          <MdTextButton onClick={handleCreate}>Create</MdTextButton>
          <MdFilledTonalButton onClick={closeDialog} autoFocus>
            Cancel
          </MdFilledTonalButton>
        </div>
      </MdDialog>
      <MdFab
        variant="primary"
        className="fixed bottom-8 right-8"
        onClick={openDialog}
      >
        <MdIcon slot="icon">Add_2</MdIcon>
      </MdFab>
    </>
  );
}
