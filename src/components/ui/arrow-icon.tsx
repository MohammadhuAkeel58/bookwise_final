import React from "react";

/*  ArrowIcon — the one arrow the site uses.
 *
 *  A small arrow set inside a hairline circle, so a call to action reads
 *  as a deliberate target rather than a text glyph. Replaces the raw "→"
 *  character (which rendered differently on every font stack) and the
 *  stock square chevron the service cards used.
 *
 *  Inherits colour via currentColor. Size it from CSS by setting `width`
 *  on the svg and letting the height follow.
 */
export function ArrowIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 28 28"
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <circle cx="14" cy="14" r="13.25" strokeWidth="1" />
      <path d="M9 14h9.5M14.75 10.25 18.5 14l-3.75 3.75" strokeWidth="1.15" />
    </svg>
  );
}
