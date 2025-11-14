import { createComponent } from "@lit/react";
import { MdTabs as _MdTabs } from "@material/web/tabs/tabs.js";
import { MdPrimaryTab as _MdPrimaryTab } from "@material/web/tabs/primary-tab.js";
import { MdSecondaryTab as _MdSecondaryTab } from "@material/web/tabs/secondary-tab.js";
import React from "react";

export const MdTabs = createComponent({
  tagName: "md-tabs",
  elementClass: _MdTabs,
  react: React,
});

export const MdPrimaryTabs = createComponent({
  tagName: "md-primary-tab",
  elementClass: _MdPrimaryTab,
  react: React,
});

export const MdSecondaryTab = createComponent({
  tagName: "md-secondary-tab",
  elementClass: _MdSecondaryTab,
  react: React,
});
