//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const vaciaCarrito = document.querySelector('#vaciar-carrito');
const cursoV = document.querySelector('.row');


let articulosCarrito = [];


cargarEventListeners();

function cargarEventListeners (){
    //cuando presionemos listaCursos se va a ejecutar la funcion de agregarCurso
    listaCursos.addEventListener('click',agregarCurso);

    cursoV.addEventListener('click',abrirVentana);

    //Elimina cursos de carrito
    carrito.addEventListener('click',eliminarCurso);

    vaciaCarrito.addEventListener('click',()=>{
        articulosCarrito = [];//reseteamos el arreglo

        limpiarHTML(contenedorCarrito);//limpiamos html
    })
}


//Fuciones
function agregarCurso(e){ //con e identificamos a que elemento le damos click
    e.preventDefault(); //Quita el evento predefinido en este caso no se va a recargar la pagina nuevamente

    if(e.target.classList.contains('agregar-carrito')){ //identificacions si al elemento que le damos click contiene la clase de agregar-carrito
        const CursoSeleccionado = e.target.parentElement.parentElement;//seleccionamos al padre del padre del elemento al que le damos click
        leerDatosCurso(CursoSeleccionado);
    }else if(e.target.classList.contains('imagen-curso')){
        abrirVentana(e.target.parentElement);
        
    }
}
//elimina un curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id'); //Obtenos el id del curso

        const cursos = articulosCarrito.map(curso => {
            if (curso.id === cursoId) {  //verificamos si el curso es el que selecionamos si no lo es retornamos el curso      
                    curso.cantidad--; //a la cantidad le eliminamos 1 y lo renornamos
                    return curso; 
            }else{
                return curso; 
            }
        });

        articulosCarrito = [...cursos];
       
        articulosCarrito = articulosCarrito.filter(curso => curso.cantidad !== 0);//nos va a retonar los cursos que en cantidad sean diferentes a 0 
        //nos va a retornar los que sean diferente al curso que seleccionamos
        
        carritoHTML(); //Volvemos a iterar sobre el carrito
    }
    
    
}

//lee el contendio del elemtento al que le damos click
function leerDatosCurso(curso){
    
    //creamos un objeto con los datos del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'), //Con getAttribute obtenemos un atributo del elemento
        cantidad:1
    }
    
    //agregamos elementos al carrito 

    //revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id); //come todo el arreglo y ejecuta el codigo buscando si hay un elemento que coinsida

    if (existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => { // creamos un nuevo arreglo con la funcion map
            if (curso.id === infoCurso.id) {
                curso.cantidad++;  //si el curso ya existe se agragara a su propieda cantidad
                return curso;   // Y regresa el objeto actualizado
            }else{
                return curso; //sino es igual va a regresar el elemento como lo tenemos guardado 
            }
        });

        articulosCarrito = [...cursos]

    }else{

        articulosCarrito = [...articulosCarrito, infoCurso];//Primero se crea una copia de lo que contenga el arreglo y enseguida le agregamos el nuevo curso
    }

    carritoHTML();
}

function carritoHTML(){

    limpiarHTML(contenedorCarrito);


    articulosCarrito.forEach(curso => { //se ejecutara por cada elemento que haya en el arreglo 

        const {imagen, titulo, precio, cantidad, id} = curso;//se ahace un destruction a los objetos y se crean las variables
        const row = document.createElement('TR') //Creamos una etiqueta tr
        row.innerHTML= `
            <td><img src="${imagen}" width="120"></td>
            <td>${titulo}</td>
            <td> ${precio} </td>
            <td>${cantidad}</td>
            <td> <a href="#" class="borrar-curso" data-id="${id}"> X </a> </td>
        `; //a la etiquta que añadimos una fila con la la imgane del curso

        contenedorCarrito.appendChild(row);//le agregamos el contenido al elemento que seleccionamos en la variable contenedorCarrito
    });
}

function limpiarHTML(elemento){
    //Forma lenta
    // elemento.innerHTML ='';

    //Forma mas rapida
   
    while(elemento.firstChild){//Verificamos si el elemento tiene un uno y si tiene lo eliminamos
        elemento.removeChild(elemento.firstChild);
    }
}

//creamos una ventana modal
function abrirVentana(curso){
    
    const infoCurso ={
        nombre: curso.querySelector('h4').textContent,
        imagen: curso.querySelector('img').src,
        precio: curso.querySelector('.precio span').textContent,
        autor: curso.querySelector('.info-card p').textContent,
        estrellas: curso.querySelector('.info-card img').src

    }
    crearVentana(infoCurso);
}  

function crearVentana(curso){
    const {imagen, nombre, precio, autor,estrellas} = curso;
    const ventanaM = document.createElement('DIV');

    ventanaM.classList.add('ventana-modal');
    ventanaM.innerHTML = `
        <div class="contenido-ventana">
        
            <img src="${imagen}" class="imagen "width="300">
            
            <div>
                <h4>${nombre}</h4>
                <p>${autor}</p>
                <img src="${estrellas}" >
                <p>${precio}</p>
            </div>
        </div>
    `; 
   

    //cerra Modal    
    ventanaM.addEventListener('click',function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar');
        ventanaM.remove();
    })

    const body = document.querySelector('body');
    body.classList.add("fijar");
    body.appendChild(ventanaM);


}


