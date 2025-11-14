import { createComponent } from "@lit/react";
import { MdSlider as _MdSlider } from "@material/web/slider/slider.js";
import React from "react";

export const MdSlider = createComponent({
  tagName: "md-slider",
  elementClass: _MdSlider,
  react: React,
});
