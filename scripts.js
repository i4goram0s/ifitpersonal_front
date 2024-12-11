/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/

const getList = async () => {
  let url = 'http://127.0.0.1:5000/exercicios';
  var lista = document.getElementById('ListaExercicios');
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {           
      data.exercicios.forEach(item => montaCard([item.nome, item.link, item.descricao],lista))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/

getList()


/*
  --------------------------------------------------------------------------------------
  Função para cadastrar um exercício na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/

const postItem = async (formNome, formLink, formDescricao) => {
  const formData = new FormData();
  formData.append('nome', formNome);
  formData.append('link', formLink);
  formData.append('descricao', formDescricao);

  let url = 'http://127.0.0.1:5000/exercicio';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
      return 404;
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para deletar um exercício da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/

const deleteItem = (elemento) => {
   var card = elemento.parentElement.parentElement.parentElement;
   var item = elemento.parentElement.parentElement.getElementsByClassName("card-title")[0].innerHTML; 
  if (confirm("Você realmente deseja remover o exercicio?")) {
    console.log(item)
    let url = 'http://127.0.0.1:5000/exercicio?nome=' + item;
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
         card.remove(); 
      });
  }
}

/*
  --------------------------------------------------------------------------------------------------------------------
  Função para adicionar um novo exercício com nome, descrição e link do video para listagem nos exerícios cadastrados 
  --------------------------------------------------------------------------------------------------------------------
*/

const newItem = () => {
  let textoNomeExercicio = document.getElementById("nomeExercicio").value;
  let textoLinkVideo = document.getElementById("linkVideo").value;
  let textoDescricao = document.getElementById("descricao").value;

  if (nomeExercicio === '') {
    alert("Informe um exercicio válido");
  } else {
    var item = [textoNomeExercicio, textoLinkVideo, textoDescricao]
    var lista = document.getElementById('ListaExercicios');
    montaCard(item, lista)
    postItem(textoNomeExercicio, textoLinkVideo, textoDescricao)
    alert("Item adicionado!")
  }
}

/*
  --------------------------------------------------------
  Função para montagem de card de exercício a ser listado 
  --------------------------------------------------------
*/

const montaCard = (item, elementolista) =>{
  var atributoEmbedVideo = item[1].split("v=")[1];
  const h2 = document.getElementById("myH2");
  let html = "<div class=\"col-sm-3 mb-3\">"+
                        "<div class=\"card\">"+
                            "<div class=\"embed-responsive embed-responsive-1by1\">"+
                                "<iframe class=\"embed-responsive-item\" src=\"https://www.youtube.com/embed/"+ atributoEmbedVideo +"?si=jmn40KxHd2joJc06\" allowfullscreen></iframe>"+
                              "</div>"+
                            "<div class=\"card-body\">"+
                              "<h5 class=\"card-title\">"+ item[0] +"</h5>"+
                              "<p class=\"card-text\">"+ item[2] +"</p>"+
                              "<a onClick = \" deleteItem(this) \" href=\"#\" class=\"btn btn-danger ExcluiExercicio\">Excluir</a>"+
                            "</div>"+
                        "</div>"+
                    "</div>";
  elementolista.insertAdjacentHTML("beforeEnd", html);


}
