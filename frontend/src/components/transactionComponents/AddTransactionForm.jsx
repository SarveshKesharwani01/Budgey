import styles from "../../styles/transactionComponents/AddTransactionForm.module.scss";
import { Title } from "../Titles/Titles";

import { useEffect, useState } from "react";
import {
  useCategoriesGetForTransaction,
  useCategoriesSum,
} from "../../queries/category";
import { useTransactionPost } from "../../queries/transaction";
import { DateTime } from "luxon";
import { queryClient } from "../../constants/config";
import WarningContainer from "../Containers/WarningContainer";

const AddTransactionForm = () => {
  const [title, setTitle] = useState("");
  const [money, setMoney] = useState("");
  const [date, setDate] = useState(DateTime.now().toISODate());
  const [info, setInfo] = useState("");
  const [category, setCategory] = useState(10);
  const [load, setLoad] = useState(0);
  const [isTitle, setIsTitle] = useState("");
  const [isMoney, setIsMoney] = useState("");
  const [warning1, setWarning1] = useState(0);
  const [warning2, setWarning2] = useState(0);
  const [warning3, setWarning3] = useState(0);
  const { data: ctgs } = useCategoriesGetForTransaction();
  const { data: CategoriesSum } = useCategoriesSum();

  // console.log("ctgs: ", ctgs);
  // useEffect(() => {
  //   if (ctgs !== undefined) setCategory(ctgs[0].id);
  //   else setCategory(1);
  // }, [ctgs]);

  const {
    mutate: postTransaction,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useTransactionPost();

  let body = {
    title: title,
    money: parseFloat(money),
    date: date,
    info: info,
    transactionCategoryId: parseInt(category),
  };
  // console.log(category);
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
    if (warning3 === 1) {
      setTimeout(() => {
        setWarning3(0);
      }, 2000);
    }
    // console.log(warning1, warning2, warning3, warning4, warning5);
    if (isSuccess || isError) {
      setLoad(1);
      setTimeout(() => {
        setLoad("");
      }, 2000);
    }
  }, [isError, isSuccess, warning1, warning2, warning3]);
  return (
    <div className={styles.container}>
      <Title>Add a Transaction</Title>
      <div className={styles.inner}>
        <input
          type="text"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
        {warning1 === 1 ? (
          <WarningContainer message="Please fill the Title" />
        ) : (
          ""
        )}
        <input
          type="number"
          placeholder="money"
          onChange={(e) => setMoney(e.target.value)}
          value={money}
          required
        />
        {warning2 === 1 ? (
          <WarningContainer message="Please Enter the Amount" />
        ) : (
          ""
        )}
        {warning3 === 1 ? (
          <WarningContainer message="Amount cannot be Zero Or Negative" />
        ) : (
          ""
        )}
        <input
          type="date"
          placeholder="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
        <input
          type="text"
          placeholder="info"
          onChange={(e) => setInfo(e.target.value)}
          value={info}
        />

        {/* Categories */}
        {ctgs ? (
          <select
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            {ctgs &&
              ctgs?.map((ctg) => {
                return (
                  <option key={ctg.id} value={ctg.id}>
                    {ctg.name}
                  </option>
                );
              })}
          </select>
        ) : (
          <div>Loading...</div>
        )}

        {/* Post Transaction */}
        <button
          onClick={() => {
            setIsMoney(body.money);
            setIsTitle(body.title);
            // console.log(ctgs, category);
            const iD = ctgs?.find((id) => {
              return id.id === category;
            });
            const spending = CategoriesSum?.find((ids) => {
              return ids.transactionCategoryId === category;
            });
            console.log(spending, iD);
            if (
              !isNaN(body.money) &&
              body.money > 0 &&
              body.title.trim().length !== 0
            ) {
              setWarning1(0);
              setWarning2(0);
              setWarning3(0);
              // console.log(body.date);
              postTransaction(body, {
                onSuccess: async () => {
                  await queryClient.invalidateQueries("Categories_Sum");
                  setTitle("");
                  setMoney("");
                  setInfo("");
                },
              });
            } else {
              // console.log(warning1, warning2, warning3, warning4, warning5);
              if (isNaN(body.money)) setWarning2(1);
              if (body.title.trim().length === 0) setWarning1(1);
              if (body.money <= 0) setWarning3(1);
            }
          }}
        >
          {isLoading ? "Loading..." : "Add Transaction"}
        </button>

        {/* Error */}
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
export default AddTransactionForm;
