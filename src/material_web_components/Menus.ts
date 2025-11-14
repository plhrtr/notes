import { createComponent } from "@lit/react";
import { MdMenu as _MdMenu } from "@material/web/menu/menu.js";
import React from "react";

export const MdMenu = createComponent({
  tagName: "md-menu",
  elementClass: _MdMenu,
  react: React,
});
