import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ComponentProps, ReactNode } from "react";
import { CSS, styled } from "style/stitches.config";
import { IconButton } from ".";
import { VariantProps } from "@stitches/react";

type DialogProps = {
  trigger: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  css?: CSS;
  onClose?: () => void;
} & ComponentProps<typeof DialogPrimitive.Root> &
  VariantProps<typeof Content>;

export function Dialog({
  trigger,
  title,
  description,
  children,
  footer,
  css,
  size,
  onClose: handleClose,
  ...dialogProps
}: DialogProps) {
  return (
    <Root {...dialogProps}>
      <Trigger asChild>{trigger}</Trigger>
      <Overlay>
        <Content size={size} css={css}>
          <Head>
            <Title>
              <h1>{title}</h1>
            </Title>
            <CloseDialog asChild>
              <IconButton onClick={handleClose}>
                <Cross2Icon />
              </IconButton>
            </CloseDialog>
            {description && <Description>{description}</Description>}
          </Head>
          <Body>{children}</Body>
          {footer && <Footer>{footer}</Footer>}
        </Content>
      </Overlay>
    </Root>
  );
}
const Root = styled(DialogPrimitive.Root);
const Trigger = styled(DialogPrimitive.Trigger);

export const CloseDialog = styled(DialogPrimitive.Close);

const Description = styled(DialogPrimitive.Description, {
  color: "$text2",
});

const Title = styled(DialogPrimitive.Title);

const Overlay = styled(DialogPrimitive.Overlay, {
  pos: "fixed",
  d: "flex",
  items: "center",
  justify: "center",
  z: 256,
  inset: 0,
});

const Content = styled(DialogPrimitive.Content, {
  bg: "$background2",
  b: "1px solid $outline",
  r: 8,
  pos: "fixed",
  p: 16,
  "&:focus": { outline: "none" },

  d: "flex",
  direction: "column",
  gap: 24,

  maxW: "90vw",
  maxH: "90vh",

  variants: {
    size: {
      full: { w: "100%" },
      large: { w: 1024 },
      medium: { w: 512 },
      small: { w: 256 },
    },
  },

  defaultVariants: {
    size: "medium",
  },
});

const Head = styled("section", {
  d: "grid",
  gridTemplateColumns: "1fr auto",
  gap: 12, // distributes the description and body a little better than 16px visually
  items: "center",
});

const Body = styled("section", {});

const Footer = styled("section", {
  d: "flex",
  gap: 8,
  justify: "flex-end",
});
