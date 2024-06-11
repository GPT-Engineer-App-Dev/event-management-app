import { SupabaseAuthProvider } from "./integrations/supabase/auth.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <SupabaseAuthProvider>
        <App />
      </SupabaseAuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);