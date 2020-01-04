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
    fetch("http://localhost:8080/vendas")
    .then(response => response.json())
    .then(response => {

        console.log(response);
        let ul = document.createElement("ul");
        ul.className = "collection with-header";
        form.innerHTML = `<h4>Vendas</h4>`;

        response.forEach(venda => {
            let li = document.createElement("li");
            let extraStr = `<a href="#" onclick="excluir(${venda.id})"><i class="material-icons">cancel</i></a>`;

            li.className = "collection-item";
            li.innerHTML = "Id do cliente: " + venda.id_pessoa + " - Id do servico: " + venda.id_servico + extraStr;

            ul.appendChild(li);
        });

        form.appendChild(ul);
    }).catch(console.log("nao foi possivel carregar os dados"))
}

// FAZER ISSO DEPOIS PESQUISANDO O NOME DO CLIENTE E DO SERVIÇO
form.addEventListener("submit", function(event)
{
    event.preventDefault();

    console.log(event.target);
    let body = new FormData(event.target);
    console.log(body);

    fetch("http://localhost:8080/venda/", {method: 'post', body})
    .then(response => response.json())
    .then(response => {
        console.log(response);
    })
    .catch(console.log("não foi possivel cadastrar a servico"));
})

function excluir(id)
{
    fetch(`http://localhost:8080/venda/${id}`, {method: 'delete'})
    .then(response => response.json())
    .then(response => console.log(response))
}