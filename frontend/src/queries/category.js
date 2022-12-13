import { useQuery } from "react-query";
import Ax from "../utils/Axios";
import { useMutation } from "react-query";
import { queryClient } from "../constants/config";
const getCtgs = async () => {
  return await Ax.get("/categories");
};

const getCtgsSum = async () => {
  return await Ax.get("/categories/sum");
};

const useCategoriesGetForTransaction = () => {
  const { status, data } = useQuery("Categories", getCtgs);
  if (status === "loading") {
    return {};
  }
  if (status === "success") {
    return data;
  }
};

const useCategoriesGetForCategories = () => {
  const { status, data, isFetched } = useQuery("Categories", getCtgs, {
    staleTime: 50000,
  });
  if (status === "loading") {
    return {};
  }
  if (status === "success") {
    return { data };
  }
};

const useCategoriesSum = () => {
  const { status, data } = useQuery("Categories_Sum", getCtgsSum, {
    staleTime: 50000,
  });
  if (status === "loading") return {};
  if (status === "success") return data;
};

const categoryBudgetUpdate = async (body) => {
  const x = await Ax.patch("categories/budget", body);
  queryClient.invalidateQueries();
  return x;
};

const useCategoryBudget = () =>
  useMutation("categoryBudgetUpdate", categoryBudgetUpdate);
export {
  useCategoriesGetForTransaction,
  useCategoriesSum,
  useCategoriesGetForCategories,
  useCategoryBudget,
};
