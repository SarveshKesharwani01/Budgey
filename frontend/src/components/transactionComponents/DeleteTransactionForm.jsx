import { Title } from "../Titles/Titles";
import TransactionCard from "../Cards/TransactionCard";

// Styles
import { BsTrash } from "react-icons/bs";
import styles from "../../styles/transactionComponents/DeleteTransactionForm.module.scss";

//utils
import { useState } from "react";
import { DateTime } from "luxon";

import {
  useTransactionDelete,
  useTransactionGet,
} from "../../queries/transaction";
import { queryClient } from "../../constants/config";
const DeleteTransactionForm = () => {
  const [firstDate, setFirstDate] = useState(
    DateTime.now().minus({ day: 1 }).toISODate()
  );
  const [lastDate, setLastDate] = useState(
    DateTime.now().plus({ day: 1 }).toISODate()
  );

  const { mutate: deleteTr } = useTransactionDelete();
  const {
    data,
    refetch: fetchTransactions,
    isLoading: transactionsLoading,
  } = useTransactionGet({
    firstDate: firstDate,
    lastDate: lastDate,
    key: "Trs",
  });
  return (
    <div className={styles.container}>
      <Title>Delete a Transaction</Title>
      <div className={styles.dateSearchFilter}>
        {/* First Date */}
        <div className={styles.date}>
          <label htmlFor="firstDate">From: </label>
          <input
            type="date"
            name="firstDate"
            value={firstDate}
            onChange={(e) => setFirstDate(e.target.value)}
          />
        </div>
        {/* Last Date */}
        <div className={styles.date}>
          <label htmlFor="lastDate">To: </label>
          <input
            type="date"
            name="lastDate"
            value={lastDate}
            onChange={(e) => setLastDate(e.target.value)}
          />
        </div>
        {/* Action Button */}
        <button className={styles.btn} onClick={() => fetchTransactions()}>
          Show Transactions
        </button>
      </div>
      {/* Results */}
      <div className={styles.results}>
        {data &&
          data?.data.map((tr, index) => {
            // console.log(tr);
            return (
              <div key={index} className={styles.container}>
                <div className={styles.deleteContainer}>
                  <TransactionCard
                    category={tr.category.name}
                    money={tr.money}
                    description={`Info: ${tr.info}`}
                    date={DateTime.fromISO(tr.date).toISODate()}
                    title={tr.title}
                  />
                  <div
                    className={styles.iconContainer}
                    style={
                      transactionsLoading
                        ? {
                            pointerEvents: "none",
                            background: "#333",
                          }
                        : {}
                    }
                    onClick={() => {
                      deleteTr(tr.id, {
                        onSuccess: async () => {
                          await queryClient
                            .invalidateQueries("Trs")
                            .then(await fetchTransactions())
                            .catch();
                        },
                      });
                    }}
                  >
                    <BsTrash/>  
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DeleteTransactionForm;
