import "./App.css";
import HomeIcon from "./assets/IconIndex.png";
import ConfigIcon from "./assets/ConfigIcon.png";
import ApiIcon from "./assets/ApiIcon.png";
import UserIcon from "./assets/UserIcon.png";
function Config() {
  const goToPage = (page: string) => {
    window.location.href = page;
  };

  return (
    <>
      <header>
        <p className="TextInitial">
          Olá, usuário! <br /> Para eventuais dúvidas, entre em contato com a
          nossa equipe
        </p>
        <div className="BubbleHeader">
          <img src={ConfigIcon} className="ImgHeader" />
        </div>
      </header>

      <div className="OptionsConfig">
        <button className="TemaAplicativo">Mudar o tema</button>
        <button className="Feedback">Entrar em contato</button>
        <button className="Logout">Sair da conta</button>
      </div>

      <footer>
        <div className="BubbleHome" onClick={() => goToPage("/Index")}>
          <img src={HomeIcon} className="ImgFooter" />
        </div>
        <div className="BubbleaApi" onClick={() => goToPage("/ApiSis")}>
          <img src={ApiIcon} className="ImgFooter" />
        </div>
        <div className="BubbleUser">
          <img src={UserIcon} className="ImgFooter" />
        </div>
      </footer>
    </>
  );
}

export default Config;
