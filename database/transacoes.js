
const supabase = require("./connection");

const {atualizarSaldo} = require("./contas");

const criarTransacao = async (transacao) => {
  const { data, error } = await supabase
    .from("transactions")
    .insert(transacao)
    .select();
  if (error) {
    console.error("Erro ao criar transação: ", error.message);
    return null;
  }
  console.log("Transação criada com sucesso!");
  const valor = transacao.valor;

  if(transacao.conta_destino_id){
    const conta_destino = transacao.conta_destino_id;
    await atualizarSaldo(conta_destino, valor);
  }else if(transacao.conta_origem_id){
    const conta_origem = transacao.conta_origem_id;
    await atualizarSaldo(conta_origem, valor * -1);
  }else{
  }
  return data;
};

module.exports = {
  criarTransacao,
};
