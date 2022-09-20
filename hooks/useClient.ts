import { useSelector } from "react-redux";
import { useUserByUsernameQuery } from "../redux/api/mambaApi";
import { RootState } from "../redux/store";


export default function useClient() {
    const credentials = useSelector((state: RootState) => state.loginCredentials);
    return useUserByUsernameQuery(credentials.username);
}
