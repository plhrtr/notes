import {
  MdFilledTonalButton,
  MdTextButton,
} from "@material_web_componponents/Buttons";
import { MdDialog } from "@material_web_componponents/Dialogs";
import { MdFab } from "@material_web_componponents/Fab";
import { MdIcon } from "@material_web_componponents/Icon";

export default function AddNoteButton() {
  const closeDialog = () => {
    const dialog = document.getElementById(
      "add-note-dialog",
    ) as HTMLDialogElement | null;
    dialog?.close();
  };

  const openDialog = () => {
    const dialog = document.getElementById(
      "add-note-dialog",
    ) as HTMLDialogElement | null;
    dialog!.open = true;
  };
  return (
    <>
      <MdDialog id="add-note-dialog">
        <div slot="headline">Add new note</div>
        <form slot="content" id="form-id" method="dialog">
          Create dialog
        </form>
        <div slot="actions">
          <MdTextButton onClick={closeDialog}>Create</MdTextButton>
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
