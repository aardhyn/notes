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

  return (
    <Root onSubmit={handleSubmit} {...props}>
      <h1>{newUser ? "Sign Up" : "Sign In"}</h1>
      {newUser && (
        <>
          <Label>
            <span>First Name</span>
            <input
              type="text"
              name="name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Label>
          <Label>
            <span>Last Name</span>
            <input
              type="text"
              name="name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Label>
          <Label>
            <span>Username</span>
            <input
              type="text"
              name="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Label>
        </>
      )}
      <Label>
        <span>Email</span>
        <input
          type="email"
          name="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Label>
      <Label>
        <span>Password</span>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Label>
      {error && <s.p css={{ bg: "$error" }}>{error.message}</s.p>}
      <button disabled={loading} type="submit">
        {newUser ? "Sign Up" : "Sign in"}
      </button>
      {otherFormUrl && (
        <Link to={otherFormUrl}>
          {newUser ? "already have an account" : "I don't have an account"}
        </Link>
      )}
    </Root>
  );
}

const Root = styled("form", {
  d: "flex",
  direction: "column",
  gap: 16,
  padding: 16,
  items: "flex-start",
});

const Label = styled("label", {
  d: "flex",
  direction: "column",
  gap: 4,
  maxWidth: 400,
});
