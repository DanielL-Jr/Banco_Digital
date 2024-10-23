const { criarUsuario, deletarUsuario } = require("./usuarios.js");
const {
  criarConta,
  lerContas,
  verificarSaldo,
  atualizarConta,
  deletarConta,
} = require("./contas.js");

let usuarioCriado;
let contaCriada;

beforeAll(async () => {
  // Criando um usuário para ser usado nos testes de conta
  usuarioCriado = await criarUsuario({
    nome: "João Silva",
    email: "joao.silva2@example.com",
    senha: "senha123",
    tipo: "cliente",
  });
});

test("criarConta deve criar uma nova conta", async () => {
  const conta = {
    numero_conta: "123456",
    tipo: "corrente",
    saldo: 100.0,
    usuario_id: usuarioCriado[0].id,
  };
  const result = await criarConta(conta);
  contaCriada = result[0];
  expect(contaCriada).toMatchObject(conta);
});
test("lerContas deve retornar contas", async () => {
  const contas = await lerContas();
  expect(contas.length).toBeGreaterThan(0);
});

test("verificarSaldo deve retornar o saldo da conta", async () => {
  const result = await verificarSaldo(contaCriada.numero_conta);
  expect(result[0]).toMatchObject(contaCriada);
});

test("atualizarConta deve atualizar uma conta", async () => {
  const novosDados = {
    saldo: 200.0,
  };
  const result = await atualizarConta(contaCriada.numero_conta, novosDados);
  expect(result[0].saldo).toBe(200.0);
});

test("deletarConta deve deletar uma conta", async () => {
  const result = await deletarConta(contaCriada.numero_conta);
  expect(result).toBeTruthy();
});

afterAll(async () => {
  // Limpeza: deletar o usuário criado para os testes
  await deletarUsuario(usuarioCriado[0].id); // Certifique-se de que há uma função deletarUsuario
});
