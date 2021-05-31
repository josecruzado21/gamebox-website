window.addEventListener('load', () => {
    // Validando form login
    const formLogin = document.querySelector('#formLogin');
    const formLoginInput = document.querySelectorAll('#formLogin input');

    // Validación de campos mediante expresiones regulares
    const expresions = {
        name: /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
        surname: /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
        email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        password: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{6,16}$/,
        passwordLogin: /^.{6,}$/
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
                    fieldValidation(expresions.passwordLogin, e.target, 'password');
                    break;
            }
        }

        // Valido por cada campo cuando se sale del campo
        formLoginInput.forEach((input) => {
            input.addEventListener('blur', formValidator)
        });

        // Validación final
        formLogin.addEventListener('submit', (e) => {
            const errorsInLine = document.querySelectorAll('.errorValidation');

            if (fields.email && fields.password) {
                //
            } else {
                e.preventDefault();
                document.querySelector('.generalErrorValidation').classList.add('showErrorMessage');

                formLoginInput.forEach((input) => {
                    input.classList.add('inputError');
                })

                for(let i = 0; i < errorsInLine.length; i++) {
                    if(!fields.email || !fields.password) {
                        errorsInLine[i].classList.add('showErrorMessage')
                    }
                }

                // errorsInLine.forEach((error) => {
                //     (fields.email === false || fields.password === false) ? error.classList.add('showErrorMessage') : ''
                // })
            }

        })
    }

    // Form Register

    // Validando form login
    // const formRegister = document.querySelector('#formRegister');
    
    // if(formRegister) {
    //     const formRegisterInput = document.querySelectorAll('#formRegister input');
    //     const formRegisterPassword = document.querySelector('#password');
    //     // Representa si el campo esta valido o no
    //     const fields = {
    //         name: false,
    //         lastName: false,
    //         email: false,
    //         password: false
    //     }

    //     // Se valida campo por campo que corresponda a las reglas de la expresión regular, los tres parámetros de esta función se pasan en el switch
    //     const fieldValidation = (expresions, input, field) => {
    //         if (expresions.test(input.value)) {
    //             document.querySelector(`.input-wrapper__${field} .input`).classList.remove('inputError');
    //             document.querySelector(`.input-wrapper__${field} label`).classList.remove('labelError');
    //             document.querySelector(`#validation${field}`).classList.remove('showErrorMessage');
    //             fields[field] = true;
    //         } else {
    //             document.querySelector(`.input-wrapper__${field} .input`).classList.add('inputError');
    //             document.querySelector(`.input-wrapper__${field} label`).classList.add('labelError');
    //             document.querySelector(`#validation${field}`).classList.add('showErrorMessage');
    //             fields[field] = false;
    //         }
    //     }

    //     const formValidator = (e) => {
    //         // Validamos que el nombre del campo sea igual al nombre del campo en el que estamos
    //         switch (e.target.name) {
    //             // expresions.email viene de la constante expresions
    //             // e.target es el input en el que estamos
    //             // El último parámetro es el atributo name del campo
    //             case 'name':
    //                 fieldValidation(expresions.name, e.target, 'name');
    //                 break;
    //             case 'lastName':
    //                 fieldValidation(expresions.surname, e.target, 'lastName');
    //                 break;
    //             case 'email':
    //                 fieldValidation(expresions.email, e.target, 'email');
    //                 break;
    //             case 'password':
    //                 fieldValidation(expresions.password, e.target, 'password');
    //                 break;
    //         }
    //     }

    //     // Valido por cada campo cuando se sale del campo
    //     formRegisterInput.forEach((input) => {
    //         input.addEventListener('blur', formValidator)
    //     });

    //     // Capturo el input de password para saber al final de cada presión de teclas si incluye uno de los parámetros que exige la contraseña
    //     formRegisterPassword.addEventListener('input', (e) => {
    //         const uppercaseRule = document.querySelector('#uppercaseRule');
    //         const lowercaseRule = document.querySelector('#lowercaseRule');
    //         const numberRule = document.querySelector('#numberRule');
    //         const specialcharacterRule = document.querySelector('#specialcharacterRule');
    //         const mincharacterRule = document.querySelector('#mincharacterRule');
            
    //         const expRegPassword = {
    //             regUppercase : /[A-Z]/g,
    //             regLowercase : /[a-z]/g,
    //             regnumber : /[0-9]/g,
    //             regEspCharacter : /[!@#$%^&*]/g,
    //             regMinCarRule : /^.{8,}$/
    //         }

    //         if(e.target.value.match(expRegPassword.regUppercase)) {
    //             uppercaseRule.classList.add('pillActive');
    //         } else {
    //             uppercaseRule.classList.remove('pillActive');
    //         }

    //         if(e.target.value.match(expRegPassword.regLowercase)) {
    //             lowercaseRule.classList.add('pillActive');
    //         } else {
    //             lowercaseRule.classList.remove('pillActive');
    //         }

    //         if(e.target.value.match(expRegPassword.regnumber)) {
    //             numberRule.classList.add('pillActive');
    //         } else {
    //             numberRule.classList.remove('pillActive');
    //         }

    //         if(e.target.value.match(expRegPassword.regEspCharacter)) {
    //             specialcharacterRule.classList.add('pillActive');
    //         } else {
    //             specialcharacterRule.classList.remove('pillActive');
    //         }

    //         if(e.target.value.match(expRegPassword.regMinCarRule)) {
    //             mincharacterRule.classList.add('pillActive');
    //         } else {
    //             mincharacterRule.classList.remove('pillActive');
    //         }
    //     })

    //     // Validación final
    //     formRegister.addEventListener('submit', (e) => {
    //         e.stopPropagation();
    //         let errorsInLine = document.querySelectorAll('.errorValidation');
    //         console.log('nombre = ' + fields.name);
    //         console.log('apellido = ' + fields.lastName);
    //         console.log('email = ' + fields.email);
    //         console.log('contraseña = ' + fields.password);

    //         if (fields.name && fields.lastName && fields.email && fields.password) {
    //             //
    //         } else {
    //             e.preventDefault();
    //             document.querySelector('.generalErrorValidation').classList.add('showErrorMessage');
    //         }

    //     })
    // }
})