window.addEventListener('load', () => {
    // Validando form login
    const formLogin = document.querySelector('#formLogin');
    const formLoginInput = document.querySelectorAll('#formLogin input');

    // Validación de campos mediante expresiones regulares
    const expresions = {
        nombre: /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
        apellido: /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        password: /^.{4,12}$/
    }

    if (formLogin) {
        // Representa si el campo esta valido o no
        const fields = {
            email: false,
            password: false
        }

        // Se valida campo por campo que corresponda a las reglas de la expresión regular, los tres parámetros de esta función se pasan en el switch
        const fieldValidation = (expresions, input, field) => {
            if (expresions.test(input.value)) {
                document.querySelector(`.input-wrapper__${field} .input`).classList.remove('inputError');
                document.querySelector(`.input-wrapper__${field} label`).classList.remove('labelError');
                document.querySelector(`#validation${field}`).classList.remove('showErrorMessage');
                fields[field] = true;
            } else {
                document.querySelector(`.input-wrapper__${field} .input`).classList.add('inputError');
                document.querySelector(`.input-wrapper__${field} label`).classList.add('labelError');
                document.querySelector(`#validation${field}`).classList.add('showErrorMessage');
                fields[field] = false;
            }
        }

        const formValidator = (e) => {
            // Validamos que el nombre del campo sea igual al nombre del campo en el que estamos
            switch (e.target.name) {
                case 'email':
                    // expresions.email viene de la constante expresions
                    // e.target es el input en el que estamos
                    // El último parámetro es el atributo name del campo
                    fieldValidation(expresions.email, e.target, 'email');
                    break;
                case 'password':
                    fieldValidation(expresions.password, e.target, 'password');
                    break;
            }
        }

        // Valido por cada campo cuando se sale del campo
        formLoginInput.forEach((input) => {
            input.addEventListener('blur', formValidator)
        });

        // Validación final
        formLogin.addEventListener('submit', (e) => {

            if (fields.email && fields.password) {
                //
            } else {
                e.preventDefault();
                document.querySelector('.generalErrorValidation').classList.add('showErrorMessage');
                formLoginInput.forEach((input) => {
                    input.classList.add('inputError');
                })
            }

        })
    }

    // Form Register

    // Validando form login
    const formRegister = document.querySelector('#form-register');
    const formRegisterInput = document.querySelectorAll('#form-register input');

    if(formRegister) {
        // Representa si el campo esta valido o no
        const fields = {
            name: false,
            lastName: false,
            email: false,
            password: false
        }
    }
})