import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  // B. EDIT
  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Settings successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      // reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateSetting };
}
