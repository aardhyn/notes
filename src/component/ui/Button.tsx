import { VariantProps } from "@stitches/react";
import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import { Link, LinkProps } from "react-router-dom";
import { s, styled, CSS } from "style/stitches.config";

type ButtonProps<C extends typeof ButtonRoot | typeof IconButtonRoot> = {
  css?: CSS;
} & VariantProps<C> &
  ButtonHTMLAttributes<HTMLButtonElement>;
type IconProps = {
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
};
type TextButtonProps = IconProps & ButtonProps<typeof ButtonRoot>;

/**
 * A button with text content
 * @param children content of the button
 * @param leadingIcon icon to display before the content
 * @param trailingIcon icon to display after the content
 * @returns
 */
export const Button = forwardRef<HTMLButtonElement, TextButtonProps>(
  ({ children, leadingIcon, trailingIcon, ...buttonProps }, ref) => {
    return (
      <ButtonRoot ref={ref} {...buttonProps}>
        {leadingIcon && leadingIcon}
        <s.span css={{ d: "inline-flex", items: "center" }}>{children}</s.span>
        {trailingIcon && trailingIcon}
      </ButtonRoot>
    );
  }
);

type IconButtonProps = Omit<
  ButtonProps<typeof IconButtonRoot>,
  keyof IconProps
>;
/**
 * A button with an icon
 * @param children content of the button
 * @returns
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, ...buttonProps }, ref) => {
    return (
      <IconButtonRoot ref={ref} {...buttonProps}>
        {children}
      </IconButtonRoot>
    );
  }
);

export function ButtonLink({
  children,
  leadingIcon,
  trailingIcon,
  ...buttonProps
}: TextButtonProps & LinkProps) {
  return (
    <ButtonRoot as={Link} {...buttonProps}>
      {leadingIcon && leadingIcon}
      {children}
      {trailingIcon && trailingIcon}
    </ButtonRoot>
  );
}

export function IconButtonLink({
  children,
  ...buttonProps
}: IconButtonProps & LinkProps) {
  return (
    <IconButtonRoot as={Link} {...buttonProps}>
      {children}
    </IconButtonRoot>
  );
}

const colorVariants = {
  color: {
    primary: {
      bg: "$primary",
      c: "$onPrimary",
      "&:hover:not(:disabled)": { background: "$primary2" },
    },
    transparent: {
      bg: "transparent",
      c: "$text3",
      "&:hover:not(:disabled)": { c: "$onPrimaryTonal" },
    },
    neutral: {
      bg: "$background3",
      c: "$text",
      "&:hover:not(:disabled)": { background: "$background4" },
    },
    error: {
      bg: "$error",
      c: "$onError",
      "&:hover:not(:disabled)": { background: "$error2" },
    },
    warning: {
      bg: "$warning",
      c: "$onWarning",
      "&:hover:not(:disabled)": { background: "$warning2" },
    },
  },
} as const;

const ButtonRoot = styled(s.button, {
  all: "unset",
  fontFamily: "inherit",
  d: "inline-flex",
  gap: 8,
  h: 28,
  color: "inherit",
  items: "center",
  justify: "center",
  cursor: "pointer",
  userSelect: "none",
  r: 8,

  "&:disabled": { opacity: 0.5, cursor: "auto" },
  "&:readonly": { opacity: 0.5 },

  variants: {
    size: {
      small: { p: "2px 8px", fontSize: 11 },
      medium: { p: "4px 16px", fontSize: 14 },
      large: { p: "8px 32px", fontSize: 24 },
    },
    expand: {
      true: { flex: 1 },
    },
    ...colorVariants,
  },

  defaultVariants: {
    color: "primary",
    size: "medium",
    expand: false,
  },
});

const IconButtonRoot = styled(s.button, {
  all: "unset",
  d: "inline-flex",
  items: "center",
  justify: "center",
  cursor: "pointer",

  "&:disabled": { opacity: 0.5 },
  "&:readonly": { opacity: 0.5 },

  variants: {
    size: {
      small: { h: 24, w: 24, r: 4 },
      medium: { h: 32, w: 32, r: 8 },
      large: { h: 48, w: 48, r: 8 },
    },
    variant: {
      stealth: {
        "&:hover": { background: "transparent" },
      },
      plain: {
        "&:hover": { background: "$background3" },
      },
    },
    expand: {
      true: { flex: 1 },
    },
    // ...colorVariants,
  },

  defaultVariants: {
    size: "medium",
    variant: "plain",
  },
});
