/**
 * Hacer andar el boton (.) para convertir en double.
 * Comprobar que no se presione la siguiente secuencia: coma y luego operador; operador y luego coma.
 *
 * Resuelto con arrays para poder manejar ambos display y almacenar de manera facil los valores.
 * Esta es una version sin arrays para fines practicos.  :)
 *
 * Cuando operador esta en valor 1, significa que fue presionado.
 *
 * Boton "C" esta siendo utilizado para retroceder un paso en caso de haber cometido un error de tipeo.
 */

let operador = 0; //Bandera para saber si se preciono un operador
let bandera = 0;
let antesDeOperador = 0;
let despuesDeOperador=0;

//Expresiones Reg
let expDecimal = /\d+\.\d/;
let expInteger = /\d/;
let expDot = /\./;

function Calculate() {
  document.getElementById("panelSuperior").value = document.getElementById(
    "panelInferior"
  ).value;
  try {
    let resultado = eval(document.getElementById("panelSuperior").value);
    document.getElementById("panelInferior").value = resultado; //Seteo el valor en el display inferior
  } catch (err) {
    document.getElementById("panelInferior").value = "Error";
  }
}

function Write(valor) {
  let historial = document.getElementById("panelInferior").value;

  if (historial == 0) {
    //Si esta vacía la cadena (no se presionaron botones anteriormente)
    operador = FindOperator(valor);

    if (operador == 1) {
      //Se preciono un operador antes que un numero
      console.log(`Por favor presione un numero antes`);
    } else {
      document.getElementById("panelInferior").value = `${valor}`;
    }
  } else {
    operador = FindOperator(valor);

    if (operador == 1) {
      //Se preciono un operador
      if (bandera == 0) {
        document.getElementById("panelInferior").value = `${historial}${valor}`;
        bandera = 1;
      } else {
        console.log(`Por favor presione un numero antes`);
      }
    } else {
      document.getElementById("panelInferior").value = `${historial}${valor}`;
      bandera = 0;
    }
  }
}

function FindOperator(valor) {
  //Se encarga de revisar si es operador o no
  operador = 0;
  switch (valor) {
    case "+":
      operador = 1;
      antesDeOperador = document.getElementById("panelInferior").value;
      break;
    case "-":
      operador = 1;
      antesDeOperador = document.getElementById("panelInferior").value;
      break;
    case "*":
      operador = 1;
      antesDeOperador = document.getElementById("panelInferior").value;
      break;
    case "/":
      operador = 1;
      antesDeOperador = document.getElementById("panelInferior").value;
      break;

    case ".":
      operador = 1;
      antesDeOperador = document.getElementById("panelInferior").value;
      break;
  }
  
  return operador;
}


function KeyDownPressed(code) {   //Funcion para detectar el delete ya que al parecer, en el evento keyup pierdo el valor

  
  if(code == 8){  //se presiono backspace
    let historial = document.getElementById("panelInferior").value;
    //console.log((document.getElementById("panelInferior").value).toString.charAt(0));
    
    if (historial.length > 0) {
      console.log(historial);
      document.getElementById("panelInferior").value = historial;
    } else {
      console.log("Entre aqui");
    }
  }
}


function KeyPressed(code) {
  let valor = String.fromCharCode(code);
  console.log(valor);

  let historial = document.getElementById("panelInferior").value;

  if (historial == 0) {
    //Si esta vacía la cadena (no se presionaron botones anteriormente)
    operador = FindOperator(valor);

    if (operador == 1) {
      //Se preciono un operador antes que un numero
      console.log(`Por favor presione un numero antes`);
    } else {
      //No se preciono un operador aritmetico
      antesDeOperador = valor;  //Guardo el valor ingresado

      if (expDecimal.test(valor) || expInteger.test(valor)) {
        console.log("Cumple con formato");
        document.getElementById("panelInferior").value = `${valor}`;
      } else {
        console.log("NO cumple con formato " + valor);
      }

      
    }
  } else {

    if(valor == "backspace"){
      console.log("Se presiono delete");
    } else {
      console.log("asdas");
    }
    //Hay valores previos en panel inferior

    operador = FindOperator(valor);

    if (operador == 1) {
      //Se preciono un operador
      if (bandera == 0) {
        if (expDecimal.test(valor) || expInteger.test(valor)) {
          console.log("Cumple con formato");
        } else {
          console.log("NO cumple con formato " + valor);
        }

        document.getElementById("panelInferior").value = `${historial}${valor}`;
        bandera = 1;
      } else {
        console.log(`Por favor presione un numero antes`);
      }
    } else {
      //No se preciono un operador aritmetico
      antesDeOperador = valor;
      if (
        expDecimal.test(valor) ||
        expInteger.test(valor) ||
        expDot.test(valor)
      ) {
        console.log("Cumple con formato");
      } else {
        console.log("NO cumple con formato " + valor);
      }

      document.getElementById("panelInferior").value = `${historial}${valor}`;
      bandera = 0;
    }
  }

  //Regular expresion
  //    / \d/;

  /*  
      \d para dígitos, equivalente a [0-9]
      \s para espacios en blanco (espacios, tabuladores, etc).
  */
}

function Clear() {
  document.getElementById("panelSuperior").value = "";
  document.getElementById("panelInferior").value = 0;
  bandera = 0;
  operador = 0;
}

function ClearBottomScreen() {
  document.getElementById("panelInferior").value = document.getElementById(
    "panelSuperior"
  ).value;
  bandera = 0;
  operador = 0;
}
