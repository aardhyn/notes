import { useTitle } from "route/useTitle";
import { s, styled } from "style/stitches.config";
import { Shortcuts } from "./Shortcuts";
import { useAuth } from "api";
import { capitalize } from "utility";

const WAVE_SIZE = 48;

export default function Home() {
  useTitle("Home");

  const { user } = useAuth();
  const { firstName, lastName } = user?.user_metadata ?? {};

  return (
    <Root>
      <Header>
        <s.hgroup css={{ textAlign: "center" }}>
          <Wave />
          <h1>
            Hi, {capitalize(firstName)} {capitalize(lastName)}
          </h1>
        </s.hgroup>
        <Shortcuts />
      </Header>
    </Root>
  );
}

const Wave = () => (
  <s.span css={{ fontSize: WAVE_SIZE, userSelect: "none" }}>👋</s.span>
);

const Root = styled("main", {
  d: "flex",
  items: "center",
  justify: "center",
  h: "100%",
});

const Header = styled("header", {
  d: "flex",
  gap: 32,
  direction: "column",
  items: "center",
});
