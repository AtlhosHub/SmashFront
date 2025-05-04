import { useNavigation } from "react-router-dom";

const navigate = useNavigation();

export const logoutFunction = () => {
    sessionStorage.clear();
    navigate("/");
}