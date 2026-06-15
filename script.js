
const USER='usuario@alkewallet.com';
const PASS='0*fhD$67834Sd&lK';

if(!sessionStorage.getItem('saldo')) sessionStorage.setItem('saldo',0);
if(!sessionStorage.getItem('transactions')) sessionStorage.setItem('transactions','[]');
if(!sessionStorage.getItem('contacts')) sessionStorage.setItem('contacts','[]');

function login(){
 let e=document.getElementById('email').value;
 let p=document.getElementById('password').value;
 if(e===USER && p===PASS){ window.location='menu.html'; }
 else document.getElementById('msg').innerHTML='<p class="text-danger">Credenciales inválidas</p>';
}

function addTransaction(t){
 let arr=JSON.parse(sessionStorage.getItem('transactions'));
 arr.unshift(t);
 sessionStorage.setItem('transactions',JSON.stringify(arr));
}

function deposit(){
 let m=Number(document.getElementById('depositAmount').value);
 let s=Number(sessionStorage.getItem('saldo'))+m;
 sessionStorage.setItem('saldo',s);
 addTransaction('Depósito: $'+m);
 $('#depositMsg').hide().html('Depósito realizado').fadeIn();
}

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

$(function(){
  loadContacts();
 if($('#saldo').length) $('#saldo').text(sessionStorage.getItem('saldo'));

 if($('#transactionsList').length){
   let arr=JSON.parse(sessionStorage.getItem('transactions'));
   arr.forEach(t=>$('#transactionsList').append('<li class="list-group-item">'+t+'</li>'));
 }

 if($('#searchContact').length){
   let contacts=JSON.parse(sessionStorage.getItem('contacts'));
   $('#searchContact').on('input',function(){
      let v=$(this).val().toLowerCase();
      let m=contacts.find(c=>c.toLowerCase().includes(v));
      if(m) $(this).val(m);
   });
 }
});

function logout() {

    sessionStorage.removeItem('saldo');
    sessionStorage.removeItem('transactions');
    sessionStorage.removeItem('contacts');

    alert("Sesión cerrada correctamente");

    window.location.href = "index.html";
}

function loadContacts() {

    let contacts =
        JSON.parse(sessionStorage.getItem("contacts")) || [];

    let select =
        document.getElementById("contactSelect");

    if (!select) return;

    select.innerHTML =
        '<option value="">Seleccione un contacto</option>';

    contacts.forEach(contact => {

        let option = document.createElement("option");

        option.value = contact;
        option.textContent = contact;

        select.appendChild(option);

    });

}