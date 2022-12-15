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
import { useCategoriesGetForCategories } from "../queries/category";

const Home = () => {
  // Latest Transaction
  const { data: transactions, refetch: fetchTransactions } = useTransactionGet({
    key: "Trs_Latest",
    skip: 0,
    take: 5,
  });
  const { data: ctgs, isFetched: isCtgsFetched } =
    useCategoriesGetForCategories();
  const { data: CategoriesSum } = useCategoriesSum();

  // console.log(CategoriesSum);
  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <MainContainer>
      <div className={[styles.main, styles.container].join(" ")}>
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
                return (
                  <div key={index}>
                    {ctgs &&
                      ctgs.data &&
                      ctgs?.data?.map((ctgs, index1) => {
                        if (ctgs.id === category.transactionCategoryId) {
                          return (
                            <CategoryCard
                              key={index1}
                              category={ctgs.name}
                              money={category._sum.money.toFixed(2)}
                            />
                          );
                        } else {
                          return <div></div>;
                        }
                      })}
                  </div>
                );
              })}
          </div>
        </div>

        {/* Transactions */}
        <div className={styles.transactions}>
          <Title>Today's Transaction</Title>
          <div className={styles.content}>
            {/* Latest Transaction */}
            {transactions &&
              transactions.data.map((transaction, index) => {
                return (
                  <TransactionCard
                    key={index}
                    category={transaction.category.name}
                    date={DateTime.fromISO(transaction.date).toFormat("dd-MM-yyyy")}
                    money={transaction.money.toFixed(2)}
                    description={transaction.info}
                    title={transaction.title}
                  ></TransactionCard>
                );
              })}
          </div>
        </div>
        <div className={styles.profile}>
          <HomeProfile />
        </div>
      </div>
    </MainContainer>
  );
};

export default Home;
