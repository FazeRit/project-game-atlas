import { useMutation } from "@tanstack/react-query"
import { deleteUserApi } from "../../api"
import { toast } from "react-toastify"
import { useUserStore } from "@/entities"

export const useDeleteUser = () => {
    const logout = useUserStore(state => state.logout);

    return useMutation({
        mutationKey: ['delete-user'],
        mutationFn: () => deleteUserApi(),
        onSuccess: () => {
            toast.success('User deleted successfully');

            logout();
        },
        onError: () => {
            toast.error('Deleting user failed')
        }
    })
}