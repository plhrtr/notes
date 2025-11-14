import { createComponent } from "@lit/react";
import React from "react";
import { MdAssistChip as _MdAssistChip } from "@material/web/chips/assist-chip.js";
import { MdFilterChip as _MdFilterChip } from "@material/web/chips/filter-chip.js";
import { MdInputChip as _MdInputChip } from "@material/web/chips/input-chip.js";
import { MdSuggestionChip as _MdSuggestionChip } from "@material/web/chips/suggestion-chip.js";

export const MdAssistChip = createComponent({
  tagName: "md-assist-chip",
  elementClass: _MdAssistChip,
  react: React,
});

export const MdFilterChip = createComponent({
  tagName: "md-filter-chip",
  elementClass: _MdFilterChip,
  react: React,
});

export const MdInputChip = createComponent({
  tagName: "md-input-chip",
  elementClass: _MdInputChip,
  react: React,
});

export const MdSuggestionChip = createComponent({
  tagName: "md-suggestion-chip",
  elementClass: _MdSuggestionChip,
  react: React,
});
