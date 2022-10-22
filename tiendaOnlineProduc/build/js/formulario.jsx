import { useState } from "react";


const formulario_productos = document.getElementById('formulario-agregar-producto');

const inputs_formulario = document.querySelectorAll('#formulario-agregar-producto input');
var pantalla = screen.width;
var pantalla_alto = screen.height;

const expresiones = {

    nombre : /^[A-Za-zÀ-ÿ-\s]{1,20}$/,
    stock : /^[\d]{1,20}$/,
    precio : /^\d*\.?\d*\.?\d+$/
}

const camposCorrectos = {

    nombre : false,
    stock : false,
    precio : false,
    imagen : false,
    estado : false

}

const validarFormulario = (e) =>{

    switch(e.target.name){

        case 'nombre-producto':{

            validarCampos(expresiones.nombre,e.target,'nombre');
            break;
        }

        case 'stock-producto':{

            validarCampos(expresiones.stock,e.target,'stock');
            break;

        }

        case 'precio-producto':{

            validarCampoPrecio(expresiones.precio,e.target,'precio');
            break;

        }

    }

}

const validarCampos = (expresion,input,campo) =>{

    if(expresion.test(input.value)){

        document.getElementById(`label-${campo}`).classList.remove('label-error');
        document.getElementById(`input-grupo-${campo}`).classList.remove('input-control-error');
        document.getElementById(`icono-${campo}`).classList.remove('fa-times-circle');
        document.getElementById(`icono-${campo}`).classList.remove('icono-error');
        document.getElementById(`input-texto-${campo}`).classList.remove('texto-input-error');
        document.getElementById(`input-grupo-${campo}`).classList.add('input-control-correcto');
        document.getElementById(`icono-${campo}`).classList.add('fa-check-circle');
        document.getElementById(`icono-${campo}`).classList.add('icono-correcto');
        document.getElementById(`input-texto-${campo}`).classList.add('texto-input-correcto');

        camposCorrectos[campo] = true;

    }else{

        document.getElementById(`input-grupo-${campo}`).classList.remove('input-control-correcto');
        document.getElementById(`icono-${campo}`).classList.remove('icono-correcto');
        document.getElementById(`input-texto-${campo}`).classList.remove('texto-input-correcto');
        document.getElementById(`label-${campo}`).classList.add('label-error');
        document.getElementById(`input-grupo-${campo}`).classList.add('input-control-error');
        document.getElementById(`icono-${campo}`).classList.add('fa-times-circle');
        document.getElementById(`icono-${campo}`).classList.add('icono-error');
        document.getElementById(`input-texto-${campo}`).classList.add('texto-input-error');

        camposCorrectos[campo] = false;

    }


}

const validarCampoPrecio = (expresion,input,campo) => {

    if(expresion.test(input.value)){

        document.getElementById(`label-${campo}`).classList.remove('label-error');
        document.getElementById(`input-grupo-${campo}`).classList.remove('input-control-error');
        document.getElementById(`icono-${campo}`).classList.remove('fa-times-circle');
        document.getElementById(`icono-${campo}`).classList.remove('icono-error');
        document.getElementById(`input-texto-${campo}`).classList.remove('texto-input-error');
        document.getElementById(`contenedor-moneda`).classList.remove('input-control-moneda-error')
        document.getElementById(`input-grupo-${campo}`).classList.add('input-control-correcto');
        document.getElementById(`contenedor-moneda`).classList.add('input-control-moneda-correcto')
        document.getElementById(`icono-${campo}`).classList.add('fa-check-circle');
        document.getElementById(`icono-${campo}`).classList.add('icono-correcto');
        document.getElementById(`input-texto-${campo}`).classList.add('texto-input-correcto');

        camposCorrectos[campo] = true;

    }else{

        document.getElementById(`input-grupo-${campo}`).classList.remove('input-control-correcto');
        document.getElementById(`icono-${campo}`).classList.remove('icono-correcto');
        document.getElementById(`input-texto-${campo}`).classList.remove('texto-input-correcto');
        document.getElementById(`contenedor-moneda`).classList.remove('input-control-moneda-correcto')
        document.getElementById(`label-${campo}`).classList.add('label-error');
        document.getElementById(`input-grupo-${campo}`).classList.add('input-control-error');
        document.getElementById(`contenedor-moneda`).classList.add('input-control-moneda-error')
        document.getElementById(`icono-${campo}`).classList.add('fa-times-circle');
        document.getElementById(`icono-${campo}`).classList.add('icono-error');
        document.getElementById(`input-texto-${campo}`).classList.add('texto-input-error');

        camposCorrectos[campo] = false;

    }

}

const validarEstadoColores = () =>{

    document.getElementById('estado-activo').addEventListener('click',()=>{

        document.getElementById('estado-activo').classList.add('radio-activo');
        document.getElementById('estado-inactivo').classList.remove('radio-inactivo');
        
    });

    document.getElementById('estado-inactivo').addEventListener('click',()=>{

        document.getElementById('estado-inactivo').classList.add('radio-inactivo');
        document.getElementById('estado-activo').classList.remove('radio-activo');
        
    });
}

const validarEstado = () =>{

    const estados = document.getElementsByName('estado');
    if(estados[0].checked == false && estados[1].checked == false){

        camposCorrectos['estado'] = false;

    }else{

        camposCorrectos['estado'] = true;

    }

}

const validarImagen = (input) =>{

    const label_imagen = document.getElementById('label-input-img');
    const parrafo_imagen = document.getElementById('archivo-seleccionado');

    input.addEventListener('change', (e)=>{

        label_imagen.classList.remove('label-input-img-incorrecto');
        label_imagen.classList.add('label-input-img-correcto');

        parrafo_imagen.innerText = input.files[0].name; 

        camposCorrectos['imagen'] = true;

    });

}


inputs_formulario.forEach((input) =>{

    input.addEventListener('keyup',validarFormulario);
    input.addEventListener('focus',validarFormulario);
    input.addEventListener('blur',validarFormulario);

    input.addEventListener('blur',()=>{

        document.getElementById(`contenedor-moneda`).classList.remove('input-control-moneda-error');
        document.getElementById(`contenedor-moneda`).classList.remove('input-control-moneda-correcto');

    });

    switch(input.name){

        case 'estado':{
    
            /* Funcion para validar el color de cada estado*/
            validarEstadoColores('estado');
            break;

        }

        case 'img-producto':{

            /* Funcion para validar mi input */
            validarImagen(input);
            break;

        }

    }

});

/* Variables para abrir y cerrar mi overlay de agregar productos*/
const abrir_orverlay_agregar_productos = document.getElementById('overlay_agregar_producto');
const btn_gregar_productos = document.getElementById('btn_agregar_producto');

const btn_cerrar_overlay_agregar_productos = document.getElementById('cerrar_overlay_agregar_productos');

/* Abrimos nuestro overlay para agregar productos */
btn_gregar_productos.addEventListener('click', () =>{

    if(pantalla > 600){

        abrir_orverlay_agregar_productos.style.visibility = 'visible';

        /* Esta variable esta al inicio del documento */
        formulario_productos.style.display = 'block';
        formulario_productos.style.visibility = 'visible';

        

    }else{

        var contenedor_main = document.getElementById('main');
        var contenedor_form_agregar_productos = document.getElementById('formulario-agregar-producto');

        /* Oculta contendor main */
        contenedor_main.style.display = 'none';
        contenedor_form_agregar_productos.style.display = 'block';
        abrir_orverlay_agregar_productos.classList.add('overlay-altura-baja');

        document.getElementById('cerrar_overlay_agregar_productos').classList.remove('fa-times');
        document.getElementById('cerrar_overlay_agregar_productos').classList.add('fa-arrow-circle-left');

        contenedor_form_agregar_productos.classList.add('formulario-agregar-producto-altura-baja');

    }

});

/* Cerramos nuestro overlay para agregar productos */
btn_cerrar_overlay_agregar_productos.addEventListener('click', () =>{

    if(pantalla > 600){

        abrir_orverlay_agregar_productos.style.visibility = 'hidden';

        /* Esta variable esta al inicio del documento */
        formulario_productos.style.display = 'none';
        formulario_productos.style.visibility = 'hidden';

    }else{

        var contenedor_main = document.getElementById('main');
        var contenedor_form_agregar_productos = document.getElementById('formulario-agregar-producto');

        contenedor_form_agregar_productos.style.display = 'none';
        contenedor_main.style.display = 'flex';

        abrir_orverlay_agregar_productos.classList.remove('overlay-altura-baja');
        contenedor_form_agregar_productos.classList.remove('formulario-agregar-producto-altura-baja');

    }

});

/* Variables para poder relizar la visibilidad de nuestros contenedores y poder ocultarlos tambien */
const menu_productos_ordenes = document.querySelectorAll('#menu button'); 
var contenedor_ordenes;
var contenedor_productos;

/* Funcion para poder mostrar un contenedor y tambien cambiar el color de mi boton */
const mostrarMenu = (btn,contenedor,campo) =>{

    var bienvenida = document.getElementById('bienvenida');

    btn.classList.add(campo);
    bienvenida.classList.add('bienvenida-desactivo');
    contenedor.style.display = 'block';
}

/* Funcion para poder ocultar un contenedor y tambien cambiar el color de mi boton */
const OcultarMenu = (btn,contenedor,campo) =>{

    btn.classList.remove(campo);
    contenedor.style.display = 'none';

}

/* Ciclo para cada boton adentro de mi menu para poder mostrar u ocultar mi contenedor */
menu_productos_ordenes.forEach((btn)=>{

    switch(btn.name){

        case 'btn-ver-productos' :{

            contenedor_productos = document.getElementById('contenedor-productos');

            var btn_ocultar_ordenes = document.getElementById('btn-ver-ordenes');
            var contenedor_ocultar_ordenes = document.getElementById('contenedor-ordenes');

            btn.addEventListener('click',()=>{

                mostrarMenu(btn,contenedor_productos,'btn-productos-oprimido');
                OcultarMenu(btn_ocultar_ordenes,contenedor_ocultar_ordenes,'btn-ordenes-oprimido');

            });

            break;
            
        }

        case 'btn-ver-ordenes' :{
           
            contenedor_ordenes = document.getElementById('contenedor-ordenes');

            var btn_ocultar_productos = document.getElementById('btn-ver-productos');
            var contenedor_ocultar_productos = document.getElementById('contenedor-productos');

            btn.addEventListener('click', () =>{

                mostrarMenu(btn,contenedor_ordenes,'btn-ordenes-oprimido');
                OcultarMenu(btn_ocultar_productos,contenedor_ocultar_productos,'btn-productos-oprimido')

            });

            break;

        }

    }

});


formulario_productos.addEventListener('submit', (e) =>{

    e.preventDefault();

    validarEstado();

    const parrafoError = document.getElementById('formulario__mensaje');
    const parrafoExito = document.getElementById('mensaje-exito');

    /* label boton imagen */
    const label_imagen = document.getElementById('label-input-img');
    const parrafo_imagen = document.getElementById('archivo-seleccionado');

    const iconos_correctos = document.querySelectorAll('.fa-check-circle');

    if(camposCorrectos.nombre && camposCorrectos.stock && camposCorrectos.precio && camposCorrectos.imagen && camposCorrectos.estado)
    {

        parrafoError.style.display = 'none';
        parrafoExito.style.display = 'block';

        /* Regresamos valores predeterminados a mi contenedor de imagen*/
        label_imagen.classList.remove('label-input-img-correcto');
        label_imagen.classList.add('label-input-img-incorrecto');

        parrafo_imagen.innerText = ""; 

        /* Regresamos valores predeterminados labels de estado*/
        document.getElementById('estado-inactivo').classList.remove('radio-inactivo');
        document.getElementById('estado-activo').classList.remove('radio-activo');

        /* Regresamos todos los iconos de mis inputs a sus valores predeterminados */
        iconos_correctos.forEach((icono) =>{

            icono.classList.remove('fa-check-circle');

        });

        setTimeout(() =>{

            parrafoExito.style.display = 'none';

        },2000);


        formulario_productos.reset();


    }
    else{


        if(pantalla <= 800){

            document.getElementById('overlay-error-agregar-producto').style.visibility = 'visible';

            setTimeout(()=>{

                document.getElementById('overlay-error-agregar-producto').style.visibility = 'hidden';

            },2000);

        }else{

            parrafoError.style.display = 'block';

            setTimeout(() =>{

                parrafoError.style.display = 'none';

            },4000);

        }

    }

});