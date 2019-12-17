let form = document.getElementById("form");

function loadContent(id)
{
    let path = 'content' + id + '.html';
    fetch(path)
    .then(response => response.text())
    .then(response => {
        form.innerHTML = response;
    });
}

function load()
{
    fetch("http://localhost:8080/api/servicos")
    .then(response => response.json())
    .then(response => {

        console.log(response);
        let ul = document.createElement("ul");
        ul.className = "collection with-header";
        form.innerHTML = `<h4>Serviços</h4>`;

        response.forEach(servico => {
            let li = document.createElement("li");
            let extraStr = `<a href="#" onclick="excluir(${servico.id})"><i class="material-icons">cancel</i></a>`;

            li.className = "collection-item";
            li.innerHTML = servico.nome + " " + servico.preco + extraStr;

            ul.appendChild(li);
        });

        form.appendChild(ul);
    }).catch(console.log("nao foi possivel carregar os dados"))
}

let loadDelete = () => load(true);
let loadList = () => load(false);

form.addEventListener("submit", function(event)
{
    event.preventDefault();

    console.log(event.target);
    let body = new FormData(event.target);
    console.log(body);

    fetch("http://localhost:8080/api/servico/", {method: 'post', body})
    .then(response => response.json())
    .then(response => {
        console.log(response);
    })
    .catch(console.log("não foi possivel cadastrar a servico"));
})

function excluir(id)
{
    fetch(`http://localhost:8080/api/servico/${id}`, {method: 'delete'})
    .then(response => response.json())
    .then(response => console.log(response))
}

function pesquisar()
{
    let nome = document.getElementById('nome').value;

    fetch("http://localhost:8080/api/servicos")
    .then(response => response.json())
    .then(response => {
        response.forEach(servico => {
            console.log(servico);
            console.log(nome);
            if (servico.nome === nome)
            {
                console.log('ok');
                let novoNome = document.getElementById('novoNome');
                novoNome.value = servico.nome;
                document.querySelector('label[for=novoNome]').className = "active"

                let preco = document.getElementById('preco');
                preco.value = servico.preco;
                document.querySelector('label[for=preco]').className = "active"
            }
        })
    });
}