const {
    VITE_ENV,
    VITE_PROD_URL,
    VITE_STA_URL,
    VITE_DEV_URL,
  } = import.meta.env;
  
  const environment = {
    baseUrl: VITE_DEV_URL,
  };
  
  if (VITE_ENV === "production") {
    environment.baseUrl = VITE_PROD_URL;
  }
  if (VITE_ENV === "staging") {
    environment.baseUrl = VITE_STA_URL;
  }
  if (VITE_ENV === "development") {
    environment.baseUrl = VITE_DEV_URL;
  }
  
  export default environment;
  