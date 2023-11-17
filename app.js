
document.addEventListener('DOMContentLoaded', function () {


    const info = {
        nombre:'',
        precio:'',
        cantidad:'',
        categoria:''
    }

    // variables y constantes

    const agregar = document.querySelector('#agregar');
    const contenedor = document.querySelector('.registros-container');

    const inputNom = document.querySelector('#nombre');
    const inputPrecio = document.querySelector("#precio");
    const inputCantidad = document.querySelector("#cantidad");
    const inputCategoria = document.querySelector("#categoria");
    const formulario = document.querySelector('#formulario');

    // Eventos
    inputNom.addEventListener('input', validarInformacion);
    inputPrecio.addEventListener('input', validarInformacion);
    inputCantidad.addEventListener('input', validarInformacion);
    inputCategoria.addEventListener('input', validarInformacion);

    agregar.addEventListener('click', function (e) {
        e.preventDefault();
        agregarRegistro(info);
    });


    function validarInformacion(e) {

        const padreReferencia = e.target.parentElement;
        const valor = e.target.value;

        if (valor.trim() == '') {
            
            mostarError(`Campo ${e.target.id} esta vacio`, padreReferencia);
            return;
        }

        if(e.target.id=='cantidad' || e.target.id =='precio'){
            
            if(validarCantidad(valor)){
                mostarError(`Campo ${e.target.id} solo acepta numeros`, padreReferencia);
                return;
            }
        }

        eliminarAlerta(padreReferencia);
        info[e.target.id]=valor.trim().toLowerCase();
        habilitarBtnAgregar(info);

    }

    function validarCantidad(cant){
        const regex="^[0-9]+$";
        const result = cant.match(regex)==null; 
        return result;
    }

    function mostarError(msg, referencia) {

        eliminarAlerta(referencia);

        const error = document.createElement('P');
        error.textContent = msg;
        error.id = 'error' 
        error.classList.add('text-red-700', 'mt-2', 'text-xs');
        agregar.classList.add('mt-5');
        referencia.appendChild(error);

    }

    function agregarRegistro(info) {

        const row = document.createElement('tr');
        row.innerHTML = `
    
        <td>${info.nombre}</td>
        <td>${info.precio}</td>
        <td>${info.cantidad}</td>
        <td>${info.categoria}</td>
        `
        contenedor.appendChild(row);
        resetearForm();
    }

    function eliminarAlerta(padre){

        const alerta = padre.querySelector('#error');
        if(alerta){
            alerta.remove();
        }
    }

    function habilitarBtnAgregar(info){
        if(!Object.values(info).includes('')){

            agregar.classList.remove('opacity-50', 'cursor-not-allowed');
            agregar.disabled = false;
        }
    }

    function resetearForm(){

        // Resetear el objeto
        info.nombre='';
        info.precio='';
        info.cantidad='';
        info.categoria='';
        console.log(info);
        
        // Resetear el formulario
        inputNom.value="";
        inputPrecio.value="";
        inputCantidad.value="";
        inputCategoria.value="";

        agregar.classList.add('opacity-50', 'cursor-not-allowed');
            agregar.disabled = true;
    }

});









