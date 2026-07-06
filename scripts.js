document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('subscription-form');
    const title = document.getElementById('form-title');
    const fullNameInput = document.getElementById('fullName');

    // Actualización dinámica del título
    fullNameInput.addEventListener('input', (e) => {
        const nameVal = e.target.value.trim().toUpperCase();
        title.textContent = nameVal ? `HOLA ${nameVal}` : 'HOLA';
    });

    // Objeto con las reglas de validación para cada campo
    const validations = {
        fullName: {
            validate: (val) => val.length > 6 && val.includes(' '),
            message: "Debe tener más de 6 letras y al menos un espacio entre medio."
        },
        email: {
            validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
            message: "Debe tener un formato de email válido."
        },
        password: {
            validate: (val) => val.length >= 8 && /[a-zA-Z]/.test(val) && /[0-9]/.test(val),
            message: "Al menos 8 caracteres, formados por letras y números."
        },
        repeatPassword: {
            validate: (val) => val === document.getElementById('password').value && val !== "",
            message: "Las contraseñas no coinciden."
        },
        age: {
            validate: (val) => Number.isInteger(Number(val)) && Number(val) >= 18,
            message: "Debe ser un número entero mayor o igual a 18."
        },
        phone: {
            validate: (val) => /^\d{7,}$/.test(val),
            message: "Al menos 7 dígitos, sin espacios, guiones ni paréntesis."
        },
        address: {
            validate: (val) => val.length >= 5 && /[a-zA-Z]/.test(val) && /[0-9]/.test(val) && val.includes(' '),
            message: "Al menos 5 caracteres, con letras, números y un espacio en el medio."
        },
        city: {
            validate: (val) => val.length >= 3,
            message: "Debe tener al menos 3 caracteres."
        },
        zipCode: {
            validate: (val) => val.length >= 3,
            message: "Debe tener al menos 3 caracteres."
        },
        dni: {
            validate: (val) => /^\d{7,8}$/.test(val),
            message: "Debe ser un número de 7 u 8 dígitos."
        }
    };

    // Función para mostrar error
    const showError = (inputId, message) => {
        const errorElement = document.getElementById(`error-${inputId}`);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    };

    // Función para ocultar error
    const hideError = (inputId) => {
        const errorElement = document.getElementById(`error-${inputId}`);
        errorElement.style.display = 'none';
        errorElement.textContent = '';
    };

    // Asignar eventos blur y focus a todos los inputs
    const inputs = form.querySelectorAll('input');
    
    inputs.forEach(input => {
        // Evento FOCUS: Oculta el mensaje
        input.addEventListener('focus', (e) => {
            hideError(e.target.id);
        });

        // Evento BLUR: Ejecuta la validación
        input.addEventListener('blur', (e) => {
            const field = e.target.id;
            const value = e.target.value;
            
            if (validations[field]) {
                const isValid = validations[field].validate(value);
                if (!isValid) {
                    showError(field, validations[field].message);
                }
            }
        });
    });

    // Evento SUBMIT
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue

        let hasErrors = false;
        let successData = "Datos cargados correctamente:\n\n";
        let errorData = "Se encontraron los siguientes errores:\n\n";

        inputs.forEach(input => {
            const field = input.id;
            const value = input.value;

            if (validations[field]) {
                const isValid = validations[field].validate(value);
                if (!isValid) {
                    hasErrors = true;
                    showError(field, validations[field].message);
                    errorData += `- ${field}: ${validations[field].message}\n`;
                } else {
                    successData += `- ${field}: ${value}\n`;
                }
            }
        });

        // Cartel emergente final
        if (hasErrors) {
            alert(errorData);
        } else {
            alert(successData);
        }
    });
});