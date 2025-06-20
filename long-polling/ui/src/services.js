import axios from "axios";

export const getData = (params) => {
  const [key, value] = Object.entries(params)[0];
  const encodedValue = encodeURIComponent(value);
  const url = `http://localhost:3000/getData?${key}=${encodedValue}`;

  return axios.get(url).then((res) => res.data);
};
