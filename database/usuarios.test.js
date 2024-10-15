const {
  criarUsuario,
  consultarUsuario,
  atualizarUsuario,
  deletarUsuario,
} = require("./usuarios");

let usuarioCriado;

test("criarUsuario deve criar novo usuário", async () => {
  const result = await criarUsuario({
    nome: "João Silva",
    email: "joao.silva1@example.com",
    senha: "senha123",
    tipo: "cliente",
  });
  usuarioCriado = result[0];
  expect(usuarioCriado).toBeTruthy();
});

test("consultarUsuario deve retornar um usuário", async () => {
  const data = await consultarUsuario(usuarioCriado.id);
  expect(data.length).toBeGreaterThan(0);
});

test("atualizarUsuario deve mudar todos os dados", async () => {
    const novosDados = {
        nome: 'Nome Completo',
        email: 'email.completo@example.com',
        senha: 'novaSenha123',
        tipo: 'administrador'
      };
      const result = await atualizarUsuario(usuarioCriado.id, novosDados);
      expect(result[0]).toMatchObject(novosDados);
});

test("deletarUsuario deve deletar usuário", async () => {
  const result = await deletarUsuario(usuarioCriado.id);
  expect(result).toBeFalsy();
});
