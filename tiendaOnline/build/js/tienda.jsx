
const cerrarCompra = document.getElementById('cerrar-compra');
const abrirCompra = document.getElementById('abrir-compra');
const orden = document.getElementById('orden');

cerrarCompra.addEventListener('click', (e) =>{
    
    orden.classList.add('orden-activo');

});


abrirCompra.addEventListener('click', ()=>{

    orden.classList.add('orden-desactivo');
    orden.classList.remove('orden-activo');

});


