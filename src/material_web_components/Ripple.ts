import { createComponent } from "@lit/react";
import { MdRipple as _MdRipple } from "@material/web/ripple/ripple.js";
import React from "react";

export const MdRipple = createComponent({
  tagName: "md-ripple",
  elementClass: _MdRipple,
  react: React,
});
