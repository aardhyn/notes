import { ReactNode } from "react";
import { s, CSS } from "style/stitches.config";

/**
 * Render children when selector matches
 * @param selector css selector to match
 * @param children children to render
 * @param fallback fallback to render when selector does not match
 */
export function When({
  selector,
  children,
  css,
  fallback,
}: {
  selector: string | boolean;
  children: ReactNode;
  css?: CSS;
  fallback?: ReactNode;
}) {
  if (typeof selector === "boolean") {
    return <s.div css={css}>{selector ? children : fallback}</s.div>;
  }

  return (
    <>
      <s.div
        css={{
          d: "none",
          [selector]: {
            d: "block",
            ...css,
          },
        }}
      >
        {children}
      </s.div>
      {fallback && (
        <s.div
          css={{
            d: "block",
            ...css,
            [selector]: { d: "none" },
          }}
        >
          {fallback}
        </s.div>
      )}
    </>
  );
}
