import { useState, FormEvent } from "react";
import { createClient } from "@supabase/supabase-js";
import sapeLogo from "./assets/sapezin.png";
import "./App.css";

// Interface para tipar os dados do formulário
interface RegisterFormData {
  matricula: string;
  NomeCompleto: string;
  DataNascimento: string;
  senha: string;
}

// Tipando os dados do formulário que vêm do FormData
interface FormDataEntries extends RegisterFormData {
  [key: string]: string;
}

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

import { useSupabase } from "./SupabaseContext";

function Register() {
  const supabase = useSupabase();
  const [isAluno, setIsAluno] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const form = e.currentTarget;
      const formEntries = Object.fromEntries(
        new FormData(form)
      ) as FormDataEntries;

      // Validações dos campos
      if (
        !formEntries.matricula ||
        !formEntries.NomeCompleto ||
        !formEntries.DataNascimento ||
        !formEntries.senha
      ) {
        throw new Error("Todos os campos são obrigatórios");
      }

      // Formatando a data
      const [day, month, year] = formEntries.DataNascimento.split("/");
      const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
        2,
        "0"
      )}`;

      // Inserindo no Supabase
      const { data, error: supabaseError } = await supabase
        .from("users")
        .insert([
          {
            matricula: formEntries.matricula,
            nome_completo: formEntries.NomeCompleto,
            data_nascimento: formattedDate,
            senha: formEntries.senha, // Em produção, use hash
            tipo_usuario: isAluno ? "aluno" : "professor",
          },
        ])
        .select();

      if (supabaseError) throw supabaseError;

      if (data) {
        alert("Cadastro realizado com sucesso!");
        form.reset();
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      console.error("Erro no cadastro:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="BolhaCompleta">
          <div className="CirculoPerfil">
            <img src={sapeLogo} className="logo react" alt="Logo" />
          </div>
        </div>
        <p className="TextoCentro">
          <br />
          Olá, mais uma vez! <br /> <br />
          Informe os dados requisitados para ter acesso ao sistema.
        </p>
        <br />
        <div className="button-group">
          <button
            className={`toggle-button ${isAluno ? "active" : ""}`}
            onClick={() => setIsAluno(true)}
            type="button"
          >
            Aluno
          </button>
          <button
            className={`toggle-button ${!isAluno ? "active" : ""}`}
            onClick={() => setIsAluno(false)}
            type="button"
          >
            Professor
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <br />
          <input
            type="text"
            id="matricula"
            name="matricula"
            placeholder="Matrícula"
            className="inputs"
            required
          />
          <br />
          <br />
          <input
            type="text"
            id="NomeCompleto"
            name="NomeCompleto"
            placeholder="Nome Completo"
            className="inputs"
            required
          />
          <br />
          <br />
          <input
            type="text"
            id="DataNascimento"
            name="DataNascimento"
            placeholder="Data de Nascimento (EX: XX/XX/XXXX)"
            className="inputs"
            required
            pattern="\d{2}/\d{2}/\d{4}"
          />
          <br />
          <br />
          <input
            type="password"
            id="senha"
            name="senha"
            placeholder="Senha"
            className="inputs"
            required
          />
          <br />
          <br />
          <button className="botaoentrar" type="submit" disabled={loading}>
            {loading ? "CADASTRANDO..." : "FINALIZAR CADASTRO"}
          </button>
        </form>
        <br />
      </div>
    </>
  );
}

export default Register;
