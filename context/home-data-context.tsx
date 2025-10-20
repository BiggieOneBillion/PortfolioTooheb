// create context to share home data
import useGetSiteData from "@/hooks/use-get-sitedata";
import { HomeContent } from "@/types/home";
import { createContext, useContext } from "react";

type homeContextType = {
  isLoading: boolean;
  homeData: HomeContent;
};

const HomeDataContext = createContext<homeContextType | null>(null);

export const HomeDataContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isLoadingHomeData, homeData } = useGetSiteData();
  return (
    <HomeDataContext.Provider
      value={{ isLoading: isLoadingHomeData, homeData }}
    >
      {children}
    </HomeDataContext.Provider>
  );
};

export const useHomeData = () => useContext(HomeDataContext);
