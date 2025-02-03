import { useMediaQuery } from "react-responsive";
export const useDeviceSize = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });
  const isTablet = useMediaQuery({
    query: "(min-width:768px) and (max-width:1279px)",
  });
  const isMobile = useMediaQuery({
    query: "(min-width:375px) and (max-width:767px)",
  });
  return { isDesktop, isTablet, isMobile };
};
// PC: 1200px 이상
// Tablet: 744px 이상 ~ 1199px 이하
// Mobile: 375px 이상 ~ 743px 이하
