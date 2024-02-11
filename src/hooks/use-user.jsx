import { useContext } from "react";
import { UserContext } from "../components/providers/user-provider";

function useUser() {
  return useContext(UserContext);
}

export { useUser };
