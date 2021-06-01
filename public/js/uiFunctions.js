window.addEventListener('load', function () {
    // Abre el menu en responsive
    const bodySelector = document.body;
    const navbar = document.querySelector('.sideMenu');
    const menuToggle = document.querySelector('.triggerMenu');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('open');
            menuToggle.classList.toggle('toggled');
            bodySelector.classList.toggle('fixed');
        });
    }

    // Agrega la clase .menuActive en Tablet y Desktop
    const categoriesAnchor = document.querySelector('.categoriesLink');
    const toggleMenu = document.querySelector('.sideMenu');

    if (toggleMenu) {
        document.addEventListener('click', function (event) {
            let isClickeableInside = categoriesAnchor.contains(event.target);

            if (isClickeableInside) {
                toggleMenu.classList.toggle('menuActive');
            } else {
                toggleMenu.classList.remove('menuActive');
            }
        })
    }


    // Para revelar La contraseña en el ojito

    const togglePassword = document.querySelector('.togglePassword');
    const password = document.querySelector('#password');

    if (togglePassword) {
        togglePassword.addEventListener('click', function (event) {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            togglePassword.classList.toggle('icon-eyeClose');
        })
    }

    // Abrir menu de usuario
    const userMenuTrigger = document.querySelector('.userAccount');
    const userMenu = document.querySelector('#userMenu');

    if (userMenu) {
        document.addEventListener('click', function (event) {
            let isClickeableInside = userMenuTrigger.contains(event.target);

            if (isClickeableInside) {
                userMenu.classList.toggle('userMenuActive');
            } else {
                userMenu.classList.remove('userMenuActive');
            }
        })
    }

    // Drag and drop
    const dragArea = document.querySelector('.previewWrapper');
    const fileButton = document.querySelector('#previewBtn');
    const inputButton = document.querySelector('.input-file-button');
    let previewDragText = document.querySelector('.previewText');
    let file;

    if (dragArea) {
        fileButton.onclick = (e) => {
            e.stopPropagation();
            inputButton.click();
        }
    
        inputButton.addEventListener('change', function() {
            file = this.files[0];
            showFile();
        })

        dragArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            dragArea.classList.add('previewWrapperActive');
            previewDragText.textContent = "Suelta la imagen para cargarla";
        });

        dragArea.addEventListener('dragleave', () => {
            dragArea.classList.remove('previewWrapperActive');
            previewDragText.textContent = "Selecciona un archivo";
        });

        dragArea.addEventListener('drop', (e) => {
            e.preventDefault();
            // Seleccionamos unicamente el primer archivo en caso de que el usuario suba varios
            file = e.dataTransfer.files[0];
            showFile();
        })

        function showFile() {
            let fileType = file.type;
            let validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
            
            if(validExtensions.includes(fileType)) {
                let fileReader = new FileReader();
                fileReader.onload = () => {
                    let fileURL = fileReader.result;
                    let imgTag = `<img class="imgUserPreview" src="${fileURL}" alt="">`;
                    dragArea.innerHTML = imgTag;
                    dragArea.classList.add('previewWrapperSelected');
                }

                fileReader.readAsDataURL(file);
            } else {
                previewDragText.textContent = "Selecciona un archivo";
                dragArea.classList.remove('previewWrapperActive');
            }
        }
    }
})