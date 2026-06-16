
//Credenciales fijas para el login.
const USER='aulavirtual@alkewallet.com';
const PASS='0*fhD$67834Sd&lK';

//Configuración inicial del almacenamiento en sesión para saldo (inicial en cero), transacciones y contactos.
if(!sessionStorage.getItem('saldo')) sessionStorage.setItem('saldo',0);
if(!sessionStorage.getItem('transactions')) sessionStorage.setItem('transactions','[]');
if(!sessionStorage.getItem('contacts')) sessionStorage.setItem('contacts','[]');

//Función para validar el login.
function login(){
 let e=document.getElementById('email').value;
 let p=document.getElementById('password').value;
 if(e===USER && p===PASS){ window.location='menu.html'; }
 else document.getElementById('msg').innerHTML='<p class="text-danger">Credenciales incorrectas</p>';
}

//Función para agregar una transacción al historial.
function addTransaction(t){
 let arr=JSON.parse(sessionStorage.getItem('transactions'));
 arr.unshift(t);
 sessionStorage.setItem('transactions',JSON.stringify(arr));
}

//Función para realizar un depósito
function deposit(){

    let montoDeposito =
        Number(document.getElementById('depositAmount').value);

    if (isNaN(montoDeposito) || montoDeposito <= 0) {

        alert("Monto inválido");
        return;

    }

    let saldoActual =
        Number(sessionStorage.getItem('saldo')) + montoDeposito;

    sessionStorage.setItem('saldo', saldoActual);

    addTransaction('Depósito: $' + montoDeposito);

    $('#depositMsg')
        .hide()
        .html('Depósito realizado')
        .fadeIn();
}

//Funcines y condiciones para enviar dinero a un contacto y crear el contacto si no existe
//Seleccionar contacto creado para realizar la transferencia.
//Revisa saldo disponible y monto a transferir, si es válido realiza la transferencia y actualiza el saldo y el historial de transacciones.
function sendMoney() {

    let newContact =
        document.getElementById("newContact").value.trim();

    let selectedContact =
        document.getElementById("contactSelect").value;

    let contact =
        newContact || selectedContact;

    let amount =
        Number(document.getElementById("transferAmount").value);

    let saldo =
        Number(sessionStorage.getItem("saldo"));

    if (!contact) {

        alert("Debe seleccionar o crear un contacto");
        return;

    }

    if (amount <= 0) {

        alert("Monto inválido");
        return;

    }

    if (amount > saldo) {

        alert("Saldo insuficiente");
        return;

    }

    saldo -= amount;

    sessionStorage.setItem("saldo", saldo);

    let contacts =
        JSON.parse(sessionStorage.getItem("contacts")) || [];

    if (!contacts.includes(contact)) {

        contacts.push(contact);

        sessionStorage.setItem(
            "contacts",
            JSON.stringify(contacts)
        );

    }

    addTransaction(
        "Transferencia a " +
        contact +
        ": $" +
        amount
    );

    $("#sendMsg")
        .hide()
        .html("Transferencia realizada correctamente")
        .fadeIn();

    loadContacts();

}

//Función para cargar contactos en el select de la página de envío de dinero.
$(function(){
  loadContacts();
 if($('#saldo').length) $('#saldo').text(sessionStorage.getItem('saldo'));

 if($('#transactionsList').length){
   let arr=JSON.parse(sessionStorage.getItem('transactions'));
   arr.forEach(t=>$('#transactionsList').append('<li class="list-group-item">'+t+'</li>'));
 }

 });

//Función para cerrar sesión y limpiar el almacenamiento de datos (montos, contactos y transacciones) en sesión.
function logout() {

    sessionStorage.removeItem('saldo');
    sessionStorage.removeItem('transactions');
    sessionStorage.removeItem('contacts');

    alert("Sesión cerrada correctamente");

    window.location.href = "index.html";
}

//Función para seleccionar contactos en el selector de la página de envío de dinero.
function loadContacts() {

    let contacts =
        JSON.parse(sessionStorage.getItem("contacts")) || [];

    let select =
        document.getElementById("contactSelect");

    if (!select) return;

    select.innerHTML =
        '<option value="">Seleccione un contacto a transferir</option>';

    contacts.forEach(contact => {

        let option = document.createElement("option");

        option.value = contact;
        option.textContent = contact;

        select.appendChild(option);

    });

}