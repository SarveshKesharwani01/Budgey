import { Title } from "../Titles/Titles";
import styles from "../../styles/transactionComponents/AddCategory.module.scss";
import { useState } from "react";
import WarningContainer from "../Containers/WarningContainer";
import { useTransactionCategoryAdd } from "../../queries/transaction";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const [warning, setWarning] = useState(0);
  let body = {
    name: category,
  };
  const {
    mutate: addCategory,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useTransactionCategoryAdd();
  return (
    <div className={styles.container}>
      <Title>Add Category</Title>
      <div className={styles.inner}>
        <input
          type="text"
          placeholder="category"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
        {warning === 1 ? (
          <WarningContainer message="Please enter a category first"></WarningContainer>
        ) : (
          ""
        )}
        <button
          onClick={() => {
            if (category.trim().length !== 0) {
              setWarning(0);
              addCategory(body, {
                onSuccess: async () => {
                  window.location.reload();
                },
              });
            } else {
              setWarning(1);
            }
          }}
        >
          {isLoading ? "Loading..." : "Add Category"}
        </button>

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
export default AddCategory;
