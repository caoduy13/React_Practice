import "../App.css";
import { QueryProvider } from "./providers/QueryProvider";
import { RouterProvider } from "./providers/RouterProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <ThemeProvider>
        <QueryProvider>
          <RouterProvider />
          <Toaster position="bottom-right" richColors closeButton />
        </QueryProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
