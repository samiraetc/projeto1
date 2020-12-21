
  let locais = [] // crio um array para salvar os dados
  var markers = [];

  getEstabelecimentos = async () => {
    // crio um objeto com o metodo get
    // aguardo a requisição finalizar
    await fetch("json/locais.json", { method: 'get' })
      .then(resposta => resposta.json())
      .then(dados => locais = dados)
  
      locais.forEach(estabelecimentos => {
        
       for (var i = 0; i < locais.length; i++) {
        markers[i] = locais[i];

       }

       initMap(); // chama a funcao do mapa
       showImages(); //chama a funcao das imagens do destaque
      
    
    })
  
  }
  
  window.addEventListener("DOMContentLoaded", getEstabelecimentos) 

function initMap() {
    // cria o mapa com uma localizacao central
    var map = new
    google.maps.Map(document.getElementById('map'), {
        zoom: 13, // tamanho do zoom no mapa
        center: {lat: -22.9028038, lng: -47.0593757} // ponto central do mapa
    });

    // percorre o array e adiciona os pontos no mapa
    for(var y = 0; y <markers.length; y++){
        addMarker(markers[y]);
    }
   
     //funcao para criar varios pontos no mapa 
    function addMarker(props) {
        // cria um novo ponto no mapa
        var marker = new google.maps.Marker({
            position: {lat: props.latitude, lng: props.longitude}, 
            map: map
        })

        // cria o card para mostrar as informaçoes do estabelecimento
        let newContent = 
        `<div id="infos"> 
            <h3 style={font-size: 10px}> ${props.nome}</h3> 
            <p> ${props.endereco.rua} - ${props.endereco.bairro} <br/ >
            ${props.endereco.cidade} - ${props.endereco.uf} </br>
            ${props.endereco.cep} </p>
            <p>${props.telefone}</p>
            <a href="${props.instagram}"><img src="assets/instagram.png" id="instagram" alt=""></a>
        </div>`

        if (props.nome) {
            // cria um novo card 
            var infoWindow = new google.maps.InfoWindow({
                content: newContent
            })
         
            //ao clicar, ele mostra o card
            marker.addListener('click', function(){
                infoWindow.open(map, marker);
            })
        }
    }
}

function showImages() {
    // Necessário declarar a variável img 
    var img = ["assets/images/seorosa.jpg", 
    "assets/images/saobento.jpg", 
    "assets/images/candreva.jpg",
    "assets/images/pinkelephant.jpg",
    "assets/images/pub.jpg",
    "assets/images/club88.webp"];
    var aleatorio1 = Math.floor(Math.random() * img.length);
    var aleatorio2 = Math.floor(Math.random() * img.length);
    var aleatorio3 = Math.floor(Math.random() * img.length);
  
    for (var i = 0; i < 3; i++) {
      if (aleatorio1 === aleatorio2 && aleatorio1 === aleatorio3) {
          aleatorio1 = Math.floor(Math.random() * img.length);
      } else if (aleatorio2 === aleatorio1 && aleatorio2 === aleatorio3) {
          aleatorio2 = Math.floor(Math.random() * img.length);
      } else if (aleatorio3 === aleatorio1 && aleatorio3 === aleatorio2) {
          aleatorio3 = Math.floor(Math.random() * img.length);
      } else {
          document.getElementById("imagem1").innerHTML = "<img id='imgDestaque' src='" + img[aleatorio1] + "'>";
          document.getElementById("imagem2").innerHTML = "<img id='imgDestaque' src='" + img[aleatorio2] + "'>";
          document.getElementById("imagem3").innerHTML = "<img id='imgDestaque' src='" + img[aleatorio3] + "'>";
      }
    }
    
}




function search() {
    var busca = document.getElementById('txtBusca').value; // pega o elemento busca no html
   
   console.log(busca);

   var resultados = " "; // variavel criada para pegar os dados do card e colocar na div
    // percorre o array 
    for(var y = 0; y <markers.length; y++){     
         // verifica se busca igual ao valor das comparacoes
        if(markers[y].endereco.bairro.includes(busca) || 
        markers[y].endereco.rua.includes(busca) ||
        markers[y].nome.includes(busca) ||
        markers[y].endereco.cep.includes(busca) ||
        markers[y].categoria.includes(busca)) {
      
            document.getElementById('cardBusca').style = {display: 'block'}; //mostro a div que estava escondido
           
            cardResultados  = `<div id="infos" > 
            <h3 style={font-size: 10px}> ${markers[y].nome}</h3> 
            <p>Categoria: ${markers[y].categoria}</p>
            <p> ${markers[y].endereco.rua} - ${markers[y].endereco.bairro} <br/ >
            ${markers[y].endereco.cidade} - ${markers[y].endereco.uf} </br>
            ${markers[y].endereco.cep} </p>
            <p>${markers[y].telefone}</p>
            <a href="${markers[y].instagram}"><img src="/app/assets/instagram.png" id="instagram" alt=""></a>
        </div>` // crio o card que vai exibir no html

        resultados = resultados + cardResultados; // envio o html para resultados e concateno
      
        console.log(cardResultados); // verifico os dados no console
    
        } else {
            document.getElementById('buscad').innerHTML = "Nenhum resultado encontrado";
        }  
        
    }

    document.getElementById('buscad').innerHTML = resultados; // pego o resultado do card e envio para div
    

}


function fechar() {

    document.getElementById("cardBusca").style.display = 'none'; 

    console.log("entrou aqui");
}

