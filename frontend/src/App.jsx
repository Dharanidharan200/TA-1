import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./router/AppRouter";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <AppRouter />
    </AuthProvider>
  );
}