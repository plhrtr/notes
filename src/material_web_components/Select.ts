import { createComponent } from "@lit/react";
import { MdFilledSelect as _MdFilledSelect } from "@material/web/select/filled-select.js";
import { MdOutlinedSelect as _MdOutlinedSelect } from "@material/web/select/outlined-select.js";
import { MdSelectOption as _MdSelectOption } from "@material/web/select/select-option.js";
import React from "react";

export const MdFilledSelect = createComponent({
  tagName: "md-filled-select",
  elementClass: _MdFilledSelect,
  react: React,
});

export const MdOutlinedSelect = createComponent({
  tagName: "md-outlined-select",
  elementClass: _MdOutlinedSelect,
  react: React,
});

export const MdSelectOption = createComponent({
  tagName: "md-select-option",
  elementClass: _MdSelectOption,
  react: React,
});
