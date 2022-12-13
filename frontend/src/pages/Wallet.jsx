//components
import { Title } from "../components/Titles/Titles";
import MainContainer from "../components/Containers/MainContainer";
import Budget from "../components/Wallet/Budget";
import CategoryBudget from "../components/Wallet/CategoryBudget";
import {
  useCategoriesSum,
  useCategoriesGetForCategories,
} from "../queries/category";
import { useUserBudgetGet } from "../queries/user";

const Wallet = () => {
  const { data: CategoriesSum } = useCategoriesSum();
  const { data: ctgs } = useCategoriesGetForCategories();
  const { data: totalBudget } = useUserBudgetGet();
  let total_category_budget = 0;
  for (let i = 0; i < ctgs?.data?.length; i++) {
    total_category_budget += ctgs.data[i].budget;
  }

  // console.log(CategoriesSum);
  return (
    <MainContainer>
      <Title>Wallet</Title>
      <Budget sum={CategoriesSum} totalBudget={totalBudget} />
      <div>
        <div>Unallocated Budget</div>
        <div>{totalBudget.budget - total_category_budget}</div>
      </div>
      {ctgs &&
        ctgs.data &&
        ctgs.data.map((category, index) => {
          const value = CategoriesSum?.find((ids) => {
            return category.id === ids.transactionCategoryId;
          });
          return (
            <CategoryBudget
              key={index}
              cat={category}
              sum={value?._sum.money}
              totalBudget={totalBudget}
              totalCategoryBudget={total_category_budget}
            />
          );
        })}
      
    </MainContainer>
  );
};
export default Wallet;
