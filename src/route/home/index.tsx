import { s, styled } from "style/stitches.config";

export default function Home() {
  return (
    <Root>
      <s.div css={{ d: "flex", gap: 8, direction: "column", items: "center" }}>
        <s.span css={{ fontSize: 48 }}>👋</s.span>
        <h1>Hi there!</h1>
        <pre>Create a new note to get started</pre>
      </s.div>
    </Root>
  );
}

const Root = styled("div", {
  d: "flex",
  items: "center",
  justify: "center",
});
