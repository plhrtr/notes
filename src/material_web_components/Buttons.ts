import { createComponent } from "@lit/react";
import React from "react";
import { MdElevatedButton as _MdElevatedButton } from "@material/web/button/elevated-button.js";
import { MdFilledButton as _MdFilledButton } from "@material/web/button/filled-button.js";
import { MdFilledTonalButton as _MdFilledTonalButton } from "@material/web/button/filled-tonal-button.js";
import { MdOutlinedButton as _MdOutlinedButton } from "@material/web/button/outlined-button.js";
import { MdTextButton as _MdTextButton } from "@material/web/button/text-button.js";

export const MdElevatedButton = createComponent({
  tagName: "md-elevated-button",
  elementClass: _MdElevatedButton,
  react: React,
});

export const MdFilledButton = createComponent({
  tagName: "md-filled-button",
  elementClass: _MdFilledButton,
  react: React,
});

export const MdFilledTonalButton = createComponent({
  tagName: "md-filled-tonal-button",
  elementClass: _MdFilledTonalButton,
  react: React,
});

export const MdOutlinedButton = createComponent({
  tagName: "md-outlined-button",
  elementClass: _MdOutlinedButton,
  react: React,
});

export const MdTextButton = createComponent({
  tagName: "md-text-button",
  elementClass: _MdTextButton,
  react: React,
});
