const morseMap = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..'
};

const alfabeto = Object.keys(morseMap);
const morseValues = Object.values(morseMap);

function cifrarTexto() {
    const mensaje = document.getElementById('message').value.trim().toUpperCase();
    const desplazamiento = parseInt(document.getElementById('displacement').value);

    if (!validarMensajeVacio(mensaje, 'cifrar')) return;

    if (!/[A-Z]/.test(mensaje)) {
        mostrarModal("El mensaje ingresado no contiene letras válidas para cifrar");
        return;
    }

    const mensajeCifrado = mensaje.split('').map(char => {
        if (/[A-Z]/.test(char)) {
            const index = (alfabeto.indexOf(char) + desplazamiento) % alfabeto.length;
            return morseMap[alfabeto[index]];
        }
        return char;
    }).join(' ');

    document.getElementById('encryptedMessage').value = mensajeCifrado;
    mostrarAlfabetoDesplazado(desplazamiento);
    document.querySelector('.container').classList.add('expanded');
}

function descifrarTexto() {
    const mensaje = document.getElementById('message').value.trim();
    const desplazamiento = parseInt(document.getElementById('displacement').value);

    if (!validarMensajeVacio(mensaje, 'descifrar')) return;

    if (!mensaje.split(' ').every(codigo => morseValues.includes(codigo) || codigo === '')) {
        mostrarModal("El mensaje ingresado no contiene códigos Morse válidos para descifrar");
        return;
    }

    const mensajeDescifrado = mensaje.split(' ').map(morseCode => {
        if (morseValues.includes(morseCode)) {
            const index = (morseValues.indexOf(morseCode) - desplazamiento + alfabeto.length) % alfabeto.length;
            return alfabeto[index];
        }
        return ' ';
    }).join('');

    document.getElementById('encryptedMessage').value = mensajeDescifrado;
}

function mostrarAlfabetoDesplazado(desplazamiento) {
    const alfabetoOriginal = alfabeto.map(letra => `<span class="casilla">${letra}</span>`).join('');
    const alfabetoDesplazadoMorse = alfabeto.map((letra, index) => {
        const newIndex = (index + desplazamiento) % alfabeto.length;
        return `<span class="casilla">${morseMap[alfabeto[newIndex]]}</span>`;
    }).join('');

    document.getElementById('alfabetoOriginal').innerHTML = alfabetoOriginal;
    document.getElementById('alfabetoDesplazado').innerHTML = `<div class="separador"></div>` + alfabetoDesplazadoMorse;
    document.getElementById('alfabetoContainer').classList.add('show');
}

function mostrarModal(mensaje) {
    const modal = document.getElementById('messageModal');
    const modalText = document.querySelector('.text-modal');

    modalText.innerText = mensaje;
    modal.style.display = "block";

    document.querySelector('.close').onclick = () => modal.style.display = "none";
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = "none";
    };
}

function limpiarCampos() {
    document.getElementById('message').value = '';
    document.getElementById('displacement').selectedIndex = 0;
    document.getElementById('encryptedMessage').value = '';
    document.getElementById('alfabetoContainer').classList.remove('show');
    document.querySelector('.container').classList.remove('expanded');
}

function validarMensajeVacio(mensaje, tipo) {
    if (mensaje === "") {
        mostrarModal(`Debe ingresar un mensaje antes de ${tipo}`);
        return false;
    }
    return true;
}
document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('messageModal').style.display = 'none';
});