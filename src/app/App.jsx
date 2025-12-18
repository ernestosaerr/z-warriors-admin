import { useEffect, useRef } from "react";
import { RouterProvider } from "react-router-dom";
import { Toast } from "primereact/toast";

import router from "./router";
import { setupInterceptors } from "../services/interceptors";

function App() {
  const toast = useRef(null);

  useEffect(() => {
    setupInterceptors(toast);
  }, []);

  return (
    <>
      <Toast ref={toast} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
