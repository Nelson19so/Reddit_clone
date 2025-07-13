import { useEffect } from "react";
import { logout } from "../../../utils/accounts/Auth_api";

export default function LogoutUser() {
  useEffect(() => {
    function logOutUser() {
      logout();
      console.log("Logged out");
    }
    logOutUser();
  }, []);
}
