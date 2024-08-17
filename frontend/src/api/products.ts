import { AxiosResponse } from "axios";
import api from "./api";

export interface Products {
  id: number;
  name: string;
  description: string;
  color: string;
  image: string;
  fileName: string;
}

export const getProducts = async (): Promise<Products[]> => {
  try {
    const response: AxiosResponse<Products[]> = await api.get(
      "/site/beer/all",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
};
