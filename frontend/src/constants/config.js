import { QueryClient } from "react-query";
const queryClient = new QueryClient();

const AXIOS_URL = "http://localhost:5000/api";
export { AXIOS_URL, queryClient };
