import { signIn } from "api/user";
import { SignInData, SignInForm } from "component/SignInForm";
import { UnknownError } from "exception/error";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "style/stitches.config";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();
  const handleSubmit = async ({ email, password }: SignInData) => {
    try {
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
        onSubmit={handleSubmit}
        otherFormUrl="/sign-up"
        loading={loading}
        onLoadingChange={setLoading}
        error={error}
        onErrorChange={setError}
      />
    </Root>
  );
}

const Root = styled("main", {});
