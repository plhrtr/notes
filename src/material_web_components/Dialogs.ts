import { createComponent } from "@lit/react";
import React from "react";
import { MdDialog as _MdDialog } from "@material/web/dialog/dialog.js";

export const MdDialog = createComponent({
  tagName: "md-dialog",
  elementClass: _MdDialog,
  react: React,
});
