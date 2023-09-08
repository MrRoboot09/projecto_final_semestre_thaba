import express from 'express';
import { getClientes, getCliente, criarCliente} from './database';
import { getClienteTelefone, getClienteTelefones, criarClienteTelefone } from './database.js';
import { getDepartamento, getDepartamentos, criarDepartamento } from './database.js';
import { getEmpresa, getEmpresas, criarEmpresa } from './database.js';
import { getGerente, getGerentes, criarGerente } from './database.js';
import { getTelefoneEmpresa, getTelefoneEmpresas, criarTelefoneEmpresa } from './database.js'
import { getTrabalhador, getTrabalhadores, criarTrabalhador } from './database.js';
import { getTelefoneTrabalhador, getTelefoneTrabalhadores, criarTelefoneTrabalhador } from './database.js';

const app = express();
app.use(express.json());

// criacao de rotas | colocando e obtendo as credenciais na tabele cliente

// obtendo dados do cliente atraves das rotas
app.get("/cliente", async (req, res) => {
    const clientes = await getClientes();
    res.send(clientes);
});

app.get("/cliente/:idCliente", async (req, res) => {
    const idCliente = req.params.idCliente;
    const cliente = await getCliente(idCliente);
    res.send(cliente);
});

// colocando dados do cliente atraves das rotas
app.post("/cliente", async (req, res) => {
    const { nome, apelido, dataNascimento, email, palavrapasse, endereco } = req.body;
    const cliente = await criarCliente(nome, apelido, dataNascimento, email, palavrapasse, endereco);
    res.status(201).send(cliente);
});

// criacao de rotas | colocando e obtendo as credenciais na tabele clientetelefone

// obtendo dados do telefone do cliente atraves das rotas
app.get("/clientetelefone", async (req, res) => {
    const clienteTelefones = await getClienteTelefones();
    res.send(clienteTelefones);
});

app.get("/clientetelefone/:idTelefone", async (req, res) => {
    const idTelefone = req.params.idTelefone;
    const clientetelefone = await getClienteTelefone(idTelefone);
    res.send(clientetelefone);
});

// colocando dados do telefone do cliente atraves das rotas
app.post("/clienteTelefone", async (req, res) => {
    const { idCliente, telefone } = req.body;
    const clienteTelefone = await criarClienteTelefone(idCliente, telefone);
    res.status(201).send(clienteTelefone);
});

// criacao de rotas | colocando e obtendo as credenciais na tabele departamento
// obtendo dados do departamento atraves das rotas
app.get("/departamento", async (req, res) => {
    const departamentos = await getDepartamentos();
    res.send(departamentos);
});

app.get("/departamento/:idDepartamento", async (req, res) => {
    const idDepartamento = req.params.idDepartamento;
    const departamento = await getDepartamento(idDepartamento);
    res.send(departamento);
});

// colocando dados do departamento atraves das rotas
app.post("/departamento", async (req, res) => {
    const {idGerente, producaoMensal, compraMaterial, nome } = req.body;
    const departamento = await criarDepartamento(idGerente, producaoMensal, compraMaterial, nome);
    res.status(201).send(departamento);
})

// criacao de rotas | colocando e obtendo as credenciais na tabele empresa
// obtendo dados da empresa atraves das rotas
app.get("/empresa", async (req, res) => {
    const empresas = await getEmpresas();
    res.send(empresas);
});

app.get("/empresa/:idEmpresa", async (req, res) => {
    const idEmpresa = req.params.idEmpresa;
    const empresa = await getEmpresa(idEmpresa);
    res.send(empresa);
});

// colocando dados da empresa atraves das rotas
app.post("/empresa", async (req, res) => {
    const { idGerente, gerenteNome, gerenteApelido, emailEmpresa, enderecoEmpresa, horaAbertura } = req.body;
    const empresa = await criarEmpresa(idGerente, gerenteNome, gerenteApelido, emailEmpresa, enderecoEmpresa, horaAbertura);
    res.status(201).send(empresa);
});

// criacao de rotas | colocando e obtendo as credenciais na tabele telefoneempresa
// obtendo dados do contacto atraves das rotas
app.get("/telefoneempresa", async (req, res) => {
    const telefoneempresas = await getTelefoneEmpresas();
    res.send(telefoneempresas);
});

app.get("/telefoneempresa/:idTelefone", async (req, res) => {
    const idTelefone = req.params.idTelefone;
    const telefoeempresa = await getTelefoneEmpresa(idTelefone);
    res.send(telefoeempresa);
});

// colocando dados do contacto da empresa atraves das rotas
app.post("/telefoneempresa", async (req, res) => {
    const { idEmpresa, telefone } = req.body;
    const telefoeempresa = await criarTelefoneEmpresa(idEmpresa, telefone);
    res.status(201).send(telefoeempresa);
});

// criacao de rotas | colocando e obtendo as credenciais na tabele gerente
// obtendo dados do gerente atraves das rotas
app.get("/gerente", async (req, res) => {
    const gerentes = await getGerentes();
    res.send(gerentes);
});

app.get("/gerente/:idGerente", async (req, res) => {
    const idGerente = req.params.idGerente;
    const gerente = await getGerente(idGerente);
    res.send(gerente);
});

// colocando dados do gerente atraves das rotas
app.post("/gerente", async (req, res) => {
    const { nome, apelido, cartao, nivelAcademico, endereco, email } = req.body;
    const gerente = await criarGerente(nome, apelido, cartao, nivelAcademico, endereco, email);
    res.status(201).send(gerente);
});

// criacao de rotas | colocando e obtendo as credenciais na tabele trabalhador
// obtendo dados do trabalhador atraves das rotas
app.get("/trabalhador", async (req, res) => {
    const trabalhadores = await getTrabalhadores();
    res.send(trabalhadores);
});

app.get("/trabalhador/:idTrabalhador", async (req, res) => {
    const idTrabalhador = req.params.idTrabalhador;
    const trabalhador = await getTrabalhador(idTrabalhador);
    res.status(201).send(trabalhador);
});

// colocando dados do trabalhador atraves das rotas
app.post("/trabalhador", async (req, res) => {
    const { idDepartamento, nome, apelido, cartao, endereco, email } = req.body;
    const trabalhador = await criarTrabalhador(idDepartamento, nome, apelido, cartao, endereco, email);
    res.status(201).send(trabalhador);
});

// criacao de rotas | colocando e obtendo as credenciais na tabela telefonetrabalhador
// obtendo dados do telefone atraves das rotas
app.get("/telefonetrabalhador", async (req, res) => {
    const telefonetrabalhadores = await getTelefoneTrabalhadores();
    res.send(telefonetrabalhadores);
});

app.get("/telefonetrabalhador/:idTelefone", async (req, res) => {
    const idTelefone = req.params.idTelefone;
    const telefonetrabalhador = await getTelefoneTrabalhador(idTelefone);

    res.status(201).send(telefonetrabalhador);
})

// colocando dados do telefone atraves das rotas
app.post("/telefonetrabalhador", async (req, res) => {
    const { idTrabalhador, telefone } = req.body;
    const telefonetrabalhador = await criarTelefoneTrabalhador(idTrabalhador, telefone);
    res.status(201).send(telefonetrabalhador);
});








