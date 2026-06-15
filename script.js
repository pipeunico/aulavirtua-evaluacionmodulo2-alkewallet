
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

function sendMoney(){
 let name=document.getElementById('contactName').value;
 let amount=Number(document.getElementById('transferAmount').value);
 let saldo=Number(sessionStorage.getItem('saldo'));
 if(amount>saldo){$('#sendMsg').html('Saldo insuficiente');return;}
 saldo-=amount;
 sessionStorage.setItem('saldo',saldo);

 let contacts=JSON.parse(sessionStorage.getItem('contacts'));
 contacts.push(name);
 sessionStorage.setItem('contacts',JSON.stringify(contacts));

 addTransaction('Transferencia a '+name+': $'+amount);
 $('#sendMsg').hide().html('Transferencia realizada').fadeIn();
}

$(function(){
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