// src/App.tsx

import AppRouter from "./presentation/router/AppRouter";
import Toaster from "./presentation/components/ui/Toaster";

export default function App() {
  return (
    <>
      <AppRouter />
      <Toaster />
    </>
  );
}