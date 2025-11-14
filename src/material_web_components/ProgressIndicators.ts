import { createComponent } from "@lit/react";
import { MdCircularProgress as _MdCircularProgress } from "@material/web/progress/circular-progress.js";
import { MdLinearProgress as _MdLinearProgress } from "@material/web/progress/linear-progress.js";
import React from "react";

export const MdCircularProgress = createComponent({
  tagName: "md-circular-progress",
  elementClass: _MdCircularProgress,
  react: React,
});

export const MdLinearProgress = createComponent({
  tagName: "md-linear-progress",
  elementClass: _MdLinearProgress,
  react: React,
});
