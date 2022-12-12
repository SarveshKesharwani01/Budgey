//components
import { Title } from "../components/Titles/Titles";
import MainContainer from "../components/Containers/MainContainer";

import {
  useCategoriesSum,
  useCategoriesGetForCategories,
} from "../queries/category";
import { useEffect, useState } from "react";
import { useUserBudgetUpdate, useUserBudgetGet } from "../queries/user";

const Wallet = () => {
  const { data: CategoriesSum } = useCategoriesSum();
  const { data: ctgs, isFetched: isCtgsFetched } =
    useCategoriesGetForCategories();
  const { data: totalBudget } = useUserBudgetGet();
  // console.log("useCategoriesSum called: ", CategoriesSum , "useCategoriesGetForCategories called: " , ctgs , "useUserBudgetGet called: ", totalBudget);
  const [total, setTotal] = useState(0);
  const [showInput, setShowInput] = useState(0);
  const [budgetChange, setBudgetChange] = useState(0);
  const [allBudget, setAllBudget] = useState(0);
  let total_sum = 0;
  for (let i = 0; i < CategoriesSum?.length; i++) {
    total_sum += CategoriesSum[i]._sum.money;
  }
  const {
    mutate: BudgetUpdate,
    isSuccess,
    isLoading,
    error,
    isError,
  } = useUserBudgetUpdate();
  useEffect(() => {
    setTotal(total_sum);
    setAllBudget(totalBudget.budget);
  }, [total_sum, totalBudget, isSuccess, isLoading, error, isError]);
  const TotalBudget = () => {
    if (showInput === 0) setShowInput(1);
    else {
      BudgetUpdate(body);
      setShowInput(0);
    }
  };
  const body = {
    budget: parseInt(budgetChange),
  };
  if(isSuccess){
    window.location.reload(false); 
  }
  // console.log("hi :", totalBudget);
  return (
    <MainContainer>
      <Title>Wallet</Title>
      {totalBudget !== undefined
        ? `Budget: ${total_sum}/${allBudget} `
        : "Not Set"}
      {showInput === 1 && (
        <input
          type="number"
          placeholder="enter amount"
          onChange={(e) => setBudgetChange(e.target.value)}
        />
      )}
      <button onClick={TotalBudget} style={{ background: "blue" }}>
        {totalBudget !== undefined ? "Modify Budget" : "Set Budget"}
      </button>
      <div styple={{ marginBottom: "1rem" }}>
        {isError && (
          <div style={{ color: "red" }}>
            {`${error.response.data.instancePath} : ${
              error.response.data.message ? error.response.data.message : ""
            }`}
          </div>
        )}
        {isSuccess && <div style={{ color: "green" }}>Success</div>}
      </div>
    </MainContainer>
  );
};
export default Wallet;
