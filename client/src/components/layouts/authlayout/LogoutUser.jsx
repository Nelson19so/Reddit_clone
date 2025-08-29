import { useEffect } from "react";
import { logout } from "../../../utils/accounts/Authservice";

export default function LogoutUser() {
  useEffect(() => {
    function logOutUser() {
      logout();
    }
    logOutUser();
  }, []);
}
