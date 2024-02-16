import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signupApi({ fullName, email, password }),
    onSuccess: () => {
      toast.success(
        "User successfully added! Please verify the new account from user's email address"
      );
    },
    onError: (err) => toast.error(err.message),
  });

  return { signup, isLoading };
}
