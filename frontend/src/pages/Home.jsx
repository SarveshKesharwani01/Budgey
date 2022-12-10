import MainContainer from "../components/Containers/MainContainer";
import Searchbar from "../components/homeComponents/Searchbar";
import { Title } from "../components/Titles/Titles";
import styles from "../styles/homeComponents/Home.module.scss";
import CategoryCard from "../components/Cards/CategoryCard";
import TransactionCard from "../components/Cards/TransactionCard";
import HomeProfile from "../components/homeComponents/HomeProfile";

import { DateTime } from "luxon";
import { useTransactionGet } from "../queries/transaction";
import { useCategoriesSum } from "../queries/category";
import { useEffect } from "react";

const Home = () => {
  // Latest Transaction
  const { data: transactions, refetch: fetchTransactions } = useTransactionGet({
    key: "Trs_Latest",
    skip: 0,
    take: 5,
  });

  const { data: CategoriesSum } = useCategoriesSum();

  // console.log(CategoriesSum);
  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <MainContainer optionClass={styles.container}>
      <div className={styles.main}>
        {/* Search Bar */}
        <div className={styles.searchbar}>
          <Searchbar />
        </div>

        {/* Categories */}
        <div className={styles.categories}>
          <Title>Categories last 30 days</Title>
          <div className={styles.content}>
            {/* Sum */}
            {CategoriesSum &&
              CategoriesSum.map((category, index) => {
                // console.log(category);
                return (
                  <CategoryCard
                    key={index}
                    category={category.transactionCategoryId}
                    money={category._sum.money.toFixed(2)}
                  />
                );
              })}
          </div>
        </div>

        {/* Transactions */}
        <div className={styles.transactions}>
          <Title>Latest Transaction</Title>
          <div className={styles.content}>
            {/* Latest Transaction */}
            {transactions &&
              transactions.data.map((transaction, index) => {
                return (
                  <TransactionCard
                    key={index}
                    category={transaction.category.name}
                    data={DateTime.fromISO(transaction.date).toISODate()}
                    money={transaction.money.toFixed(2)}
                    description={transaction.info}
                    title={transaction.title}
                  ></TransactionCard>
                );
              })}
          </div>
        </div>
      </div>
      <div className={styles.profile}>
        <HomeProfile />
      </div>
    </MainContainer>
  );
};

export default Home;
