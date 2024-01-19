import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { s, CSS } from "style/stitches.config";

type WhenProps = {
  condition: `${string} &` | `&${string}` | boolean;
  children?: ReactNode | JSX.Element;
  css?: CSS;
  fallback?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

/**
 * Render children when selector matches
 * @param condition css selector to match or boolean expression
 * @param children children to render
 * @param fallback fallback to render when selector does not match
 */
export const When = forwardRef<HTMLDivElement, WhenProps>(
  ({ condition, children, css, fallback }, ref) => {
    if (typeof condition === "boolean") {
      return (
        <s.div ref={ref} css={css}>
          {condition ? children : fallback}
        </s.div>
      );
    }

    return (
      <>
        <s.div
          ref={ref}
          css={{
            d: "none",
            [condition]: {
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
              [condition]: { d: "none" },
            }}
          >
            {fallback}
          </s.div>
        )}
      </>
    );
  }
);
