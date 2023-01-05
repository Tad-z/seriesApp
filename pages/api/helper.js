// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export async function postServerData(url, payload) {
  const data = await axios.post(url, payload);
  return data;
}

const getError = (err) =>
  err.response && err.response.data && err.response.data.message
    ? err.response.data.message
    : err.message;

export { getError };
