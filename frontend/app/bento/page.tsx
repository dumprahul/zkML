"use client";

import { LineShadowText } from "../../components/magicui/line-shadow-text";
import { useTheme } from "next-themes";

export default function LineShadowTextDemo() {
  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";
  return (
    <h1 className="text-balance text-5xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
      zugging
      <LineShadowText className="italic" shadowColor={shadowColor}>
        Face.
      </LineShadowText>
    </h1>
  );
}
