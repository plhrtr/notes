import { createComponent } from "@lit/react";
import { MdFilledTextField as _MdFilledTextField } from "@material/web/textfield/filled-text-field.js";
import { MdOutlinedTextField as _MdOutlinedTextField } from "@material/web/textfield/outlined-text-field.js";
import React from "react";

export const MdFilledTextField = createComponent({
  tagName: "md-filled-text-field",
  elementClass: _MdFilledTextField,
  react: React,
});

export const MdOutlinedTextField = createComponent({
  tagName: "md-outlined-text-field",
  elementClass: _MdOutlinedTextField,
  react: React,
});
