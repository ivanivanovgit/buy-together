// useSetPointRoute.js
import { useEffect } from "react";

const useSetPointRoute = (selectedAddress, setPoint, ymaps) => {
  useEffect(() => {
    if (selectedAddress) {
      setPoint.onChange(selectedAddress);
    }
  }, [selectedAddress, ymaps]);
};

export default useSetPointRoute;
