import styles from "../../styles/transactionComponents/AddTransactionForm.module.scss";
import { Title } from "../Titles/Titles";

import { useEffect, useState } from "react";
import { useCategoriesGetForTransaction } from "../../queries/category";
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

  const { data: ctgs } = useCategoriesGetForTransaction();

  const [isTitle, setIsTitle] = useState("");
  const [isMoney, setIsMoney] = useState("");
  const [warning1, setWarning1] = useState(0);
  const [warning2, setWarning2] = useState(0);
  console.log("ctgs: ", ctgs);
  useEffect(() => {
    if (ctgs !== undefined) setCategory(ctgs[0].id);
    else setCategory(1);
  }, [ctgs]);

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
            {ctgs?.map((ctg) => {
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
            if (!isNaN(body.money) && body.title.trim().length !== 0) {
              setWarning1(0);
              setWarning2(0);
              console.log(body.date);
              postTransaction(body, {
                onSuccess: async () => {
                  await queryClient.invalidateQueries("Categories_Sum");
                },
              });
            } else {
              if (isNaN(body.money)) setWarning2(1);
              if (body.title.trim().length === 0) setWarning1(1);
              if (!isNaN(body.money)) setWarning2(0);
              if (body.title.trim().length !== 0) setWarning1(0);
            }
          }}
        >
          {isLoading ? "Loading..." : "Add Transaction"}
        </button>

        {/* Error */}
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
      </div>
    </div>
  );
};
export default AddTransactionForm;
