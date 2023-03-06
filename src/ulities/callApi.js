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

export const fetchFeed = async (options) => {
  const res = await axios.get(
    `${API_ROOT}/articles/feed?limit=${options.limit}&offset=${options.offset}`
  );
  return res.data;
};

export const fetchTags = async () => {
  const res = await axios.get(`${API_ROOT}/tags`);
  return res.data;
};

export const fetchArticleByTag = async (params) => {
  const res = await axios.get(`${API_ROOT}/articles`, { params: params });
  return res.data;
};

export const addFavorite = async (slug) => {
  const res = await axios.post(`${API_ROOT}/articles/${slug}/favorite`);
  return res.data;
};

export const unFavorite = async (slug) => {
  const res = await axios.delete(`${API_ROOT}/articles/${slug}/favorite`);
  return res.data;
};

export const getProfileAuthor = async (username) => {
  const res = await axios.get(`${API_ROOT}/profiles/${username}`);
  return res.data;
};

// check
export const fetchArticleByUser = async (params) => {
  const res = await axios.get(
    `${API_ROOT}/articles?author=${params.author}&limit=5&offet=0`
  );
  return res.data;
};

export const fetchFavArticleByUser = async (params) => {
  const res = await axios.get(
    `${API_ROOT}/articles?favorited=${params.author}&limit=5&offet=0`
  );
  return res.data;
};

export const handleFollowUser = async (username) => {
  const res = await axios.post(`${API_ROOT}/profiles/${username}/follow`);
  return res.data;
};

export const handleUnFollowUser = async (username) => {
  const res = await axios.delete(`${API_ROOT}/profiles/${username}/follow`);
  return res.data;
};

export const fetchComments = async (slug) => {
  const res = await axios.get(`${API_ROOT}/articles/${slug}/comments`);
  return res.data;
};

export const postComment = async (slug, params) => {
  const res = await axios.post(`${API_ROOT}/articles/${slug}/comments`, params);
  return res.data;
};

export const deleteComment = async (slug, id) => {
  const res = await axios.delete(`${API_ROOT}/articles/${slug}/comments/${id}`);
  return res.data;
};
