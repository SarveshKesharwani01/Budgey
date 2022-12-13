import WarningContainer from "../Containers/WarningContainer";
import { useEffect, useState } from "react";
import { useUserBudgetUpdate } from "../../queries/user";
import styles from "../../styles/Wallet/Budget.module.scss";
import Progress from "./Progress"; 
const Budget = (params) => {
  // console.log(params.totalBudget);
  const [total, setTotal] = useState(0);
  const [showInput, setShowInput] = useState(0);
  const [budgetChange, setBudgetChange] = useState();
  const [allBudget, setAllBudget] = useState(0);
  const [warning1, setWarning1] = useState(0);
  const [warning2, setWarning2] = useState(0);
  const [load, setLoad] = useState(0);
  let total_sum = 0;
  for (let i = 0; i < params.sum?.length; i++) {
    total_sum += params.sum[i]._sum.money;
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
    setAllBudget(params.totalBudget.budget);
  }, [total_sum, params.totalBudget, isSuccess, isLoading, error, isError]);
  const TotalBudget = () => {
    if (showInput === 0) setShowInput(1);
    else {
      if (isNaN(body.budget)) {
        setWarning1(1);
      } else {
        setWarning1(0);
      }
      if (!isNaN(body.budget) && body.budget <= 0) {
        setWarning2(1);
      } else {
        setWarning2(0);
      }
      if (!isNaN(body.budget) && body.budget > 0) {
        setWarning1(0);
        setWarning2(0);
        BudgetUpdate(body);
      }
      setShowInput(0);
    }
  };
  const body = {
    budget: parseInt(budgetChange),
  };
  useEffect(() => {
    if (isSuccess || isError) {
      setLoad(1);
      setTimeout(() => {
        setLoad("");
      }, 2000);
    }
  }, [isError, isSuccess]);
  return (
    <div>
      <div>
        <div>Budget</div>
        <div>
          {params.totalBudget.budget !== undefined
            ? ` ${total}/${allBudget} `
            : " Not Set"}
        </div>
        <div>
          {params.totalBudget.budget !== undefined ?
          <Progress done={Math.round((total/allBudget)*10000)/100}/> : <Progress done="0"/>}
        </div>
        <div>
          {showInput === 1 && (
            <input
              type="number"
              placeholder="enter amount"
              onChange={(e) => setBudgetChange(e.target.value)}
            />
          )}
        </div>
        <div className={styles.button}>
          <button onClick={TotalBudget} style={{ background: "blue" }}>
            {params.totalBudget.budget !== undefined
              ? "Modify Budget"
              : "Set Budget"}
          </button>
        </div>
        {warning1 === 1 ? (
          <WarningContainer message="Please Enter a Value" />
        ) : (
          ""
        )}
        {warning2 === 1 ? (
          <WarningContainer message="Budget Cannot be Zero or Negative" />
        ) : (
          ""
        )}
        <div styple={{ marginBottom: "1rem" }}>
          {isError && load && (
            <div style={{ color: "red" }}>
              {`${error.response.data.instancePath} : ${
                error.response.data.message ? error.response.data.message : ""
              }`}
            </div>
          )}
          {isSuccess && load && <div style={{ color: "green" }}>Success</div>}
        </div>
      </div>
    </div>
  );
};

export default Budget;
