import { useQuery } from "react-query";
import Ax from "../utils/Axios";

const getCtgs = async () => {
  return await Ax.get("/categories");
};

const getCtgsSum = async () => {
  return await Ax.get("/categories/sum");
};

const useCategoriesGetForTransaction = () => {
  const { status, data } = useQuery("Categories", getCtgs, {
    staleTime: 50000,
  });
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
    return { data, isFetched };
  }
};

const useCategoriesSum = () => {
  const { status, data } = useQuery("Categories_Sum", getCtgsSum, {
    staleTime: 50000,
  });
  if (status === "loading") return {};
  if (status === "success") return data;
};

export {
  useCategoriesGetForTransaction,
  useCategoriesSum,
  useCategoriesGetForCategories,
};
