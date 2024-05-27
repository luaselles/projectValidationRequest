import express from 'express';
import path from 'path';

const host = 'localhost';
const porta = 3000;

let listaEmpresa = [];

const app = express();
//configurar o express para manipular corretamente os dados 
//quando eles forem submetidos via método POST
app.use(express.urlencoded({ extended: true })); //habilita a biblioteca QueryString

app.use(express.static(path.join(process.cwd(), 'publico')));
function cadastrarEmpresa(requisicao, resposta) {

    const cnpj = requisicao.body.cnpj;
    const razaosocial = requisicao.body.razaosocial;
    const nomefantasia = requisicao.body.nomefantasia;
    const endereco = requisicao.body.endereco;
    const cidade = requisicao.body.cidade;
    const estado = requisicao.body.estado;
    const cep = requisicao.body.cep;
    const email = requisicao.body.email;
    const telefone = requisicao.body.telefone;

    //verificando se os campos foram preenchidos (não estão vazios)
    if (cnpj && razaosocial && nomefantasia && endereco && cidade && estado && cep && email && telefone) {
        listaEmpresa.push({
            cnpj: cnpj,
            razaosocial: razaosocial,
            nomefantasia: nomefantasia,
            endereco: endereco,
            cidade: cidade,
            estado: estado,
            cep: cep,
            email: email,
            telefone: telefone
        });
        resposta.redirect('/listarEmpresa');
    }
    else {
        resposta.write(`
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Página de cadastro de Empresa</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        </head>
        
        <body style="background-color: #213332;" class="text-center">
        
            <div class="row">
                <div class="col-6 offset-3">
                    <div class="container m-5 rounded text-start" style="background-color: #2c4443; color: white; ">
                        <form method="POST" action='/cadastrarEmpresa' class="row g-3 p-5 needs-validation" novalidate>
                        <h2 class="display-6 my-4">Cadastro de Empresa</h2>
        
                            <!-- / Cnpj /  -->
                            <div class="col-md-6">
                                <label for="nome" class="form-label">Cnpj:</label>
                                <input type="text" class="form-control" id="cnpj" name="cnpj" value="${cnpj}" required>
                        `);
        if (cnpj == "") {
            resposta.write(`
                        <div class="alert alert-danger m-2" role="alert">
                            Por favor, informe um CNPJ válido.
                        </div>
            `);
        }
        resposta.write(`
        </div>
                    <!-- \ Cnpj \ -->

                    <!-- \ Razão Social \ -->
                    <div class="col-md-6">
                        <label for="razaosocial" class="form-label">Razão Social:</label>
                        <input type="text" class="form-control" id="razaosocial" name="razaosocial" value="${razaosocial}" required>
        `);
        if (razaosocial == "") {
            resposta.write(`<div  class="alert alert-danger m-2" role="alert">
                                Por favor, informe a razão social da empresa.
                            </div>`);
        }
        resposta.write(`
        </div>
            <!-- \ Razão Social \ -->

            <!-- / Nome Fantasia / -->
            <div class="col-md-6">
                <label for="nomefantasia" class="form-label">Nome Fantasia:</label>
                <div class="input-group has-validation">
                    <span class="input-group-text" id="inputGroupPrepend">@</span>
                    <input type="text" class="form-control" id="nomefantasia" name="nomefantasia"
                        aria-describedby="inputGroupPrepend" value="${nomefantasia}" required>
                </div>
        `);
        if (nomefantasia == "") {
            resposta.write(`<div class="alert alert-danger m-2" role="alert">
                                Por favor, informe o nome fantasia da empresa.
                            </div>`);
        }
        resposta.write(`   
        </div>
                    <!-- \ Nome Fantasia \ -->

                    <!-- / Endereço / -->
                    <div class="col-md-6">
                        <label for="endereco" class="form-label">Endereço:</label>
                        <input type="text" class="form-control" id="endereco" name="endereco"
                            aria-describedby="inputGroupPrepend"  value="${endereco}" required> 
        `);
        if (endereco == "") {
            resposta.write(`<div class="alert alert-danger m-2" role="alert">
                                Por favor, informe um endereço para empresa.
                            </div>`);
        }
        resposta.write(`
        </div>
                    <!-- \ Endereço \ -->

                    <!-- / Cidade / -->
                    <div class="col-md-6">
                        <label for="cidade" class="form-label">Cidade:</label>
                        <input type="text" class="form-control" id="cidade" value="${cidade}" name="cidade" required>`
        );
        if (cidade == "") {
            resposta.write(`<div class="alert alert-danger m-2" role="alert">
                                Por favor, informe uma cidade.
                            </div>`);
        }
        resposta.write(`
        </div>
        <!-- \ Cidade \ -->

        <!-- / UF / -->
        <div class="col-md-6">
            <label for="estado" class="form-label">UF:</label>
            <select class="form-select" id="estado" name="estado" required>
                <option selected disabled value=${estado}>Escolha um estado...</option>
                <option value="AC">AC</option>
                <option value="AL">AL</option>
                <option value="AP">AP</option>
                <option value="AM">AM</option>
                <option value="BA">BA</option>
                <option value="CE">CE</option>
                <option value="DF">DF</option>
                <option value="ES">ES</option>
                <option value="GO">GO</option>
                <option value="MA">MA</option>
                <option value="MT">MT</option>
                <option value="MS">MS</option>
                <option value="MG">MG</option>
                <option value="PA">PA</option>
                <option value="PB">PB</option>
                <option value="PR">PR</option>
                <option value="PE">PE</option>
                <option value="PI">PI</option>
                <option value="RJ">RJ</option>
                <option value="RN">RN</option>
                <option value="RS">RS</option>
                <option value="RO">RO</option>
                <option value="RR">RR</option>
                <option value="SC">SC</option>
                <option value="SP">SP</option>
                <option value="SE">SE</option>
                <option value="TO">TO</option>
            </select>
        `        );
        if (!estado) {
            resposta.write(`<div class="alert alert-danger m-2" role="alert">
                                Por favor, selecione um estado.
                            </div>`);
        }
        resposta.write(` </div>
        <!-- \ UF \ -->

        <!-- / CEP / -->
        <div class="col-md-6">
            <label for="cep" class="form-label">CEP:</label>
            <input type="text" class="form-control" id="cep" name="cep" value=${cep} required>`);
        if (cep == "") {
            resposta.write(`<div class="alert alert-danger m-2" role="alert">
                                Por favor, informe o cep.
                            </div>`);
        }
        resposta.write(`</div>
        <!-- \ CEP \ -->

        <!-- / E-MAIL / -->
        <div class="col-md-6">
            <label for="email" class="form-label">E-MAIL:</label>
            <input type="email" class="form-control" id="email" name="email" value=${email} required>`);
        if (email == "") {
            resposta.write(`<div class="alert alert-danger m-2" role="alert">
                                Por favor, informe o e-mail válido.
                            </div>`);
        }
        resposta.write(`</div>
        <!-- \ E-MAIL \ -->

        <!-- / Telefone / -->
        <div class="col-md-12">
            <label for="telefone" class="form-label">telefone:</label>
            <input type="email" class="form-control" id="telefone" name="telefone" value=${telefone} required>`);
        if (telefone == "") {
            resposta.write(`<div class="alert alert-danger m-2" role="alert">
                                Por favor, informe um telefone válido.
                            </div>`);
        }

        resposta.write(` </div>
        <!-- \ Telefone \ -->

        <div class="row mb-3 mt-5">
            <div class="col-6 d-grid gap-2">
                <a class="btn btn-block btn-secondary" href="/">Voltar</a>
            </div>
            <div class="col-6 d-grid gap-2">
                <button class="btn btn-block btn-primary" type="submit" style="border-color: #213332; background-color: #213332;">Cadastrar</button>
            </div>
        </div>
    </form>
</div>
</div>
</div>

</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
crossorigin="anonymous"></script>

</html>`);
        resposta.end(); //finaliza o envio da resposta!
    }//fim else

}

//Quando a empresa enviar uma requisição do tipo POST
//para o endpoint 'http://localhost:3000/cadastrarEmpresa'
//executa a função 'cadastrarEmpresa()'
app.post('/cadastrarEmpresa', cadastrarEmpresa);

app.get('/listarEmpresa', (req, resp) => {
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<title>Resultado do cadastro</title>');
    resp.write('<meta charset="utf-8">');
    resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">')
    resp.write('</head>');
    resp.write('<body>');
    resp.write('<h1>Lista de Empresa</h1>');
    resp.write('<table class="table table-striped">');
    resp.write('<tr>');
    resp.write('<th>CNPJ</th>');
    resp.write('<th>Nome Empresa</th>');
    resp.write('<th>Endereço</th>');
    resp.write('<th>Cidade</th>');
    resp.write('<th>Estado</th>');
    resp.write('<th>CEP</th>');
    resp.write('<th>E-mail</th>');
    resp.write('</tr>');
    for (let i = 0; i < listaEmpresa.length; i++) {
        resp.write('<tr>');
        resp.write(`<td>${listaEmpresa[i].cnpj}`);
        resp.write(`<td>${listaEmpresa[i].nomefantasia}`);
        resp.write(`<td>${listaEmpresa[i].endereco}`);
        resp.write(`<td>${listaEmpresa[i].cidade}`);
        resp.write(`<td>${listaEmpresa[i].estado}`);
        resp.write(`<td>${listaEmpresa[i].cep}`);
        resp.write(`<td>${listaEmpresa[i].email}`);
        resp.write('</tr>');
    }
    resp.write('</table>');
    resp.write('<a href="/">Voltar</a>');
    resp.write('</body>');
    resp.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>')
    resp.write('</html>');
    resp.end();
});

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
})