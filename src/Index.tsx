import { useEffect, useState } from "react";
import { useSupabase } from "./SupabaseContext";
import { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import "./App.css";
import HomeIcon from "./assets/IconIndex.png";
import ConfigIcon from "./assets/ConfigIcon.png";
import ApiIcon from "./assets/ApiIcon.png";
import AboutIcon from "./assets/AboutIcon.png";
import UserIcon from "./assets/UserIcon.png";

function Index() {
  const supabase = useSupabase();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user: currentUser },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Erro ao obter informações do usuário:", error);
        // Redirecionar para login em caso de erro
        navigate("/");
      } else {
        setUser(currentUser);
      }
    };
    fetchUser();
  }, [supabase, navigate]);

  const menuOptions = [
    {
      title: "Ir para as aplicações do sistema",
      icon: ApiIcon,
      path: "/ApiSis",
      alt: "API",
    },
    {
      title: "Ir para Configurações",
      icon: ConfigIcon,
      path: "/Config",
      alt: "Config",
    },
    {
      title: "Sobre o SAPE",
      icon: AboutIcon,
      path: "/AboutSape",
      alt: "About",
    },
  ];

  const footerIcons = [
    {
      icon: ApiIcon,
      path: "/ApiSis",
      className: "BubbleaApi",
      alt: "API",
    },
    {
      icon: UserIcon,
      path: "/Config",
      className: "BubbleaAcessibility",
      alt: "Accessibility",
    },
    {
      icon: UserIcon,
      className: "BubbleUser",
      alt: "User",
    },
  ];

  return (
    <>
      <header>
        <p className="TextInitial">
          Olá{user?.email ? `, ${user.email}` : ""}! <br />
          Seja bem-vindo ao SAPE!
        </p>
        <div className="BubbleHeader">
          <img src={HomeIcon} alt="Home" className="ImgHeader" />
        </div>
      </header>

      <div className="ChatBox">
        <p>Com o que podemos ajudar?</p>
      </div>

      <div className="OptionsChatBox">
        {menuOptions.map((option, index) => (
          <button
            key={index}
            className="optionButton"
            onClick={() => navigate(option.path)}
          >
            <img src={option.icon} alt={option.alt} className="ImgChatBox" />
            {option.title}
          </button>
        ))}
      </div>

      <footer>
        {footerIcons.map((icon, index) => (
          <div
            key={index}
            className={icon.className}
            onClick={() => icon.path && navigate(icon.path)}
          >
            <img src={icon.icon} alt={icon.alt} className="ImgFooter" />
          </div>
        ))}
      </footer>
    </>
  );
}

export default Index;
