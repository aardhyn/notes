import { VariantProps } from "@stitches/react";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, LinkProps } from "react-router-dom";
import { s, styled, CSS } from "style/stitches.config";

type ButtonProps = {
  css?: CSS;
} & VariantProps<typeof ButtonRoot> &
  ButtonHTMLAttributes<HTMLButtonElement>;

type TextButtonProps = {
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
} & ButtonProps;

export function Button({
  children,
  leadingIcon,
  trailingIcon,
  ...buttonProps
}: TextButtonProps) {
  return (
    <ButtonRoot {...buttonProps}>
      {leadingIcon && leadingIcon}
      <s.span css={{ d: "inline-flex", items: "center" }}>{children}</s.span>
      {trailingIcon && trailingIcon}
    </ButtonRoot>
  );
}

export function IconButton({ children, ...buttonProps }: ButtonProps) {
  return <IconButtonRoot {...buttonProps}>{children}</IconButtonRoot>;
}

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

const colorVariants = {
  color: {
    primary: {
      bg: "$primary",
      c: "$onPrimary",
      "&:hover": { background: "$primary2" },
    },
    transparent: {
      bg: "transparent",
      c: "$primary",
      "&:hover": { background: "$primary2" },
    },
    neutral: {
      bg: "$background3",
      c: "$text",
      "&:hover": { background: "$background4" },
    },
    error: {
      bg: "$error",
      c: "$onError",
      "&:hover": { background: "$error2" },
    },
    warning: {
      bg: "$warning",
      c: "$onWarning",
      "&:hover": { background: "$warning2" },
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

  "&:disabled, &:readonly": { opacity: 0.5 },

  variants: {
    size: {
      small: { p: "2px 8px", fontSize: 12 },
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

  // "&:hover": { background: "$background4" },
  "&:disabled": { opacity: 0.5 },
  "&:readonly": { opacity: 0.5 },

  variants: {
    size: {
      small: { h: 24, w: 24, r: 4 },
      medium: { h: 32, w: 32, r: 8 },
      large: { h: 48, w: 48, r: 8 },
    },
    expand: {
      true: { flex: 1 },
    },
    // ...colorVariants,
  },

  defaultVariants: {
    size: "small",
    // color: "neutral",
  },
});
