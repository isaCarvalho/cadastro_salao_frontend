let form = document.getElementById("formLogin");

form.addEventListener("submit", function(event)
{
    event.preventDefault();

    // console.log(event.target);
    let body = new FormData(event.target);
    // console.log(body);

    fetch("http://localhost:8080/login", {method: 'post', body: body})
    .then(response => response.json())
    .then(response => {
        alert(response.message); // VER A MENSAGEM DO EMAIL INCORRETO NA API

        if (response.message === "usuario logado com sucesso")
        {
            window.location.href = "view/inicial.html";
        }
        else
        {
            form.reset();
        }
    })
})
