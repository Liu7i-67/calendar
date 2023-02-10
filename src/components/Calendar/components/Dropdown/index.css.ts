/*
 * @Author: liu7i
 * @Date: 2023-02-10 11:12:44
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-10 11:39:20
 */

import { vars } from "../index.css";
import { style } from "@vanilla-extract/css";

export const dropdown = style({
  display: "inline-block",
  position: "relative",
});

export const dropdownContent = style({
  display: "inline-block",
  padding: "4px",
});

export const dropdownMenu = style({
  display: "none",
  padding: "4px",
  background: vars.writeColor,
  boxShadow: "0 0 2px gray",
  borderRadius: "4px",
  width: "max-content",
  position: "absolute",
  top: "100%",
  right: "0",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  selectors: {
    ["&.active"]: {
      display: "flex",
    },
  },
});

export const dropdownMenuItem = style({
  marginBottom: "4px",
  selectors: {
    ["&.last-child"]: {
      marginBottom: 0,
    },
  },
});
