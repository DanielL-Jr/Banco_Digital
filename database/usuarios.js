const supabase = require("./connection");

const criarUsuario = async (usuario) => {
  const { data, error } = await supabase.from("users").insert(usuario).select();
  if (error) {
    console.error("Erro ao criar usuário: ", error.message);
  } else {
    console.log("Usuário criado com sucesso!");
    return data;
  }
};

const consultarUsuario = async (id) => {
  console.log(`Id do usuário: ${id}`);
  const { data, error } = await supabase.from("users").select("*").eq("id", id);
  if (error) {
    console.error("Erro ao consultar usuário: ", error.message);
  } else {
    return data;
  }
};

const atualizarUsuario = async (id, dados) => {
  const { data, error } = await supabase
    .from("users")
    .update(dados)
    .eq("id", id)
    .select();
  if (error) {
    console.error("Erro ao atualizar usuário: ", error.message);
  } else {
    console.log("Usuário atualizado com sucesso!");
    return data;
  }
};
const deletarUsuario = async (id) => {
  const { data, error } = await supabase.from("users").delete().eq("id", id);

  if (error) {
    console.error("Erro ao excluir usuário: ", error.message);
  } else {
    console.log("Usuário exluido com sucesso!");
  }
};

module.exports = {
  criarUsuario,
  consultarUsuario,
  atualizarUsuario,
  deletarUsuario,
};
