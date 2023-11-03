import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api';
const api_key = "40456732-3188a5df5cac2231388a1fb4d";
import { page } from "../index";

export default async function pixabayBase(inputDataUser) {
  try {
      const response = await axios.get('/', {
        params: {
            key: api_key,
            q: inputDataUser,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: "true",
            per_page: 40,
            page: `${page}`,
        }
      });

    return response.data
  } catch (error) {
    console.error(error);
  }
};