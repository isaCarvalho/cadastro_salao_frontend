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
    fetch("http://localhost:8080/pessoas")
    .then(response => response.json())
    .then(response => {

        console.log(response);
        let ul = document.createElement("ul");
        ul.className = "collection with-header";
        form.innerHTML = `<h4>Clientes</h4>`;

        response.forEach(pessoa => {
            let li = document.createElement("li");
            let extraStr = `<a href="#" onclick="excluir(${pessoa.id})"><i class="material-icons">cancel</i></a>`;

            li.className = "collection-item";
            li.innerHTML = pessoa.primeiro_nome + " " + pessoa.sobrenome + extraStr;

            ul.appendChild(li);
        });

        form.appendChild(ul);
    }).catch(console.log("nao foi possivel carregar os dados"))
}

form.addEventListener("submit", function(event)
{
    event.preventDefault();

    console.log(event.target);
    let body = new FormData(event.target);
    console.log(body);

    fetch("http://localhost:8080/pessoa/", {method: 'post', body})
    .then(response => response.json())
    .then(response => {
        console.log(response);
    })
    .catch(console.log("não foi possivel cadastrar a pessoa"));
})

function excluir(id)
{
    fetch(`http://localhost:8080/pessoa/${id}`, {method: 'delete'})
    .then(response => response.json())
    .then(response => console.log(response))
}

function pesquisar()
{
    let nome = document.getElementById('first_namep').value;
    let sobrenome = document.getElementById('last_namep').value;
    console.log(sobrenome)

    fetch("http://localhost:8080/pessoas")
    .then(response => response.json())
    .then(response => {
        response.forEach(pessoa => {
            if (pessoa.primeiro_nome === nome && pessoa.sobrenome === sobrenome)
            {
                let first_name = document.getElementById('first_name');
                first_name.value = pessoa.primeiro_nome;
                document.querySelector('label[for=first_name]').className = "active"

                let last_name = document.getElementById('last_name');
                last_name.value = pessoa.sobrenome;
                document.querySelector('label[for=last_name]').className = "active"

                let email = document.getElementById('email');
                email.value = pessoa.email;
                document.querySelector('label[for=email]').className = "active"

                let password = document.getElementById('password');
                password.value = pessoa.password;
                document.querySelector('label[for=password]').className = "active"
            }
        })
    });
}
