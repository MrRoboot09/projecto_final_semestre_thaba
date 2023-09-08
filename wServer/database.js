
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

// criar e selecionar  clientes na base de dados  do empresa thaba na tabela cliente

export async function getClientes() {
    const [rows] = await pool.query("select *from cliente");
    return rows;  
}

export async function getCliente(idCliente) {
    const [rows] = await pool.query(`select *from cliente where idCliente = ?`, [idCliente]);
    return rows[0];
}

export async function criarCliente(nome, apelido, dataNascimento, email, palavrapasse, endereco) {
    const result = await pool.query(`insert into cliente (nome, apelido, dataNascimento, email, palavrapasse, endereco) values (?, ?, ?, ?, ?, ?)`, [nome, apelido, dataNascimento, email, palavrapasse, endereco]);

    const id = result.insertId;
    return getCliente(id);
}

// criar e selecionar contactos do cliente na base de dados da empresa thaba na tabela clientetelefone

export async function getClienteTelefones() {
    const [rows] = await pool.query("select *from clientetelefone");
    return rows;
}

export async function getClienteTelefone(idTelefone){
    const [rows] = await pool.query(`select *from clientetelefone where idTelefone = ?`, [idTelefone]);
    return rows[0];
}

export async function criarClienteTelefone(idCliente, telefone) {
    const result = await pool.query(`insert into clientetelefone (idCliente, telefone) values (?, ?)`, [idCliente, telefone]);

    const id2 = result.insertId;
    return getCliente(id2);
}

// criar e selecionar departamento da loja na base de dados da empresa thaba na tabela departamento

export async function getDepartamentos() {
    const [rows] = await pool.query("select *from departamento");
    return rows;
}
export async function getDepartamento(idDepartamento) {
    const [rows] = await pool.query(`select *from departamento where idDepartamento = ?`, [idDepartamento]);
    return rows[0];
}

export async function criarDepartamento(idGerente, producaoMensal, compraMaterial, nome) {
    const result = await pool.query(`insert into departamento (idGerente, producaoMensal, compraMaterial, nome) values (?, ?, ?, ?)`, [idGerente, producaoMensal, compraMaterial, nome]);

    const id3 = result.insertId;
    return getDepartamento(id3);
}

// criar e selecionar dados da loja na base de dados da empresa thaba na tabela empresa

export async function getEmpresas() {
    const [rows] = await pool.query("select *from empresa");
    return rows;
}

export async function getEmpresa(idEmpresa) {
    const [rows] = await pool.query(`select *from empresa where idEmpresa =?`, [idEmpresa]);
    return rows[0];
}

export async function criarEmpresa(idGerente, gerenteNome, gerenteApelido, emailEmpresa, enderecoEmpresa, horaAbertura) {
    const result = await pool.query(`insert into empresa (idGerente, gerenteNome, gerenteApelido, emailEmpresa, enderecoEmpresa, horaAbertura) values (?, ?, ?, ?, ?, ?)`, [idGerente, gerenteNome, gerenteApelido, emailEmpresa, enderecoEmpresa, horaAbertura]);

    const id4 = result.insertId;
    return getEmpresa(id4);
}

// criar e selecionar contactos da loja na base de dados da empresa thaba na tabela telefoeempresa

export async function getTelefoneEmpresas() {
    const [rows] = await pool.query("select *from telefoneempresa");
    return rows[0];
}

export async function getTelefoneEmpresa(idTelefone) {
    const [rows] = await pool.query(`select *from telefoneempresa where idTelefone = ?`, [idTelefone]);
    return rows[0];
}

export async function criarTelefoneEmpresa(idEmpresa, telefone) {
    const result = await pool.query(`insert into telefoneempresa(idEmpresa, telefone) values (?, ?)`, [idEmpresa, telefone]);
    
    const id5 = result.insertId;
    return getTelefoneEmpresa(id5);
}

// criar e selecionar dados do gerente na base de dados da empresa thaba na tabela gerente

export async function getGerentes() {
    const [rows] = await pool.query("select *from gerente");
    return rows;
}

export async function getGerente(idGerente) {
    const [rows] = await pool.query(`select *from gerente where idGerente =?`, [idGerente]);
    return rows[0];
}

export async function criarGerente(nome, apelido, cartao, nivelAcademico, endereco, email) {
    const result = await pool.query(`insert into gerente(nome, apelido, cartao, nivelAcademico, endereco, email) values(?, ?, ?, ?, ?, ?)`, [nome, apelido, cartao, nivelAcademico, endereco, email]);

    const id6 = result.insertId;
    return getGerente(id6);
}

// criar e selecionar dados do trabalhador na base de dados da empresa thaba na tabela trabalhador

export async function getTrabalhadores() {
    const [rows] = await pool.query("select *from trabalhador");
    return rows;
}

export async function getTrabalhador(idTrabalhador) {
    const [rows] = await pool.query(`select *from trabalhador where idTrabalhador =?`, [idTrabalhador]);
    return rows[0];
}

export async function criarTrabalhador(idDepartamento, nome, apelido, cartao, endereco, email) {
    const result = await pool.query(`insert into trabalhador(idDepartamento, nome, apelido, cartao, endereco, email) values (?, ?, ?, ?, ?, ?)`, [idDepartamento, nome, apelido, cartao, endereco, email]);

    const id7 = result.insertId;
    return getTrabalhador(id7);
}

// criar e selecionar dados do trabalhador na base de dados da empresa thaba na tabela telefonetrabalhador

export async function getTelefoneTrabalhadores() {
    const [rows] = await pool.query("select *from telefonetrabalhador");
    return rows;
}

export async function getTelefoneTrabalhador(idTelefone) {
    const [rows] = await pool.query(`select *from telefonetrabalhador where idTelefone =?`, [idTelefone]);
    return rows[0];
}

export async function criarTelefoneTrabalhador(idTrabalhador, telefone) {
    const result = await pool.query(`insert into telefonetrabalhador(idTrabalhador, telefone) values(?, ?)`, [idTrabalhador, telefone]);

    const id8 = result.insertId;
    return getTelefoneTrabalhador(id8);
}

// operacao/funcionalidade do servidor, estado e conexao
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(404).send('Erro 404: Algo deu errado ao se conectar!');
});

app.listen(8080, () => {
    console.log('O servidor esta conectado na porta 8080');
});