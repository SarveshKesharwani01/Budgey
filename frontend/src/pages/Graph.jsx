import React from "react";
import styles from "../styles/GraphComponents/Graph.module.scss";
import { Title } from "../components/Titles/Titles";
import { useTransactionGetAll } from "../queries/transaction";
import { useCategoriesGetForCategories } from "../queries/category";
import { DateTime } from "luxon";
import BarGraph from "../components/BarGraph";
import ChartDataLabels from "chartjs-plugin-datalabels";
const Graph = () => {
  const { data: Transactions } = useTransactionGetAll();
  const { data: ctgs } = useCategoriesGetForCategories();
  //   console.log(Transactions?.data);
  const CategoriesMatch = new Map();
  let count = 0;
  const CategoryArray = [];
  ctgs?.data.forEach((cats) => {
    CategoryArray.push(cats.name);
    CategoriesMatch.set(cats.id, count);
    count++;
  });
  const CategorySize = CategoryArray.length;
  //   console.log(CategoriesMatch);
  let dailyTransaction = Array(1).fill(0);
  let Today = Array(1).fill(0);
  Today[0] = "Today";

  //Weekly
  let todayTransaction = Array(7).fill(0);
  let todayDays = Array(7).fill(0);
  for (let i = 0; i < 7; i++) {
    todayDays[6 - i] = DateTime.now().minus({ days: i }).weekdayLong;
  }

  //Monthly
  const month = DateTime.now().daysInMonth;
  let monthlyTransaction = Array(month).fill(0);
  let monthDays = Array(month).fill(0);
  for (let i = 0; i < month; i++) {
    monthDays[i] = i + 1;
  }

  //Yearly
  let yearlyTransaction = Array(12).fill(0);
  let yearDays = Array(12).fill(0);
  const currMonth = DateTime.now().month;
  for (let i = 0; i < 12; i++) {
    yearDays[i] = DateTime.now().minus({ months: currMonth - i - 1 }).monthLong;
  }

  //   console.log(CategoryArray);
  // Daily Category
  const dailyCategory = Array(CategorySize).fill(0);
  // Weekly Category
  const weeklyCategory = Array(CategorySize).fill(0);
  // Monthly Category
  const monthlyCategory = Array(CategorySize).fill(0);
  // Yearly Category
  const yearlyCategory = Array(CategorySize).fill(0);
  for (let i = 0; i < Transactions?.data?.length; i++) {
    //Daily && Daily Category
    const Day = DateTime.now().toISODate();
    if (Day === Transactions.data[i].date.substring(0, 10)) {
      dailyTransaction[0] += Transactions.data[i].money;
      const idx = CategoriesMatch.get(
        Transactions.data[i].transactionCategoryId
      );
      dailyCategory[idx] += Transactions.data[i].money;
    }

    //Weekly && Weekly Category
    for (let j = 0; j < 7; j++) {
      const Day = DateTime.now().minus({ days: j }).toISODate();
      if (Day === Transactions.data[i].date.substring(0, 10)) {
        todayTransaction[6 - j] += Transactions.data[i].money;
        const idx = CategoriesMatch.get(
          Transactions.data[i].transactionCategoryId
        );
        weeklyCategory[idx] += Transactions.data[i].money;
      }
    }
    //Monthly && Monthly Category
    monthlyTransaction[parseInt(Transactions?.data[i].date.substring(8, 10))] +=
      Transactions?.data[i].money;
    const idx1 = CategoriesMatch.get(
      Transactions.data[i].transactionCategoryId
    );
    monthlyCategory[idx1] += Transactions.data[i].money;
    //Yearly && Yearly Category
    yearlyTransaction[
      parseInt(Transactions?.data[i].date.substring(5, 7)) - 1
    ] += Transactions?.data[i].money;
    yearlyCategory[idx1] += Transactions.data[i].money;
  }

  const backGroundColor = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(255, 205, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(201, 203, 207, 0.2)",
  ];

  const borderColor = [
    "rgb(255, 99, 132)",
    "rgb(255, 159, 64)",
    "rgb(255, 205, 86)",
    "rgb(75, 192, 192)",
    "rgb(54, 162, 235)",
    "rgb(153, 102, 255)",
    "rgb(201, 203, 207)",
  ];
  //Daily
  const dataDaily = {
    labels: Today,
    datasets: [
      {
        label: "Daily Expense",
        data: dailyTransaction,
        backgroundColor: backGroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };
  // Daily Category
  const dataDailyCategory = {
    labels: CategoryArray,
    datasets: [
      {
        label: "Daily Expense",
        data: dailyCategory,
        backgroundColor: backGroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  //Weekly
  const dataWeek = {
    labels: todayDays,
    datasets: [
      {
        label: "Weekly Expense",
        data: todayTransaction,
        backgroundColor: backGroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  // Weekly Category
  const dataWeekCategory = {
    labels: CategoryArray,
    datasets: [
      {
        label: "Weekly Expense",
        data: weeklyCategory,
        backgroundColor: backGroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  // Month
  const dataMonth = {
    labels: monthDays,
    datasets: [
      {
        label: "Monthly Expense",
        data: monthlyTransaction,
        backgroundColor: backGroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };
  // Monthly Category
  const dataMonthCategory = {
    labels: CategoryArray,
    datasets: [
      {
        label: "Monthly Expense",
        data: monthlyCategory,
        backgroundColor: backGroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };
  //Year
  const dataYear = {
    labels: yearDays,
    datasets: [
      {
        label: "Yearly Expense",
        data: yearlyTransaction,
        backgroundColor: backGroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };
  // Yearly Category
  const dataYearCategory = {
    labels: CategoryArray,
    datasets: [
      {
        label: "Yearly Expense",
        data: yearlyCategory,
        backgroundColor: backGroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.bigContainer}>
      <Title>Graph</Title>
      <div className={styles.firstRow}>
        <div className={styles.firstRow1}>
          <BarGraph data={dataDaily} plugins={[ChartDataLabels]} />
        </div>
        <div className={styles.firstRow2}>
          <BarGraph data={dataWeek} plugins={[ChartDataLabels]} />
        </div>
      </div>
      <div className={styles.secondRowParent}>
        <div className={styles.secondRow}>
          <BarGraph data={dataMonth} plugins={[ChartDataLabels]} />
        </div>
      </div>
      <div className={styles.secondRowParent}>
        <div className={styles.secondRow}>
          <BarGraph data={dataYear} plugins={[ChartDataLabels]} />
        </div>
      </div>
      <div className={styles.totalBudget}>Category-Wise</div>
      <div className={styles.secondRowParent}>
        <div className={styles.secondRow}>
          <BarGraph data={dataDailyCategory} plugins={[ChartDataLabels]} />
        </div>
      </div>
      <div className={styles.secondRowParent}>
        <div className={styles.secondRow}>
          <BarGraph data={dataWeekCategory} plugins={[ChartDataLabels]} />
        </div>
      </div>
      <div className={styles.secondRowParent}>
        <div className={styles.secondRow}>
          <BarGraph data={dataMonthCategory} plugins={[ChartDataLabels]} />
        </div>
      </div>
      <div className={styles.secondRowParent}>
        <div className={styles.secondRow}>
          <BarGraph data={dataYearCategory} plugins={[ChartDataLabels]} />
        </div>
      </div>
    </div>
  );
};
export default Graph;
