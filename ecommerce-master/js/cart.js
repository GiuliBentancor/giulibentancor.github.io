let unitCost= 0;
//let productCurrency = "";
//let subtotal = 0;
//let shippingPercentage = 0.15;
//let total = 0;
//let paymentTypeSelected = false;
//const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
//const BANKING_PAYMENT = "Transferencia bancaria";
//let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";


//Función que se utiliza para actualizar los costos de publicación
//function updateTotalCosts(){}


function updateSubtotal(){
  document.getElementById("subtotal").innerHTML= 
  parseInt(document.getElementById("count").value) * unitCost ;
  
  document.getElementById("subtotal2").innerHTML= 
  parseInt(document.getElementById("count").value) * unitCost ;

}

//function showPaymentTypeNotSelected(){}

//function hidePaymentTypeNotSelected(){}


function showArticles(array){

    let contenido = "";

    for(let i = 0; i < array.length; i++){
        let producto = array[i];

        unitCost= producto.unitCost
        
        contenido += `
             <td id="imagen"> <img src=" `+ producto.src +`" width="80%" > </td>          
             <td id="name"> `+ producto.name +` </td>
             <td id="unitCost">` + producto.unitCost + `</td>
             <td id="currency">` + producto.currency + `</td>
             <td id="cantidad"> <input type="number" id="count" placeholder="" required="" value="1" min="0" onchange='updateSubtotal();'> </td>
             <td id="subtotal">  </td>
    
    `


    }
    
    document.getElementById("art-info").innerHTML = contenido;
    updateSubtotal();
}
         


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
 

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){

           showArticles(resultObj.data.articles);
        }
         else {
            alert ('no funciono');
        }
    });
});

