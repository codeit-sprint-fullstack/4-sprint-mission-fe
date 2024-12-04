import { useState } from "react";

export const useAsync = (asyncFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const wrappedFunction = async (...args) => {
    try {
      setLoading(true);
      setError(null);
      return asyncFunction(...args);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  return [loading, error, wrappedFunction];
};
