/*
  NOTA 💡
  lo ideal seria tener el elemento "error" debajo de cada input e ir cambiando solo el contenido
  de texto, dejandolo vacio o con un mensaje. De esa forma se simplifica y optimiza la app.
  En cuanto a la visualizacion, se puede agregar una clase alert asi:
  .aler {
    color: #...;
  }

  .alert:empty {
    display: none;
  }
*/


class FormError {
  constructor(id, message) {
    this.id = id
    this.message = message
  }

  /**
   * Inserta el error en la tabla
   * @param {HTMLTableElement} parenTable 
   * @param {number} rowIndex 
  */
  insert(parenTable, rowIndex) {
    const row = parenTable.insertRow(rowIndex)
    row.innerHTML = this.message
    row.setAttribute('id', this.id)
    row.setAttribute('class', 'alert')
  }

  /**
    * Elimina el error de la tabla
    * @param {HTMLTableElement} parenTable 
    * @param {number} rowIndex 
  */
  remove(parenTable, rowIndex) {
    parenTable.deleteRow(rowIndex)
  }
}


function emailValidation() {
  const table = document.getElementsByTagName("table")[0];
  const emailElement = document.getElementsByName('email')[0];
  const emailConfirmElement = document.getElementsByName('email_confirm')[0];
  const errorIndex = emailConfirmElement.parentNode.parentNode.rowIndex + 1;
  const error = new FormError("email-match-error", "El correo electrónico no coincide")

  emailConfirmElement.addEventListener('input', () => {
    const erorrElement = document.getElementById(error.id)
    if (emailElement.value !== emailConfirmElement.value) {
      if (!erorrElement) {
        error.insert(table, errorIndex)
        emailConfirmElement.classList.add('error_bg')
      }
    } else {
      error.remove(table, errorIndex);
      emailConfirmElement.classList.remove('error_bg')
    }
  })
}

window.onload = emailValidation;