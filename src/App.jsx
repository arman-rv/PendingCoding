import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { RouteProvider } from "./components/providers/router-provider";
import { UserProvider } from "./components/providers/user-provider";
import { ToastProvider } from "./components/providers/toast-provider";
import { ThemeProvider } from "./components/providers/theme-provider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ThemeProvider>
          <ToastProvider />
          <RouteProvider />
        </ThemeProvider>
      </UserProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
