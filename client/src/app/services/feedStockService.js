import axios from "axios";
import { BACKEND_URL } from "../../utils/url";

export const FEED_STOCK_URL = `${BACKEND_URL}/feedStock`;

// addFeedStock
const addFeedStock = async (feedStockData) => {
  try {
    const response = await axios.post(`${FEED_STOCK_URL}/addFeedStock`, feedStockData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Something went wrong");
  }
};

// getFeedStocks
const getFeedStocks = async () => {
  try {
    const response = await axios.get(`${FEED_STOCK_URL}/getAllFeedStocks`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Something went wrong");
  }
};



const feedStockService = {
  addFeedStock,
  getFeedStocks,
 
};

export default feedStockService;
