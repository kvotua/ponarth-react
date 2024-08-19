import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { getVacancies, Vacancy } from "../../api/vacancies";

interface VacanciesContextProps {
  vacancies: Vacancy[];
}

interface VacanciesProviderProps {
  children: ReactNode;
}

const VacanciesContext = createContext<VacanciesContextProps>({
  vacancies: [],
});

export const VacanciesProvider: React.FC<VacanciesProviderProps> = ({
  children,
}) => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const data = await getVacancies();
        const vacanciesWithDecodedImages = data.map((vacancy) => ({
          ...vacancy,
          base64Image: `data:image/jpeg;base64,${vacancy.image}`,
        }));
        setVacancies(vacanciesWithDecodedImages);
      } catch (error) {
        console.error("Error fetching vacancies", error);
      }
    };
    fetchVacancies();
  }, []);

  return (
    <VacanciesContext.Provider value={{ vacancies }}>
      {children}
    </VacanciesContext.Provider>
  );
};

export const useVacancies = () => useContext(VacanciesContext);
