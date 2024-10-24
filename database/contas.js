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
  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("numero_conta", numero);
  if (error) {
    console.error("Erro ao consultar saldo: ", error.message);
    return null;
  }
  return data[0];
};

const atualizarConta = async (numero_conta, dados) => {
  const { data, error } = await supabase
    .from("accounts")
    .update(dados)
    .eq("numero_conta", numero_conta)
    .select();
  if (error) {
    console.error("Erro ao atualizar conta: ", error.message);
    return null;
  }
  console.log("Conta atualizada com sucesso!");
  return data;
};

const atualizarSaldo = async (numero_conta, valor) => {
  const conta = await verificarSaldo(numero_conta);
  const saldoAntigo = conta.saldo;
  const saldoNovo = saldoAntigo + valor;
  console.log(`Saldo Antigo: ${saldoAntigo}`);
  console.log(`Saldo Novo: ${saldoNovo}`)
  const { data, error } = await supabase
    .from("accounts")
    .update({
      saldo: saldoNovo,
    })
    .eq("numero_conta", numero_conta)
    .select();
  if (error) {
    console.error("Erro ao atualizar saldo: ", error.message);
    return null;
  }
  console.log("Saldo atualizado com sucesso!");
  return data;
};

const deletarConta = async (numeroConta) => {
  const { data, error } = await supabase
    .from("accounts")
    .delete()
    .eq("numero_conta", numeroConta)
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
  atualizarSaldo,
  deletarConta,
};
