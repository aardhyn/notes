import { Button } from "component/ui/Button";
import Field from "component/ui/Field";
import Spacer from "component/ui/Spacer";
import { useState } from "react";
import { Link } from "react-router-dom";
import { s, styled } from "style/stitches.config";

export type SignInData = {
  email: string;
  password: string;
};

export type SignUpData = {
  firstName?: string;
  lastName?: string;
  username?: string;
} & SignInData;

export function SignInForm({
  onSubmit,
  newUser,
  otherFormUrl,
  loading,
  onLoadingChange,
  error,
  onErrorChange,
  ...props
}: {
  newUser?: boolean;
  loading?: boolean;
  onLoadingChange?: (loading: boolean) => void;
  error?: Error | null;
  onErrorChange?: (error: Error | null) => void;
  otherFormUrl?: string;
  onSubmit: (data: SignInData | SignUpData) => void;
}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLoadingChange?.(true);
    onErrorChange?.(null);
    onSubmit({ username, email, password, firstName, lastName });
  };

  const action = newUser ? "Sign Up" : "Sign In";

  return (
    <Root onSubmit={handleSubmit} {...props}>
      <Head>
        <h1>{action}</h1>
      </Head>
      <Main>
        {newUser && (
          <>
            <TwoColumn>
              <Label>
                <span>First Name</span>
                <Field
                  type="text"
                  name="name"
                  value={firstName}
                  onValueChange={setFirstName}
                />
              </Label>
              <Label>
                <span>Last Name</span>
                <Field
                  type="text"
                  name="name"
                  value={lastName}
                  onValueChange={setLastName}
                />
              </Label>
            </TwoColumn>
            <Label>
              <span>Username</span>
              <Field
                type="text"
                name="name"
                value={username}
                onValueChange={setUsername}
              />
            </Label>
          </>
        )}
        <Label>
          <span>Email</span>
          <Field
            type="email"
            name="username"
            value={email}
            onValueChange={setEmail}
          />
        </Label>
        <Label>
          <span>Password</span>
          <Field
            type="password"
            name="password"
            value={password}
            onValueChange={setPassword}
          />
        </Label>
      </Main>

      {error && <s.p css={{ bg: "$error" }}>{error.message}</s.p>}

      <Foot>
        <Button disabled={loading} type="submit">
          {action}
        </Button>
        {otherFormUrl && (
          <OtherForm to={otherFormUrl}>
            {newUser ? "I already have an account" : "I don't have an account"}
          </OtherForm>
        )}
      </Foot>
    </Root>
  );
}

const Root = styled(s.form, {
  minW: 512,
  d: "flex",
  direction: "column",
  gap: 32,
  padding: "32px 24px",
  background: "$background2",
  r: 16,
});
const TwoColumn = styled(s.div, {
  d: "grid",
  gap: 24,
  gridTemplateColumns: "1fr 1fr",
});
const Label = styled(s.label, {
  d: "flex",
  direction: "column",
  gap: 4,
});
const Foot = styled(s.div, {
  d: "flex",
  direction: "column",
  gap: 16,
});
const Main = styled(s.div, {
  d: "flex",
  direction: "column",
  gap: 16,
});
const Head = styled(s.header, {
  d: "flex",
  justify: "center",
  items: "center",
});
const OtherForm = styled(Link, {
  c: "$primary",
  textAlign: "center",
  "&:hover": { textDecoration: "underline" },
});
