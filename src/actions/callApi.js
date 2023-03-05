import axios from "axios";
import { API_ROOT } from "../ulities/constant";

export const fetchArticle = async () => {
  const res = await axios.get(`${API_ROOT}/articles?limit=200&offset=0`);
  return res.data;
};
