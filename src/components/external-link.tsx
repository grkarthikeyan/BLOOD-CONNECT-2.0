import React from "react";
import {
  Linking,
  Platform,
  StyleProp,
  TextStyle,
} from "react-native";

type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
};

export function ExternalLink({
  href,
  children,
  style,
}: ExternalLinkProps) {
  const handlePress = async () => {
    try {
      await Linking.openURL(href);
    } catch (error) {
      console.log("Unable to open link:", error);
    }
  };

  return (
    <TextLink
      onPress={handlePress}
      style={style}
    >
      {children}
    </TextLink>
  );
}

type TextLinkProps = {
  children: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<TextStyle>;
};

function TextLink({
  children,
  onPress,
  style,
}: TextLinkProps) {
  const isWeb = Platform.OS === "web";

  return (
    <span
      onClick={isWeb ? onPress : undefined}
      style={
        isWeb
          ? {
              cursor: "pointer",
              textDecoration: "underline",
            }
          : undefined
      }
    >
      {isWeb ? (
        <span style={style as React.CSSProperties}>
          {children}
        </span>
      ) : (
        children
      )}
    </span>
  );
}