import { useEffect } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import pattern_deskopt from "./assets/pattern-divider-desktop.svg";
import pattern_mobile from "./assets/pattern-divider-mobile.svg";
import icon_dice from "./assets/icon-dice.svg";
import "./App.css";

// Creamos un QueryClient
const queryClient = new QueryClient();

function App() {
  const { data: advice, status, refetch } = useQuery({
    
    queryKey: ["advice"],
    queryFn: async () => {
      const res = await fetch("https://api.adviceslip.com/advice");
      const json = await res.json();
      return json.slip;
      
    },
  });
  console.log(status);
  useEffect(() => {
    refetch();
  }, []);

  const handleClick = () => {
    if (status === 'success') {
      refetch();
    }
  };

  return (
    <div className="container">
      <p className="title-card">ADVICE # {advice ? advice.id : '???' }</p>
      {status === 'loading' ? (
        <p className="content-card">Cargando...</p>
      ) : status === 'error' ? (
        <p className="content-card">Error al cargar el consejo</p>
      ) : (
        <p className="content-card">{advice ? advice.advice : 'No hay consejo disponible'}</p>
      )}
      <img
        className="divider-card-desktop"
        src={pattern_deskopt}
        alt="imagen de separador de escritorio"
      />
      <img
        className="divider-card-mobile"
        src={pattern_mobile}
        alt="imagen de un separador móvil"
      />
      <button className="btn-card" onClick={handleClick} disabled={status !== 'success'}>
        <img src={icon_dice} alt="icono de dado" />
      </button>
    </div>
  );
}

function AppWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

export default AppWrapper;
