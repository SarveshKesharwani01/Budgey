import styles from "../styles/CategoryComponents/Categories.module.scss";
import { Title } from "../components/Titles/Titles";
import TransactionCard from "../components/Cards/TransactionCard";
import MainContainer from "../components/Containers/MainContainer";
import { DateTime } from "luxon";
import { useState, useEffect } from "react";
import { useCategoriesGetForCategories } from "../queries/category";
import { useTransactionGet } from "../queries/transaction";

const Categories = () => {
  // Searching
  const [timeSpan, setTimeSpan] = useState(
    DateTime.now().minus({ days: 7 }).toISODate()
  );
  const [categories, setCategories] = useState("");
  const [sortingField, setSortingField] = useState("dateSort");
  const [order, setOrder] = useState("asc");
  const { data: ctgs, isFetched: isCtgsFetched } =
    useCategoriesGetForCategories();
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    if (ctgs) setCategories(ctgs.data[0].id);
  }, [ctgs]);

  const { data: FilteredTransactions, refetch: fetchTransactions } =
    useTransactionGet({
      firstDate: timeSpan,
      category: categories ? categories : undefined,
      [sortingField]: order,
      skip: skip,
      take: 10,
      key: "CategoriesTrs",
    });
  return (
    <MainContainer>
      <Title>Categories</Title>
      <div className={styles.container}>
        {/* Filter */}
        <div className={styles.filters}>
          <div className={styles.filterContainer}>
            {/* Time Span */}
            <div className={styles.filter}>
              <label htmlFor="timeSpan">Time Span: </label>
              <select
                name="timeSpan"
                onChange={(e) => {
                  setTimeSpan(e.target.value);
                }}
              >
                <option value={DateTime.now().minus({ days: 7 }).toISODate()}>
                  Last 7 Days
                </option>
                <option value={DateTime.now().minus({ days: 30 }).toISODate()}>
                  Last 1 Month
                </option>
                <option value={DateTime.now().minus({ days: 90 }).toISODate()}>
                  Last 3 Months
                </option>
                <option value={DateTime.now().minus({ days: 180 }).toISODate()}>
                  Last 6 Months
                </option>
                <option value={DateTime.now().minus({ days: 270 }).toISODate()}>
                  Last 9 Months
                </option>
                <option value={DateTime.now().minus({ days: 365 }).toISODate()}>
                  Last 1 Year
                </option>
                <option value={DateTime.now().minus({ days: 730 }).toISODate()}>
                  Last 2 Years
                </option>
              </select>
            </div>
          </div>

          {/* Categories */}
          <div className={styles.filterContainer}>
            <div className={styles.filter}>
              <label htmlFor="categories">Categories: </label>
              {isCtgsFetched ? (
                <select
                  name="categories"
                  onChange={(e) => {
                    setCategories(e.target.value);
                  }}
                >
                  {ctgs?.data?.map((category, index) => {
                    return (
                      <option value={category.id} key={index}>
                        {category.name}
                      </option>
                    );
                  })}
                  <option value="">All</option>
                </select>
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
          {/* Sorting Fields */}
          <div className={styles.filterContainer}>
            <div className={styles.filter}>
              <label htmlFor="sortingField">Sorting Field: </label>
              <select
                name="sortingField"
                onChange={(e) => setSortingField(e.target.value)}
              >
                <option value="date">Date</option>
                <option value="price">Price</option>
              </select>
            </div>
          </div>

          {/* Order */}
          <div className={styles.filterContainer}>
            <div className={styles.filter}>
              <label htmlFor="order">Order: </label>
              <select name="order" onChange={(e) => setOrder(e.target.value)}>
                <option value="asc">Ascending</option>
                <option value="dsc">Descending</option>
              </select>
            </div>
          </div>
        </div>
        {/* Results */}
        <div className={styles.results}>
          <button className={styles.btn} onClick={() => fetchTransactions()}>
            Show Results
          </button>
          <div className={styles.inner}>
            {FilteredTransactions &&
              FilteredTransactions.data?.map((transaction, index) => {
                return (
                  <TransactionCard
                    key={index}
                    category={transaction.category.name}
                    money={transaction.money}
                    date={DateTime.fromISO(transaction.date).toISODate()}
                    description={transaction.info}
                    title={transaction.title}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Categories;
