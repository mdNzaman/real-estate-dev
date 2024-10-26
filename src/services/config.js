export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    PROFILE: "/auth/me",
  },
  PROPERTIES: {
    BASE: "/properties",
    SEARCH: "/properties/search",
  },
};
