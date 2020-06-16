/**
 * Hacer andar el boton (.) para convertir en double.
 * Comprobar que no se presione la siguiente secuencia: coma y luego operador; operador y luego coma.
 * 
 */

let operador = 0; //Bandera para saber si se preciono un operador
let bandera = 0;

function Calculate() {
  document.getElementById("panelSuperior").value = document.getElementById(
    "panelInferior"
  ).value;
  try {
    let resultado = eval(document.getElementById("panelSuperior").value);
    document.getElementById("panelInferior").value = resultado;
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
      break;
    case "-":
      operador = 1;
      break;
    case "*":
      operador = 1;
      break;
    case "/":
      operador = 1;
      break;
  }
  return operador;
}

function Clear() {
  document.getElementById("panelSuperior").value = "";
  document.getElementById("panelInferior").value = 0;
  bandera = 0;
  operador = 0;
}
