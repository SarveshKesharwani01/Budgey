import { useState } from "react";
import { useCategoryBudget } from "../../queries/category";
import WarningContainer from "../Containers/WarningContainer";
import { useEffect } from "react";
import Progress from "./Progress";
import styles from "../../styles/Wallet/CategoryBudget.module.scss";
import { AiFillCloseCircle } from "react-icons/ai";
const CategoryBudget = (params) => {
  // console.log(params);
  const {
    mutate: CategoryBudgetUpdate,
    isSuccess,
    isError,
    error,
  } = useCategoryBudget();
  const [warning1, setWarning1] = useState(0);
  const [warning2, setWarning2] = useState(0);
  const [warning3, setWarning3] = useState(0);
  const [showInput, setShowInput] = useState(0);
  const [categoryBudgetChange, setCategoryBudgetChange] = useState(0);
  const [load, setLoad] = useState("");
  const body = {
    id: params.cat.id,
    budget: parseInt(categoryBudgetChange),
  };
  const categoryBudget = () => {
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
        if (
          body.budget >
          params.totalBudget.budget -
            params.totalCategoryBudget +
            params.cat.budget
        ) {
          setWarning3(1);
        } else {
          setWarning3(0);
        }
      }
      if (
        !isNaN(body.budget) &&
        body.budget > 0 &&
        body.budget <=
          params.totalBudget.budget -
            params.totalCategoryBudget +
            params.cat.budget
      ) {
        setWarning1(0);
        setWarning2(0);
        setWarning3(0);
        CategoryBudgetUpdate(body);
      }
      setShowInput(0);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setWarning1(0);
      setWarning2(0);
      setWarning3(0);
    }, 3000);
    if (isError || isSuccess) {
      setLoad(1);
      setTimeout(() => {
        setLoad("");
      }, 2000);
    }
  }, [warning1, warning2, warning3, isError, isSuccess]);
  return (
    <div className={styles.box}>
      <div className={styles.box1}>
        <div className={styles.boxBody}>
          <h2>{params.cat.name}</h2>
          <div className={styles.values}>
            {params.cat.budget !== null && params.cat.budget !== 0
              ? params.sum !== undefined
                ? `${params.sum} / ${params.cat.budget}`
                : `0 / ${params.cat.budget}`
              : "NA"}
          </div>
          <div className={styles.progress}>
            {params.cat.budget !== null &&
            params.cat.budget !== 0 &&
            params.sum !== undefined ? (
              <Progress
                done={
                  Math.round((params.sum / params.cat.budget) * 10000) / 100
                }
              />
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
                  onChange={(e) => setCategoryBudgetChange(e.target.value)}
                />
                <AiFillCloseCircle onClick={() => setShowInput(0)} />
              </>
            )}
          </div>
          <div className={styles.button}>
            <button onClick={categoryBudget} className={styles.innerbutton}>
              {params.cat.budget !== 0 ? "Modify Budget" : "Set Budget"}
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
          {warning3 === 1 ? (
            <WarningContainer message="The value cannot be bigger than the remaining Budget" />
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
export default CategoryBudget;
