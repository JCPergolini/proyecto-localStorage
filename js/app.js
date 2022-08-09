//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//Event listeners
eventListeners();


function eventListeners(){

    //Cuando agrega nuevo tweet
      formulario.addEventListener('submit', agregarTweet);

    //Cuando el doc esta listo
    document.addEventListener('DOMContentLoaded', ()=>{
        tweets = JSON.parse (localStorage.getItem ('tweets')) || [];
        
        console.log(tweets);
    
        crearHTML();
    });



    
}





//Funciones

function agregarTweet(e){
    e.preventDefault();


    //Text area
    const tweet = document.querySelector('#tweet').value;
   

    //Validación
    if(tweet===''){
        mostrarError('Un mensaje no puede ir vacio');


        return;//Evita que se ejecuten mas lineas de codigo
    }


    const tweetObj = {
        id : Date.now(),
        tweet

    }

    //Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];
   
    //Agregar HTML y crearlo
    crearHTML();

    //Reiniciar HTML
    formulario.reset();

}


//Mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');


    //Insertarlo
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Elimina alerta
    setTimeout(()=>{
        mensajeError.remove();
    },3000)

}


//Lista de tweets
function crearHTML(){

    limpiarHTML();
    
    if(tweets.length > 0){
        tweets.forEach(tweet =>{

            //Crear un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //Añador funcion eliminar
            btnEliminar.onclick = () =>{
                borrarTweet(tweet.id);
            }

            //Crear HTML

            const li = document.createElement('li');

           //Añadir texto
            li.innerText = tweet.tweet;

             //Asignar el boton
              li.appendChild(btnEliminar);
            
            //Insertar en el HTML
            listaTweets.appendChild(li);

        } );

    }

    sincronizarStorage();
}

//Agregar a localStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Elimina un tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    
    crearHTML();
}

//Limpiar HTML
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}




