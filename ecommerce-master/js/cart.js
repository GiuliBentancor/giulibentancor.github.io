let unitCost= 0;
//let productCurrency = "";
let subtotal = 0;
//let shippingPercentage = 0.15;
//let total = 0;
//let paymentTypeSelected = false;
//const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
//const BANKING_PAYMENT = "Transferencia bancaria";
//let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";


//Función que se utiliza para actualizar los costos de publicación
//function updateTotalCosts(){}


function updateSubtotal(){
  subtotal= parseInt(document.getElementById("count").value) * unitCost;

  document.getElementById("subtotal").innerHTML= subtotal;
  
  document.getElementById("subtotal2").innerHTML= subtotal;

}

//function showPaymentTypeNotSelected(){}

//function hidePaymentTypeNotSelected(){}


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
             <td> <input type="number" id="count" placeholder="" required="" value="2" min="0" onchange='updateSubtotal();'> </td>
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
});

