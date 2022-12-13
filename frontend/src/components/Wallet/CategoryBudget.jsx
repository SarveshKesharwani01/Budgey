import { useState } from "react";
import { useCategoryBudget } from "../../queries/category";
import WarningContainer from "../Containers/WarningContainer";
import { useEffect } from "react";
import Progress from "./Progress";
import styles from "../../styles/Wallet/CategoryBudget.module.scss"
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
    <div>
      <div>
        <div>{params.cat.name}</div>
        <div>
          {params.cat.budget !== null && params.cat.budget !== 0
            ? `${params.sum} / ${params.cat.budget}`
            : "NA"}
        </div>
        <div>
          {params.totalBudget.budget !== undefined && params.sum !== undefined ?
          <Progress done={Math.round((params.sum/params.cat.budget)*10000)/100}/> : <Progress done="0"/>}
        </div>
        <div>
          {showInput === 1 && (
            <input
              type="number"
              placeholder="Enter Amount"
              onChange={(e) => setCategoryBudgetChange(e.target.value)}
            />
          )}
        </div>
        <div className={styles.button}>
          <button onClick={categoryBudget} style={{ background: "blue" }}>
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
  );
};
export default CategoryBudget;
