import { createComponent } from "@lit/react";
import React from "react";
import { MdCheckbox as _MdCheckbox } from "@material/web/checkbox/checkbox.js";

export const MdCheckbox = createComponent({
  tagName: "md-checkbox",
  elementClass: _MdCheckbox,
  react: React,
});
