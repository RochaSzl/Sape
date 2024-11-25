import { useNavigate } from "react-router-dom";
import Sapezin from "./assets/sapezin.png";
import HomeIcon from "./assets/IconIndex.png";

function AboutSape() {
  const navigate = useNavigate();

  const achievements = [
    "Conquistamos o 2º lugar da Olimpíada de Inovação do IFRJ, a INOVAIFRJ",
    "Em Outubro de 2023, fomos convidados a participar da RIO INNOVATION WEEK, o maior evento de inovação da América Latina",
    "Em 2024, participamos da World Creativity Day, um evento de inovação patrocinado pela ONU",
    "Agora, estamos saindo do campo teórico e fazendo, como Trabalho de Conclusão de Curso, o SAPE",
  ];

  const principles = [
    "Acessibilidade digital",
    "Inclusão no ensino",
    "Melhoria no aprendizado",
  ];

  return (
    <>
      <div className="PictureSape">
        <div className="BubblePicture">
          <img src={Sapezin} className="ImgSape" alt="Logo SAPE" />
        </div>
      </div>

      <p>
        ➔ O sape é um projeto estudantil feito para atender estudantes com
        necessidades específicas.
      </p>

      <p>Têm como princípios:</p>
      <ul>
        {principles.map((principle, index) => (
          <li key={index}>{principle}</li>
        ))}
      </ul>

      {achievements.map((achievement, index) => (
        <p key={index}>➔ {achievement}</p>
      ))}

      <p>É o SAPE: um projeto de alunos, feito para alunos! :)</p>

      <footer>
        <div className="BubbleHome" onClick={() => navigate("/Index")}>
          <img src={HomeIcon} className="ImgFooter" alt="Voltar para Home" />
        </div>
      </footer>
    </>
  );
}

export default AboutSape;
