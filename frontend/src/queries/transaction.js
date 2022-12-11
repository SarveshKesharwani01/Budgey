import { useQuery, useMutation } from "react-query";

import Ax from "../utils/Axios";

const deleteTr = async (params) => {
  return await Ax.delete(`transaction/delete/${params}`);
};

const getTrs = async (params) => {
  return await Ax.get("transactions", { params: params }).catch((e) =>
    console.log(e)
  );
};

const postTr = async (params) => {
  return await Ax.post("transaction", params);
};

const addCategory = async (params) => {
  return await Ax.post("/transaction/add", params); 
}
const useTransactionDelete = () => useMutation("deleteTr", deleteTr);
const useTransactionGet = ({
  firstDate,
  lastDate,
  category,
  dateSort,
  priceSort,
  skip,
  take,
  key,
}) =>
  useQuery(
    key,
    () =>
      getTrs({
        firstDate,
        lastDate,
        category,
        dateSort,
        priceSort,
        skip,
        take,
      }),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      keepPreviousData: true,
    }
  );

const useTransactionPost = () => useMutation("postTransaction", postTr);
const useTransactionCategoryAdd = () => useMutation("addCategory", addCategory); 
export { useTransactionGet, useTransactionDelete, useTransactionPost, useTransactionCategoryAdd };
