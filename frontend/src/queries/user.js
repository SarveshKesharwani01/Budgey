import { useQuery, useMutation } from "react-query";
import Ax from "../utils/Axios";

const fetchUser = async () => {
  return await Ax.get("whoami");
};

const loginUser = async (body) => {
  return await Ax.post("auth", body);
};

const registerUser = async (body) => {
  return await Ax.post("register", body);
};

const logoutUser = async () => {
  return await Ax.post("logout");
};

const useUser = () =>
  useQuery("user", fetchUser, {
    refetchOnWindowFocus: true,
    retry: false,
  });

const useLoginUser = () => useMutation("loginUser", loginUser);
const useLogoutUser = () => useMutation("logoutUser", logoutUser);
const useRegisterUser = () => useMutation("registerUser", registerUser);

export { useUser, useLoginUser, useRegisterUser, useLogoutUser };
