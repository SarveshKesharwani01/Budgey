import WarningContainer from "../Containers/WarningContainer";
import { useEffect, useState } from "react";
import { useUserBudgetUpdate } from "../../queries/user";
import styles from "../../styles/Wallet/Budget.module.scss";
import Progress from "./Progress";
import { AiFillCloseCircle } from "react-icons/ai";
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
    if (warning1 === 1) {
      setTimeout(() => {
        setWarning1(0);
      }, 2000);
    }
    if (warning2 === 1) {
      setTimeout(() => {
        setWarning2(0);
      }, 2000);
    }
    // console.log(warning1, warning2, warning3, warning4, warning5);
    if (isSuccess || isError) {
      setLoad(1);
      setTimeout(() => {
        setLoad("");
      }, 2000);
    }
  }, [isError, isSuccess, warning1, warning2]);
  return (
    <div className={styles.cards}>
      <div className={styles.box}>
        <div className={styles.boxBody}>
          <h2>Budget</h2>
          <div className={styles.values}>
            {params.totalBudget.budget !== undefined
              ? ` ${total}/${allBudget} `
              : " Not Set"}
          </div>
          <div>
            {params.totalBudget.budget !== undefined ? (
              <Progress done={Math.round((total / allBudget) * 10000) / 100} />
            ) : (
              <Progress done="0" />
            )}
          </div>
          <div className={styles.inputParent}>
            {showInput === 1 && (
              <>
                <input
                  className={styles.input}
                  type="number"
                  placeholder="Enter Amount"
                  onChange={(e) => setBudgetChange(e.target.value)}
                />
                <AiFillCloseCircle onClick={() => setShowInput(0)} />
              </>
            )}
          </div>
          <div className={styles.button}>
            <button onClick={TotalBudget} className={styles.innerbutton}>
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
    </div>
  );
};

export default Budget;
