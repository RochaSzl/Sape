import { useState, FormEvent } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Link, useNavigate } from "react-router-dom";
import sapeLogo from "./assets/sapezin.png";
import "./App.css";
import { useSupabase } from "./SupabaseContext";

// Defina as interfaces para tipagem
interface UserData {
  id: string;
  matricula: string;
  nome_completo: string;
  tipo_usuario: "aluno" | "professor";
  senha: string;
}

interface FormData {
  matricula: string;
  senha: string;
}

// Inicialize o cliente Supabase com tipagem
const supabase: SupabaseClient = createClient(
  "https://olxfvicqflitnfwukmjr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9seGZ2aWNxZmxpdG5md3VrbWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5NDgwMDQsImV4cCI6MjA0NjUyNDAwNH0.YxQRe9KX_npsPGMQJXeO3QwNtFUD_lKhtqvFzDQvm6w"
);

function Login() {
  const { supabase } = useSupabase();
  const [isAluno, setIsAluno] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formElement = e.currentTarget;
      const formData = new FormData(formElement);
      const { matricula, senha } = Object.fromEntries(
        formData.entries()
      ) as unknown as FormData;

      // Buscar o usuário
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("matricula", matricula)
        .eq("tipo_usuario", isAluno ? "aluno" : "professor")
        .single();

      if (userError) {
        throw new Error("Usuário não encontrado ou tipo de usuário incorreto");
      }

      const typedUserData = userData as UserData;

      // Verificar a senha
      if (typedUserData.senha !== senha) {
        throw new Error("Senha incorreta");
      }

      // Armazenar dados do usuário
      localStorage.setItem(
        "userData",
        JSON.stringify({
          id: typedUserData.id,
          matricula: typedUserData.matricula,
          nome_completo: typedUserData.nome_completo,
          tipo_usuario: typedUserData.tipo_usuario,
        })
      );

      navigate("/Index");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      console.error("Erro no login:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="BolhaCompleta">
          <div className="CirculoPerfil">
            <img src={sapeLogo} className="logo react" alt="Logo SAPE" />
          </div>
        </div>
        <p className="TextoCentro">
          <br />
          Olá! <br />
          Bem vindo ao SAPE - Sistema de auxílio para estudos! <br /> Faça seu
          login para aproveitar todas as ferramentas da plataforma{" "}
          <code>:)</code>
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
          {error && (
            <div className="error-message">
              <br />
              {error}
            </div>
          )}
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
            {loading ? "ENTRANDO..." : "ENTRAR!"}
          </button>
        </form>

        <br />

        <p>
          Não se registrou ainda?
          <Link to="/register">
            {" "}
            Clique aqui! <code> ;)</code>
          </Link>
        </p>
        <p>Esqueceu sua senha? Entre em contato com a secretaria local.</p>
        <p>
          É o SAPE: um projeto de alunos, feito para alunos! <code>;)</code>
        </p>
      </div>
    </>
  );
}

export default Login;
