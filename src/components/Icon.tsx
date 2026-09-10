import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";

type IconName =
  | "menu" | "close" | "back" | "arrow" | "home" | "drop"
  | "heart" | "sparkle" | "shield" | "people" | "location"
  | "pulse" | "search" | "chevron-down" | "chevron-up"
  | "check" | "settings" | "info";

const symbols: Record<IconName, string> = {
  menu: "☰",
  close: "×",
  back: "‹",
  arrow: "→",
  home: "⌂",
  drop: "♨",
  heart: "♡",
  sparkle: "✦",
  shield: "♢",
  people: "♧",
  location: "⌖",
  pulse: "⌁",
  search: "⌕",
  "chevron-down": "⌄",
  "chevron-up": "⌃",
  check: "✓",
  settings: "⚙",
  info: "ⓘ",
};

export default function Icon({
  name,
  size = 24,
  color = "#E71936",
  style,
}: {
  name: IconName;
  size?: number;
  color?: string;
  style?: TextStyle;
}) {
  return (
    <Text style={[styles.icon, { fontSize: size, color }, style]}>
      {symbols[name]}
    </Text>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontWeight: "700",
    includeFontPadding: false,
    textAlign: "center",
  },
});
