import api from "./api";

export const setupInterceptors = (toastRef) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      toastRef.current?.show({
        severity: "error",
        summary: "Error",
        detail: "La comunicación con el planeta Namek ha fallado",
        life: 3000
      });

      return Promise.reject(error);
    }
  );
};
