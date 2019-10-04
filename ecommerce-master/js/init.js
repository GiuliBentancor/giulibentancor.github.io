const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

function onLoad() {
      gapi.load('auth2', function() {
        gapi.auth2.init();
      });
    }

function guardarUsuario() {
  sessionStorage.setItem('usuario', document.getElementById("usuario").value);
}

function mostrarUsuario() {
  if (sessionStorage.usuario != null) {
      document.getElementById("nombre").innerHTML = sessionStorage.usuario;
  } else {
      document.getElementById("nombre").innerHTML = "Invitado";
  }
}

function mostrarMensajeInicio() {
  if (document.getElementById("nombre").value  = sessionStorage.usuario) {
    document.getElementById("mensaje").innerHTML = "Cerrar Sesión";
  } else {
    document.getElementById("mensaje").innerHTML = "Iniciar Sesión";
  }
}

function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile(); 
      {
        sessionStorage.setItem('usuario', profile.getName());
      }
      {
        window.location.assign("https://giulibentancor.github.io/ecommerce-master/index.html");
      }
}
 
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    document.getElementById("nombre").innerHTML = 'Invitado';
    window.location.assign("https://giulibentancor.github.io/ecommerce-master/login.html");
    });
     }

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

