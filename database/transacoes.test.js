const { criarUsuario, deletarUsuario } = require("./usuarios.js");
const { criarConta, verificarSaldo, deletarConta } = require("./contas.js");
const {
  criarTransacao,
  lerTransacoes,
  atualizarTransacao,
  deletarTransacao,
} = require("./transacoes.js");

let usuarioCriado = [];
let contaCriada = [];
let transacao = [3];
// Criando usuários e contas para usar em transações
beforeAll(async () => {
  usuarioCriado[0] = await criarUsuario({
    nome: "João Carvalho",
    email: "joao.carvalho@example.com",
    senha: "senha123",
    tipo: "cliente",
  });
  usuarioCriado[1] = await criarUsuario({
    nome: "João Pereira",
    email: "joao.pereira@example.com",
    senha: "senha123",
    tipo: "cliente",
  });

  contaCriada[0] = await criarConta({
    numero_conta: 456789,
    tipo: "corrente",
    saldo: 0.0,
    usuario_id: usuarioCriado[0][0].id,
  });
  contaCriada[1] = await criarConta({
    numero_conta: 654321,
    tipo: "corrente",
    saldo: 0.0,
    usuario_id: usuarioCriado[1][0].id,
  });
});

// DEPÓSITO
test("criarTransacao pode criar depósito em uma conta", async () => {
  let dados = {
    conta_destino_id: contaCriada[0][0].numero_conta,
    tipo: "deposito",
    valor: 100.0,
  };

  transacao[0] = await criarTransacao(dados);
  expect(transacao[0][0]).toMatchObject({
    conta_destino_id: contaCriada[0][0].numero_conta,
    tipo: "deposito",
    valor: 100.0,
  });
  let saldo = await verificarSaldo(contaCriada[0][0].numero_conta);
  expect(saldo.saldo).toBe(100.0);
  expect(transacao[0][0]).toHaveProperty("id");
  expect(transacao[0][0]).toHaveProperty("data");
});

// TRANSFERÊNCIA
test("criarTransacao pode criar transferencia entre contas", async () => {
  let dados = {
    conta_origem_id: contaCriada[0][0].numero_conta,
    conta_destino_id: contaCriada[1][0].numero_conta,
    tipo: "transferencia",
    valor: 100.0,
  };

  transacao[1] = await criarTransacao(dados);

  expect(transacao[1][0]).toMatchObject({
    conta_origem_id: contaCriada[0][0].numero_conta,
    conta_destino_id: contaCriada[1][0].numero_conta,
    tipo: "transferencia",
    valor: 100.0,
  });

  saldo = await verificarSaldo(contaCriada[1][0].numero_conta);
  expect(saldo.saldo).toBe(100.0);

  // Verifica se a transação tem os campos adicionais esperados
  expect(transacao[1][0]).toHaveProperty("id");
  expect(transacao[1][0]).toHaveProperty("data");
});

// SAQUE
test("criarTransacao pode criar saque de uma conta", async () => {
  let dados = {
    conta_origem_id: contaCriada[1][0].numero_conta,
    tipo: "saque",
    valor: 100.0,
  };
  transacao[2] = await criarTransacao(dados);
  expect(transacao[2][0]).toMatchObject({
    conta_origem_id: contaCriada[1][0].numero_conta,
    tipo: "saque",
    valor: 100.0,
  });
  let saldo = await verificarSaldo(contaCriada[1][0].numero_conta);
  expect(saldo.saldo).toBe(0);
  expect(transacao[2][0]).toHaveProperty("id");
  expect(transacao[2][0]).toHaveProperty("data");
});

// FILTRO
test("lerTrasacoes pode consultar várias transações", async () => {
  let filtros = {
    tipo: "deposito",
  };
  const transacoes = await lerTransacoes(filtros);
  expect(transacoes[0]).toMatchObject(transacao[0][0]);
});

// DELETAR TRANSAÇÃO
test("deletarTransacao pode apagar uma transação", async () => {
  let dados = transacao[0][0];

  let delecao = await deletarTransacao(transacao[0][0].id);

  expect(delecao[0]).toMatchObject(dados);

  dados = transacao[1][0];
  delecao = await deletarTransacao(transacao[1][0].id);
  expect(delecao[0]).toMatchObject(dados);

  dados = transacao[2][0];
  delecao = await deletarTransacao(transacao[2][0].id);
  expect(delecao[0]).toMatchObject(dados);
});

// Limpeza: deletar usuários e contas criados para os testes
afterAll(async () => {
  //Deletar contas
  await deletarConta(contaCriada[0][0].numero_conta);
  await deletarConta(contaCriada[1][0].numero_conta);

  //Deletar usuários
  await deletarUsuario(usuarioCriado[0][0].id);
  await deletarUsuario(usuarioCriado[1][0].id);
});
