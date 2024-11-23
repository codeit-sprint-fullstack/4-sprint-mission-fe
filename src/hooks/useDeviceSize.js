import { useMediaQuery } from "react-responsive";

export default function useDeviceSize() {
  const isDeskTop = useMediaQuery({ query: "(min-width:1200px)" });
  const isTablet = useMediaQuery({
    query: "(min-width:744px) and (max-width: 1199px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 743px)" });

  return { isDeskTop, isTablet, isMobile };
}
