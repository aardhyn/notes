import { signOut } from "api";
import { Button, CloseDialog } from "component";
import { s, styled } from "style/stitches.config";

export function AccountPreferencesSection() {
  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <>
      <CloseDialog>
        <Row>
          <Button onClick={handleSignOut} color="neutral">
            Sign out
          </Button>
          <s.span css={{ color: "$text2" }}>Sign out of this device</s.span>
        </Row>
      </CloseDialog>
    </>
  );
}
const Row = styled("div", {
  d: "flex",
  items: "center",
  gap: 16,
});
