import axios from "axios";
import { API_ROOT } from "./constant";

export const fetchArticle = async () => {
  const res = await axios.get(`${API_ROOT}/articles?limit=200&offset=0`);
  return res.data;
};

export const login = async (userLogin) => {
  const res = await axios.post(`${API_ROOT}/users/login`, userLogin);
  return res.data;
};

export const fetchDetail = async (slug) => {
  const res = await axios.get(`${API_ROOT}/articles/${slug}`);
  return res.data;
};
