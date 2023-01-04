// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

export async function postServerData(url, payload) {
    const data = await axios.post(url, payload);
    return data;
  }
