import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      toast.success(`Welcome ${data.user.email}`);
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error("Provided email and password are incorrect");
    },
  });

  return { login, isLoading };
}
