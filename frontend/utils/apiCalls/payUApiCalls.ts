/* eslint-disable import/no-anonymous-default-export */
// import { SERVER_URL } from "@/app/services/serverURL";

import axios from "axios";
import { SERVER_URL_PAYMENT } from "../serverURL";


const apiClient = axios.create({
  baseURL: `${SERVER_URL_PAYMENT}`,
  withCredentials: true,
  timeout: 120000,
});

export const PayUUrl = {
  payment: `${SERVER_URL_PAYMENT}/payment`,
  response: `${SERVER_URL_PAYMENT}/response`,
  test: `${SERVER_URL_PAYMENT}/response/test`,
};

export default {
  paymentReq: async function (data: any) {
    try {
      const reshash = await apiClient.post("/payment", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return reshash.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Something went wrong.");
    }
  },
  saveData: async function (pd: any) {
    try {
      console.log(pd,"pd")
      const response = await apiClient.post(`/response/saveData`, JSON.stringify(pd), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};