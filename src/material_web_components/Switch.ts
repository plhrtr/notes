import { createComponent } from "@lit/react";
import { MdSwitch as _MdSwitch } from "@material/web/switch/switch.js";
import React from "react";

export const MdSwitch = createComponent({
  tagName: "md-switch",
  elementClass: _MdSwitch,
  react: React,
});
