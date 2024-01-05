import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { s, CSS } from "style/stitches.config";

type WhenProps = {
  selector: `${string} &` | boolean;
  children?: ReactNode;
  css?: CSS;
  fallback?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

/**
 * Render children when selector matches
 * @param selector css selector to match
 * @param children children to render
 * @param fallback fallback to render when selector does not match
 */
export const When = forwardRef<HTMLDivElement, WhenProps>(
  ({ selector, children, css, fallback }, ref) => {
    if (typeof selector === "boolean") {
      return (
        <s.div ref={ref} css={css}>
          {selector ? children : fallback}
        </s.div>
      );
    }

    return (
      <>
        <s.div
          ref={ref}
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
            ref={ref}
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
);
