const supabase = require("./connection");

const criarConta = async (conta) => {
  const { data, error } = await supabase
    .from("accounts")
    .insert(conta)
    .select();
  if (error) {
    console.error("Erro ao criar conta: ", error.message);
    return null;
  }
  console.log("Conta criada com sucesso!");
  return data;
};

const lerContas = async () => {
  const { data, error } = await supabase.from("accounts").select("*");
  if (error) {
    console.error("Erro ao ler contas: ", error.message);
    return [];
  }
  return data;
};

const verificarSaldo = async (numero) => {
    console.log(numero);
    const { data, error } = await supabase.from("accounts").select("*").eq("numero_conta", numero);
    if (error) {
      console.error("Erro ao consultar saldo: ", error.message);
      return null;
    }
    return data;
  };

const atualizarConta = async (id, dados) => {
  const { data, error } = await supabase
    .from("accounts")
    .update(dados)
    .eq("id", id)
    .select();
  if (error) {
    console.error("Erro ao atualizar conta: ", error.message);
    return null;
  }
  console.log("Conta atualizada com sucesso!");
  return data;
};

const deletarConta = async (id) => {
  const { data, error } = await supabase
    .from("accounts")
    .delete()
    .eq("id", id)
    .select();
  if (error) {
    console.error("Erro ao deletar conta: ", error.message);
    return null;
  }
  console.log("Conta deletada com sucesso!");
  return data;
};

module.exports = {
    criarConta,
    lerContas,
    verificarSaldo,
    atualizarConta,
    deletarConta
}