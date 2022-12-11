import styles from "../styles/transactionComponents/Transaction.module.scss";
import { Title } from "../components/Titles/Titles";
import MainContainer from "../components/Containers/MainContainer";
import AddTransactionForm from "../components/transactionComponents/AddTransactionForm";
import DeleteTransactionForm from "../components/transactionComponents/DeleteTransactionForm";
import AddCategory from "../components/transactionComponents/AddCategory";
const Transactions = () => {
  return (
    <MainContainer>
      <Title>Transactions</Title>
      <AddTransactionForm />
      <AddCategory/>
      <DeleteTransactionForm/>
    </MainContainer>
  );
};

export default Transactions;
