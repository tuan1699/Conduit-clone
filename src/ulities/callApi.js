import axios from "axios";
import { API_ROOT } from "./constant";

const token = localStorage.getItem("token");

export const fetchCurrentUser = async () => {
  const token = localStorage.getItem("token");
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
    };
    const res = await fetch(`${API_ROOT}/user`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const updateCurrentUser = async (params) => {
  const token = localStorage.getItem("token");

  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
      body: JSON.stringify(params),
    };
    const res = await fetch(`${API_ROOT}/user`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchArticle = async () => {
  const token = localStorage.getItem("token");

  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
    };
    const res = await fetch(`${API_ROOT}/articles?limit=200&offset=0`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const login = async (userLogin) => {
  const token = localStorage.getItem("token");

  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
      body: JSON.stringify(userLogin),
    };
    const res = await fetch(`${API_ROOT}/users/login`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const register = async (userRegister) => {
  const token = localStorage.getItem("token");

  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
      body: JSON.stringify(userRegister),
    };
    const res = await fetch(`${API_ROOT}/users`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchDetail = async (slug) => {
  const token = localStorage.getItem("token");

  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
    };
    const res = await fetch(`${API_ROOT}/articles/${slug}`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchFeed = async (params) => {
  const token = localStorage.getItem("token");

  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
    };
    const res = await fetch(
      `${API_ROOT}/articles/feed?limit=${params.limit}&offset=${params.offset}`,
      options
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchTags = async () => {
  const token = localStorage.getItem("token");

  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
    };
    const res = await fetch(`${API_ROOT}/tags`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchArticleByTag = async (params) => {
  const token = localStorage.getItem("token");

  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
    };
    const res = await fetch(
      `${API_ROOT}/articles?tag=${params.tag}&limit=${params.limit}&offset=${params.offset}`,
      options
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const addFavorite = async (slug) => {
  const token = localStorage.getItem("token");

  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
    };
    const res = await fetch(`${API_ROOT}/articles/${slug}/favorite`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const unFavorite = async (slug) => {
  const token = localStorage.getItem("token");

  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
    };
    const res = await fetch(`${API_ROOT}/articles/${slug}/favorite`, options);
    const data = await res.json();
    return data || null;
  } catch (err) {
    console.log(err);
  }
};

export const getProfileAuthor = async (username) => {
  const token = localStorage.getItem("token");

  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
    };
    const res = await fetch(`${API_ROOT}/profiles/${username}`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchArticleByUser = async (params) => {
  const token = localStorage.getItem("token");

  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
    };
    const res = await fetch(
      `${API_ROOT}/articles?author=${params.author}&limit=5&offet=0`,
      options
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchFavArticleByUser = async (params) => {
  const token = localStorage.getItem("token");

  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
    };
    const res = await fetch(
      `${API_ROOT}/articles?favorited=${params.author}&limit=5&offet=0`,
      options
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const handleFollowUser = async (username) => {
  const token = localStorage.getItem("token");

  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
    };
    const res = await fetch(`${API_ROOT}/profiles/${username}/follow`, options);
    const data = await res.json();
    return data || null;
  } catch (err) {
    console.log(err);
  }
};

export const handleUnFollowUser = async (username) => {
  const token = localStorage.getItem("token");

  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
    };
    await fetch(`${API_ROOT}/profiles/${username}/follow`, options);
    return;
  } catch (err) {
    console.log(err);
  }
};

export const fetchComments = async (slug) => {
  const token = localStorage.getItem("token");

  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
    };
    const res = await fetch(`${API_ROOT}/articles/${slug}/comments`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const postComment = async (slug, params) => {
  const token = localStorage.getItem("token");

  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
      body: JSON.stringify(params),
    };
    const res = await fetch(`${API_ROOT}/articles/${slug}/comments`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteComment = async (slug, id) => {
  const token = localStorage.getItem("token");

  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
    };
    const res = await fetch(
      `${API_ROOT}/articles/${slug}/comments/${id}`,
      options
    );
    const data = await res.json();
    return data || null;
  } catch (err) {
    console.log(err);
  }
};

export const createArticle = async (params) => {
  const token = localStorage.getItem("token");

  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
      body: JSON.stringify(params),
    };
    const res = await fetch(`${API_ROOT}/articles`, options);
    const data = await res.json();
    return data || null;
  } catch (err) {
    console.log(err);
  }
};

export const deleteArticle = async (slug) => {
  const token = localStorage.getItem("token");

  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
    };
    const res = await fetch(`${API_ROOT}/articles/${slug}`, options);
    return res.data || null;
  } catch (err) {
    console.log(err);
  }
};

export const updateArticle = async (slug, params) => {
  const token = localStorage.getItem("token");

  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
      body: JSON.stringify(params),
    };
    const res = await fetch(`${API_ROOT}/articles/${slug}`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
