import { createComponent } from "@lit/react";
import { MdIconButton as _MdIconButton } from "@material/web/iconbutton/icon-button.js";
import { MdFilledIconButton as _MdFilledIconButton } from "@material/web/iconbutton/filled-icon-button.js";
import { MdFilledTonalIconButton as _MdFilledTonalIconButton } from "@material/web/iconbutton/filled-tonal-icon-button.js";
import { MdOutlinedIconButton as _MdOutlinedIconButton } from "@material/web/iconbutton/outlined-icon-button.js";
import React from "react";

export const MdIconButton = createComponent({
  tagName: "md-icon-button",
  elementClass: _MdIconButton,
  react: React,
});

export const MdFilledIconButton = createComponent({
  tagName: "md-filled-icon-button",
  elementClass: _MdFilledIconButton,
  react: React,
});

export const MdFilledTonalIconButton = createComponent({
  tagName: "md-filled-tonal-icon-button",
  elementClass: _MdFilledTonalIconButton,
  react: React,
});

export const MdOutlinedIconButton = createComponent({
  tagName: "md-outlined-icon-button",
  elementClass: _MdOutlinedIconButton,
  react: React,
});
