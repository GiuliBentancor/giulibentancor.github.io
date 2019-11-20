var currentProductsArray = [];
const ORDER_ASC_BY_COST = "Asc";
const ORDER_DESC_BY_COST = "Desc";
var currentSortCriteria= undefined;
var minCost = undefined;
var maxCost = undefined;

function sortProducts(criteria, array)
{
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b)
        {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }
    else if (criteria === ORDER_DESC_BY_COST)
    {
        result = array.sort(function(a, b) 
        {
            if ( a.cost > b.cost ){ return -1;}
            if ( a.cost < b.cost ){ return 1;}
            return 0;
        });
    }
    return result;
}

function showProductsList()
{

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++)
    {
        let products = currentProductsArray[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(products.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(products.cost) <= maxCost))) 
            {
            htmlContentToAppend += `
            
            <div class="col-md-4">
            <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                        <img src="` + products.imgSrc + `" alt="` + products.description + `" class='bd-placeholder-img card-img-top'>
                    <div class="card-body">
                        
                            <h3 class="m-3">`+ products.name +`</h3>
                            <small class="text-muted">` + products.cost + ` ` +  products.currency + ` </small>
                        <p class="card-text">` + products.description + `</p>          
                </div>
                
            </a>
            </div>
            `
            }

        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productsArray)
{
        currentSortCriteria = sortCriteria;
    
        if(productsArray != undefined)
        {
            currentProductsArray = productsArray;
        }
    
        currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
        //Muestro las categorías ordenadas
        showProductsList();
}
    
document.addEventListener("DOMContentLoaded", function(e)
{
        getJSONData(PRODUCTS_URL).then(function(resultObj)
        {
            if (resultObj.status === "ok")
            {
                sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
            }
        });
    
        document.getElementById("sortAsc").addEventListener("click", function()
        {
            sortAndShowProducts(ORDER_ASC_BY_COST);
        });
    
        document.getElementById("sortDesc").addEventListener("click", function()
        {
            sortAndShowProducts(ORDER_DESC_BY_COST);
        });
    
    
        document.getElementById("clearRangeFilter").addEventListener("click", function()
        {
            document.getElementById("rangeFilterCountMin").value = "";
            document.getElementById("rangeFilterCountMax").value = "";
    
            minCost = undefined;
            maxCost = undefined;
    
            showProductsList();
        });
    
        document.getElementById("rangeFilterCount").addEventListener("click", function()
        {
            //Obtengo el mínimo y máximo de los intervalos para filtrar
            minCost = document.getElementById("rangeFilterCountMin").value;
            maxCost = document.getElementById("rangeFilterCountMax").value;
    
            if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0)
            {
                minCost = parseInt(minCost);
            }
            else
            {
                minCost = undefined;
            }
    
            if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0)
            {
                maxCost = parseInt(maxCost);
            }
            else
            {
                maxCost = undefined;
            }
    
            showProductsList();
        });
});
