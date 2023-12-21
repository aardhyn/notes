import { signIn, signUp } from "api/user";
import { SignInForm, SignUpData } from "component/SignInForm";
import { UnknownError } from "exception/error";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "style/stitches.config";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async ({
    email,
    password,
    firstName,
    lastName,
    username,
  }: SignUpData) => {
    try {
      await signUp(email, password, { firstName, lastName, username });
      await signIn(email, password);
      navigate("/");
    } catch (error) {
      setError(error instanceof Error ? error : new UnknownError());
    } finally {
      setLoading(false);
    }
  };

  return (
    <Root>
      <SignInForm
        newUser
        onSubmit={handleSubmit}
        otherFormUrl="/sign-in"
        loading={loading}
        onLoadingChange={setLoading}
        error={error}
        onErrorChange={setError}
      />
    </Root>
  );
}

const Root = styled("main", {
  d: "flex",
  h: "100%",
  justify: "center",
  items: "center",
});
