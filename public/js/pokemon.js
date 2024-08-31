const sectionOcultaDeCombate = document.getElementById('combate')
const sectionReiniciar = document.getElementById('reiniciar')
const botonPokemonJugador = document.getElementById('boton-seleccionar-pokemon')
const botonreset = document.getElementById('reiniciar');
const spanPokemonJugador = document.getElementById('pokemon-jugador');
const spanPokemonEnemigo = document.getElementById('pokemon-enemigo');
const spanvidasJugador = document.getElementById('vidas-jugador')
const spanvidasEnemigo = document.getElementById('vidas-enemigo')
const sectionMensajes = document.getElementById("resultado")
const ataqueDelJugador = document.getElementById("ataque-del-jugador")
const ataqueDelEnemigo = document.getElementById("ataque-del-enemigo")
const p = document.createElement('p');
const contenedorTarjetas= document.getElementById("contenedor-tarjetas")
const botonesAtaque = document.getElementById("botones-de-ataque")
const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let enemigoId = null
let jugadorId = null
let victoriasJugador = 0
let victoriasEnemigo = 0
let pokemones = []
let ataqueEnemigo = []
let ataqueJugador = []
let opcionDePokemones;
let pokemonJugador;
let pokemonEnemigo;
let pokemonesEnemigos = []
//pokemones
let inputRowlet;
let inputLitten;
let inputPopplio;
let inputAbra;
let inputMakuhita;
let inputPikipek;
let botonFire;
let botonEarth;
let botonWatter;
let botonVuelo;
let botonLucha;
let botonPsiquico;
let botones;
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = 'imagenes/mapaPokemon.jpg'
let alturaBuscada
const anchoMaximoMapa = 600;
let anchoDelMapa = window.innerWidth - 20

if (anchoDelMapa > anchoMaximoMapa){
    anchoDelMapa = anchoMaximoMapa 
}
alturaBuscada = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaBuscada


class Pokemon{
    constructor(nombre, foto, tipo, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.ataques = []
        this.tipo = tipo
        this.ancho = (mapa.width/100)*8
        this.alto = this.ancho
        this.x = getRandomNumber(0,mapa.width - this.ancho)
        this.y = getRandomNumber(0,alturaBuscada - this.alto)
        this.pokemonImagenMapa = new Image()
        this.pokemonImagenMapa.src = foto
        this.iconoBatalla = new Image()
        this.velocidadx = 0
        this.velocidady = 0
    }
    pintarPokemonJugadorEnMapa(){
        lienzo.drawImage(
            this.pokemonImagenMapa,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
    pintarEnemigosEnMapa(){lienzo.drawImage(this.pokemonImagenMapa,this.x,this.y,this.ancho,this.alto,)
    }
}
let rowlet = new Pokemon('Rowlet', 'imagenes/rowletPeluche.jpg', 'Planta')
let litten = new Pokemon('Litten', 'imagenes/littenPeluche.jpg', 'Fuego')
let popplio = new Pokemon('Popplio', 'imagenes/popplioPeluche.jpg', 'Agua')
let makuhita = new Pokemon('Makuhita', 'imagenes/makuhitaPeluche.jpg', 'Lucha')
let abra = new Pokemon('Abra','imagenes/abraPeluche.jpg', 'Psiquico')
let pikipek = new Pokemon('Pikipek', 'imagenes/pikipekPeluche.jpg', 'Volador')

const ROWLET_ATAQUES = [   
    {nombre: '⛰️', id: 'boton-earth'},
    {nombre: '⛰️', id: 'boton-earth'},
    {nombre: '⛰️', id: 'boton-earth'},
    {nombre: '💧', id: 'boton-watter'},
    {nombre: '🔥', id: 'boton-fire'}
]
rowlet.ataques.push(...ROWLET_ATAQUES)

const LITTEN_ATAQUES = [
    {nombre: '🔥', id: 'boton-fire'},
    {nombre: '🔥', id: 'boton-fire'},
    {nombre: '🔥', id: 'boton-fire'},
    {nombre: '⛰️', id: 'boton-earth'},
    {nombre: '💧', id: 'boton-watter'},
]
litten.ataques.push(...LITTEN_ATAQUES)

const POPPLIO_ATAQUES = [
    {nombre: '💧', id: 'boton-watter'},
    {nombre: '💧', id: 'boton-watter'},
    {nombre: '💧', id: 'boton-watter'},
    {nombre: '⛰️', id: 'boton-earth'},
    {nombre: '🔥', id: 'boton-fire'}
]
popplio.ataques.push(...POPPLIO_ATAQUES)

const MAKUHITA_ATAQUES = [    
    {nombre: '✊', id: 'boton-lucha'},
    {nombre: '✊', id: 'boton-lucha'},
    {nombre: '✊', id: 'boton-lucha'},
    {nombre: '💧', id: 'boton-watter'},
    {nombre: '🔥', id: 'boton-fire'}
]
makuhita.ataques.push(...MAKUHITA_ATAQUES)

const ABRA_ATAQUES = [
    {nombre: '👁️', id: 'boton-ilusion'},
    {nombre: '👁️', id: 'boton-ilusion'},
    {nombre: '👁️', id: 'boton-ilusion'},
    {nombre: '⛰️', id: 'boton-earth'},
    {nombre: '💧', id: 'boton-watter'},
]
abra.ataques.push(...ABRA_ATAQUES)

const PIKIPEK_ATAQUES = [
    {nombre: '🪽', id: 'boton-vuelo'},
    {nombre: '🪽', id: 'boton-vuelo'},
    {nombre: '🪽', id: 'boton-vuelo'},
    {nombre: '⛰️', id: 'boton-earth'},
    {nombre: '🔥', id: 'boton-fire'}
]
pikipek.ataques.push(...PIKIPEK_ATAQUES)
pokemones.push(rowlet,litten,popplio,makuhita,abra,pikipek)

    //botones de combate
function iniciarJuego() {
    sectionOcultaDeCombate.style.display = 'none'
    sectionVerMapa.style.display= 'none'
    pokemones.forEach((pokemon) => {
        opcionDePokemones = `<input type="radio" name="pokemon" id=${pokemon.nombre}>
        <label id="fondo-boton" for=${pokemon.nombre}>
        <p>${pokemon.nombre}</p>
        <img src=${pokemon.foto} alt = ${pokemon.nombre}></label>
    `;
    contenedorTarjetas.innerHTML += opcionDePokemones;
    })    
    inputRowlet = document.getElementById('Rowlet');
    inputLitten = document.getElementById('Litten');
    inputPopplio = document.getElementById('Popplio');
    inputMakuhita = document.getElementById('Makuhita');
    inputPikipek = document.getElementById('Pikipek');
    inputAbra = document.getElementById('Abra');

    sectionReiniciar.style.display = 'none'
    botonPokemonJugador.addEventListener('click', seleccionarPokemonJugador);
    botonreset.addEventListener('click', reset);

    unirseAlJuego()
}
function unirseAlJuego(){
    fetch("http://192.168.32.148:8080/unirse")
    .then(function(res){
        console.log(res);
        if(res.ok){
            res.text()
            .then(function(respuesta){
                console.log(respuesta);
                jugadorId = respuesta
            })
        }
        
    })
}
    //seleccion pokemon jugador & enemigo
function seleccionarPokemonJugador() {
    if (inputRowlet.checked) {
        spanPokemonJugador.innerHTML = inputRowlet.id
        pokemonJugador = inputRowlet.id
    } else if (inputLitten.checked) {
        spanPokemonJugador.innerHTML = inputLitten.id
        pokemonJugador = inputLitten.id
    } else if (inputPopplio.checked) {
        spanPokemonJugador.innerHTML = inputPopplio.id
        pokemonJugador = inputPopplio.id
    } else if (inputMakuhita.checked) {
        spanPokemonJugador.innerHTML = inputMakuhita.id
        pokemonJugador = inputMakuhita.id
    } else if (inputAbra.checked) {
        spanPokemonJugador.innerHTML = inputAbra.id
        pokemonJugador = inputAbra.id
    } else if (inputPikipek.checked) {
        spanPokemonJugador.innerHTML = inputPikipek.id
        pokemonJugador = inputPikipek.id
    } else {
        alert('POKEMONを選んでください');
        return;
    }
    seleccionarMokepon(pokemonJugador)
    extraerAtaques(pokemonJugador);
    iniciarmapa()
}
function enviarAtaques(){

    fetch(`http://192.168.32.148:8080/pokemon/${jugadorId}/ataques`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
    intervalo = setInterval(obtenerAtaques, 500)
}
function obtenerAtaques() {
    fetch(`http://192.168.32.148:8080/pokemon/${enemigoId}/ataques`)
    .then(function (res) {
        if (res.ok) {
            res.json()
            .then(function ({ataques}) {
                if (ataques.length === 5){
                    ataqueEnemigo = ataques
                    combate()
                }
            })
        }
    })
}
function seleccionarMokepon(pokemonJugador){
    fetch(`http://192.168.32.148:8080/pokemon/${jugadorId}`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            pokemon: pokemonJugador
        })
    }
    )
    postMessage
}
function extraerAtaques(pokemonJugador){
    let ataques = []
    for (let i = 0; i < pokemones.length; i++) {
        if(pokemonJugador === pokemones[i].nombre)
        ataques = pokemones[i].ataques
    }    
    mostrarAtaques(ataques)
}
function mostrarAtaques(ataques){
    botonesAtaque.innerHTML = '';
    ataques.forEach((ataque) => {
        let ataquesPokemon = `
         <button class="boton-de-ataque BAtaques" id=${ataque.id}>${ataque.nombre}</button>
        `;
        botonesAtaque.innerHTML += ataquesPokemon
    })
    botonFire = document.getElementById('boton-fire')
    botonEarth = document.getElementById('boton-earth')
    botonWatter = document.getElementById('boton-watter')
    botonVuelo = document.getElementById('boton-vuelo')
    botonLucha = document.getElementById('boton-lucha')
    botonPsiquico = document.getElementById('boton-psiquico')
    botones = document.querySelectorAll('.BAtaques')
}
function secuenciaAtaque(){
    botones.forEach((boton)=>{
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥'){
            ataqueJugador.push('🔥')
            boton.style.background= '#112f58'
            boton.disabled = true
        }
        else if (e.target.textContent === '👁️'){
            ataqueJugador.push('👁️')
            boton.style.background= '#112f58'
            boton.disabled = true
        }
        else if (e.target.textContent === '🪽'){
            ataqueJugador.push('🪽')
            boton.style.background= '#112f58'
            boton.disabled = true
        }
        else if (e.target.textContent === '✊'){
            ataqueJugador.push('✊')
            boton.style.background= '#112f58'
            boton.disabled = true
        }
        else if (e.target.textContent === '💧'){
            ataqueJugador.push('💧')
            boton.style.background= '#112f58'
            boton.disabled = true
        }
        else if (e.target.textContent === '⛰️'){
            ataqueJugador.push('⛰️')
            boton.style.background= '#112f58'
            boton.disabled = true
        }
        if (ataqueJugador.length === 5) {
            imprimirAtaquesJugador()
            enviarAtaques()
        }
    })
    })
}

//Sistema de impresion de ataques
function agregarTextoJugador(contenido){
    const nuevoTexto = document.createElement('p')
    nuevoTexto.textContent = contenido;
    const contenedor = document.getElementById('ataque-del-jugador')
    contenedor.appendChild(nuevoTexto);
}
function agregarTextoEnemigo(contenido){
    const nuevoTexto = document.createElement('p')
    nuevoTexto.textContent = contenido;
    const contenedor = document.getElementById('ataque-del-enemigo')
    contenedor.appendChild(nuevoTexto);
}
function imprimirAtaquesJugador(){
    ataqueJugador.forEach((n)=>{
       agregarTextoJugador(n)
    })
}
function imprimirAtaquesEnemigo(){
       ataqueEnemigo.forEach((n)=>{
        agregarTextoEnemigo(n)
    })
}


//sistema aleatorio de seleccion para pokemon
function seleccionarPokemonEnemigo(pokemonEnemigo) {
    spanPokemonEnemigo.innerHTML = pokemonEnemigo.nombre
    arregloAtaquesEnemigo = pokemonEnemigo.ataques
    let sectionOcultaDePokemon = document.getElementById('ポケモンを選ぶ')
    sectionOcultaDePokemon.style.display = 'none'
    secuenciaAtaque();
}
//creacion del sistema de combate
function aleatorio() {
    return Math.floor(Math.random() * (pokemones.length)) ;
}
function indexAmbosOponente(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}
function combate(){
    imprimirAtaquesEnemigo()
    clearInterval(intervalo)

    const reglas = {
        '🔥': ['⛰️', '🪽', '✊'],
        '💧': ['🔥', '🪽','✊'],
        '⛰️': ['💧', '👁️'],
        '✊': ['⛰️', '🪽'],
        '👁️': ['⛰️', '💧', '🔥']
    };

    for (let index = 0; index < ataqueJugador.length; index++){
        indexAmbosOponente(index, index);
    
        if (ataqueJugador[index] === ataqueEnemigo[index]){
            // Empate
        }
        else if (reglas[ataqueJugador[index]]?.includes(ataqueEnemigo[index])) {
            victoriasJugador++;
        } 
        else if (reglas[ataqueEnemigo[index]]?.includes(ataqueJugador[index])) {
            victoriasEnemigo++;
        } else {
            // Caso inesperado o un empate si ambas reglas no se aplican
        }
        
    }
    
    spanvidasJugador.innerHTML = victoriasJugador;
    spanvidasEnemigo.innerHTML = victoriasEnemigo;
    revisarVidas();
    
}


function revisarVidas(){
    if (victoriasEnemigo < victoriasJugador){
        crearMensajeFinal('HAZ GANADO EL COMBATE!')
    }
    else if 
        (victoriasEnemigo === victoriasJugador){
        crearMensajeFinal('HA SIDO UN EMPATE!')
    }
    else{
        crearMensajeFinal('HAZ PERDIDO EL COMBATE!')
    }
}
function crearMensajeFinal(resultado) {
    sectionMensajes.innerHTML = (resultado)
    sectionReiniciar.style.display = 'block'
}
function reset(){
    location.reload()
}
function pintarPokemonMapa(){

    pokemonJugadorObjeto.x = pokemonJugadorObjeto.x + pokemonJugadorObjeto.velocidadx
    pokemonJugadorObjeto.y = pokemonJugadorObjeto.y + pokemonJugadorObjeto.velocidady
    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(mapaBackground,0,0,mapa.width,mapa.height)
    pokemonJugadorObjeto.pintarPokemonJugadorEnMapa()

    enviarPosicion(pokemonJugadorObjeto.x, pokemonJugadorObjeto.y)

    pokemonesEnemigos.forEach(function (pokemon){
        pokemon.pintarEnemigosEnMapa()
        revisarColision(pokemon)
    })
}
function enviarPosicion(x,y){
    fetch(`http://192.168.32.148:8080/pokemon/${jugadorId}/posicion`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res){
        if (res.ok){
            res.json()
            .then(function({enemigos}){
                console.log(enemigos);
                pokemonesEnemigos = enemigos.map(function (enemigo) {
                    let pokemonEnemigo = null
                    const pokemonNombre = enemigo.pokemon.nombre || ""
                    if (pokemonNombre === "Rowlet"){
                        pokemonEnemigo = new Pokemon('Rowlet', 'imagenes/rowletPeluche.jpg', 'Planta', enemigo.id)
                    }
                    else if (pokemonNombre === "Litten") {
                        pokemonEnemigo = new Pokemon('Litten', 'imagenes/littenPeluche.jpg', 'Fuego', enemigo.id)
                    }
                    else if (pokemonNombre === "Popplio") {
                        pokemonEnemigo = new Pokemon('Popplio', 'imagenes/popplioPeluche.jpg', 'Agua', enemigo.id)
                    }
                    else if (pokemonNombre === "Makuhita") {
                         pokemonEnemigo = new Pokemon('Makuhita', 'imagenes/makuhitaPeluche.jpg', 'Lucha', enemigo.id)
                    }
                    else if (pokemonNombre === "Abra") {
                         pokemonEnemigo = new Pokemon('Abra','imagenes/abraPeluche.jpg', 'Psiquico', enemigo.id)
                    }
                    else if (pokemonNombre ==="Pikipek") {
                        pokemonEnemigo = new Pokemon('Pikipek', 'imagenes/pikipekPeluche.jpg', 'Volador', enemigo.id)
                    }
                    pokemonEnemigo.x = enemigo.x
                    pokemonEnemigo.y = enemigo.y

                    return pokemonEnemigo
                })

            })
        }
    })
}


function moverPokemonArriba(){
    pokemonJugadorObjeto.velocidady = -5
    pintarPokemonMapa()
}
function moverPokemonIzquierda(){
    pokemonJugadorObjeto.velocidadx = -5
    pintarPokemonMapa()
}
function moverPokemonAbajo(){
    pokemonJugadorObjeto.velocidady = + 5
    pintarPokemonMapa()
}
function moverPokemon(){
    pokemonJugadorObjeto.velocidadx = + 5
    pintarPokemonMapa()
}
function detenerMovimiento(){
    pokemonJugadorObjeto.velocidadx = 0
    pokemonJugadorObjeto.velocidady = 0
}
function teclaEspichada(event){
    switch (event.key) {
        case 'w':
            moverPokemonArriba()
            break;
        case 's':
            moverPokemonAbajo()
            break;
        case 'a':
            moverPokemonIzquierda()
            break;
        case 'd':
            moverPokemon()
            break;
        default:
            break;
    }
}
function obtenerObjetoPokemon(){
    for (let i = 0; i < pokemones.length; i++) {
        if (pokemonJugador === pokemones[i].nombre) {
            return pokemones[i];   
        }
        
    }
}
function iniciarmapa(){
    pokemonJugadorObjeto = obtenerObjetoPokemon(pokemonJugador)
    let sectionOcultaDePokemon = document.getElementById('ポケモンを選ぶ')
    sectionOcultaDePokemon.style.display = 'none'
    sectionVerMapa.style.display = "flex";
    intervalo = setInterval(pintarPokemonMapa,50)
    window.addEventListener('keydown', teclaEspichada)
    window.addEventListener('keyup', detenerMovimiento)
}
function revisarColision(pokemonEnemigo) {
    const arribaEnemigo = pokemonEnemigo.y;
    const izquierdaEnemigo = pokemonEnemigo.x;
    const abajoEnemigo = pokemonEnemigo.y + pokemonEnemigo.alto;
    const derechaEnemigo = pokemonEnemigo.x + pokemonEnemigo.ancho;
    const arribaPokemon = pokemonJugadorObjeto.y;
    const izquierdaPokemon = pokemonJugadorObjeto.x;
    const abajoPokemon = pokemonJugadorObjeto.y + pokemonJugadorObjeto.alto;
    const derechaPokemon = pokemonJugadorObjeto.x + pokemonJugadorObjeto.ancho;

    if (
        abajoPokemon < arribaEnemigo ||
        arribaPokemon > abajoEnemigo ||
        derechaPokemon < izquierdaEnemigo ||
        izquierdaPokemon > derechaEnemigo
    ) {
        return; // Sale de la función si no hay colisión
    }

    detenerMovimiento(); // Detiene el movimiento si hay colisión

    clearInterval(intervalo); // Detiene el envío repetido de la posición

    enemigoId = pokemonEnemigo.id
    sectionOcultaDeCombate.style.display = 'flex';
    sectionVerMapa.style.display = 'none';
    seleccionarPokemonEnemigo(pokemonEnemigo)

    // Aquí podría iniciar el combate o mostrar un mensaje
    alert("¡Te atacó un " + pokemonEnemigo.nombre + " salvaje!");
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
window.addEventListener('load', iniciarJuego)