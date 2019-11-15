let unitCost= 0;
//let productCurrency = "";
let subtotal = 0;
let shippingPercentage = 0.15;
let PERCENTAGE_SYMBOL = '%';
let total = 0;
//let paymentTypeSelected = false;
const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
const BANKING_PAYMENT = "Transferencia bancaria";
const formatext = "Elegir Forma de Pago";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";


//Función que se utiliza para actualizar los costos de publicación
//

function updateTotalCosts(){
    let comissionCostHTML = document.getElementById("comissionEnvio");
    let totalCostHTML = document.getElementById("totalCostText");

    let comissionToShow = (Math.round(subtotal * shippingPercentage));
    let totalCostToShow = (Math.round(subtotal * (1 + shippingPercentage)));

    comissionCostHTML.innerHTML = comissionToShow;
    totalCostHTML.innerHTML = totalCostToShow;
}


document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("premradio").addEventListener("change", function(){
        shippingPercentage = 0.15;
        updateTotalCosts();
    });
    
    document.getElementById("expradio").addEventListener("change", function(){
        shippingPercentage = 0.07;
        updateTotalCosts();
    });

    document.getElementById("standradio").addEventListener("change", function(){
        shippingPercentage = 0.05;
        updateTotalCosts();
    });
   });


function updateSubtotal(){
  subtotal= parseInt(document.getElementById("count").value) * unitCost;

  document.getElementById("subtotal").innerHTML= subtotal;
  
  document.getElementById("subtotal2").innerHTML= subtotal;

  updateTotalCosts();

}




    document.addEventListener("DOMContentLoaded", function(e){
        document.getElementById("creditCardPaymentRadio").addEventListener("change", function(){
            document.getElementById('formadepago').innerHTML= CREDIT_CARD_PAYMENT;
        });
        
        document.getElementById("bankingRadio").addEventListener("change", function(){
            document.getElementById('formadepago').innerHTML= BANKING_PAYMENT;
        });
 });
    
 
function creditCardSelected() {
    document.getElementById("creditCardNumber").disabled= false; 
    document.getElementById("creditCardSecurityCode").disabled= false; 
    document.getElementById("dueDate").disabled= false;  
    document.getElementById("bankAccountNumber").disabled= true; 
}

function bankingTransferSelected(){
    document.getElementById("creditCardNumber").disabled= true; 
    document.getElementById("creditCardSecurityCode").disabled= true; 
    document.getElementById("dueDate").disabled= true;  
    document.getElementById("bankAccountNumber").disabled= false; 
}


function showArticles(array){

    let contenido = "";

    for(let i = 0; i < array.length; i++){
        let producto = array[i];

        unitCost= producto.unitCost
        
        contenido += `
             <td> <img src=" `+ producto.src +`" width="80%" > </td>          
             <td> `+ producto.name +` </td>
             <td>` + producto.unitCost + `</td>
             <td>` + producto.currency + `</td>
             <td> <input type="number" id="count" placeholder="" required="" value="2" min="1" onchange='updateSubtotal();'> </td>
             <td id="subtotal">  </td>
    
    `


    }
    
    document.getElementById("art-info").innerHTML = contenido;
    updateSubtotal();
}
         

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){

           showArticles(resultObj.data.articles);
        }
         else {
            alert ('error');
        }
    });

    var cartForm = document.getElementById("buyinfo");

    cartForm.addEventListener("submit", function(e){

      
        let dircalle = document.getElementById("calle");
        let dirnumero = document.getElementById("numero");
        let forma= document.getElementById('formadepago');

        let infoMissing = false;

        //Quito las clases que marcan como inválidos
        dircalle.classList.remove('is-invalid');
        dirnumero.classList.remove('is-invalid');
        forma.classList.remove('is-invalid');
    
    
        if (dircalle.value === "")
        {
            dircalle.classList.add('is-invalid');
            infoMissing = true;
        }
        
        if (dirnumero.value === "")
        {
            dirnumero.classList.add('is-invalid');
            infoMissing = true;
        }

        if (forma.textContent === formatext ) {
            forma.classList.add('is-invalid');
            infoMissing = true;
         }

        if (!infoMissing)
        {
            //Aquí ingresa si pasó los controles, irá a enviar
            //la solicitud para crear la publicación.
    
            getJSONData(CART_BUY_URL).then(function(resultObj){
                let msgToShowHTML = document.getElementById("resultSpan");
                let msgToShow = "";
    
                //Si la publicación fue exitosa, devolverá mensaje de éxito,
                //de lo contrario, devolverá mensaje de error.
                if (resultObj.status === 'ok')
                {
                    msgToShow = resultObj.data.msg;
                    
                }
                else if (resultObj.status === 'error')
                {
                    msgToShow = ERROR_MSG;
                }
    
                bootbox.alert(msgToShow, null);
               
            });
            
        }
    
        //Esto se debe realizar para prevenir que el formulario se envíe (comportamiento por defecto del navegador)
        if (e.preventDefault) e.preventDefault();
            return false;
    });

});

