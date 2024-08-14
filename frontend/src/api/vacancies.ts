import { AxiosResponse } from "axios";
import api from "./api";

export interface Vacancy {
  id: number;
  name: string;
  description: string;
  image: string;
  base64Image?: string;
  fileName?: string; // Add this line
}

export const getVacancies = async (): Promise<Vacancy[]> => {
  try {
    const response: AxiosResponse<Vacancy[]> = await api.get(
      "/site/vacancy/all",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching vacancies:", error);
    throw error;
  }
};
