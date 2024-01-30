import { Dialog } from "component";
import { ReactNode } from "react";
import { useUserPreferences } from "./preferences";
import { ShortcutPreferences } from "./types";
import { styled } from "style/stitches.config";
import { capitalize } from "../../utility/string";
import { ShortcutPreferencesSection } from "./shortcuts";
import { AccountPreferencesSection } from "./account";
import { getYear } from "utility";

export function PreferencesDialog({ children }: { children?: ReactNode }) {
  const { preferences } = useUserPreferences();
  return (
    <Dialog
      size="large"
      trigger={children}
      title="Preferences"
      description="User preferences across all devices"
    >
      <PreferencesRoot>
        {Object.entries(preferences).map(([name, preferences]) => {
          return (
            <PreferencesSection key={name}>
              <PreferencesHeading>{capitalize(name)}</PreferencesHeading>
              {name === "shortcuts" && (
                <ShortcutPreferencesSection
                  preferences={preferences as ShortcutPreferences}
                />
              )}
              {/* Add more sections... */}
            </PreferencesSection>
          );
        })}
        <PreferencesSection>
          <PreferencesHeading>Account</PreferencesHeading>
          <AccountPreferencesSection />
        </PreferencesSection>
        <Copyright />
      </PreferencesRoot>
    </Dialog>
  );
}
const PreferencesRoot = styled("div", {
  d: "flex",
  gap: 24,
  direction: "column",
});
const PreferencesSection = styled("section", {
  d: "flex",
  gap: 16,
  direction: "column",
});
const PreferencesHeading = styled("h2");

const PERSONAL_WEBSITE = "https://aardhyn.dev";
function Copyright() {
  return (
    <CopyrightRoot>
      <Anchor href={PERSONAL_WEBSITE}>Aardhyn Lavender</Anchor> {getYear()}
    </CopyrightRoot>
  );
}
const CopyrightRoot = styled("p", { c: "$text4" });
const Anchor = styled("a", {
  textDecoration: "underline",
  "&:hover": { c: "$primary" },
});
