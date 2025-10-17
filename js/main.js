// js/main.js

// =======================================================
// 1. IMPORTACIONES DE MÓDULOS DE SERVICIO Y DATOS
// =======================================================
import { addComment, subscribeToComments } from '../src/services/commentService.js';
// IMPORTACIÓN DE MÚSICA AÑADIDA
import { musicTracks } from '../src/music-data.js';


// =======================================================
// VARIABLES GLOBALES Y ESTADO (Comentarios)
// =======================================================
const POST_ID = 'post-1'; // ID fijo del post para filtrar comentarios
let unsubscribeComments = null; // Variable para almacenar la función de detener el tiempo real

// Referencias a los elementos del DOM (Comentarios)
let commentsList, submitButton, authorInput, textInput, messageArea, commentCount;

// Referencias a los elementos del DOM (Música)
const audioPlayer = document.getElementById('blog-audio');
const musicSelector = document.getElementById('music-selector');
const togglePlayButton = document.getElementById('toggle-play-button');
const progressBar = document.getElementById('progress-bar');
const timeDisplay = document.getElementById('time-display');
const rewindButton = document.getElementById('rewind-button');
const forwardButton = document.getElementById('forward-button');

// Estado de la música
let isPlaying = false; 

// =======================================================
// FUNCIONES DE CONTROL (Música)
// =======================================================

/**
 * Función auxiliar para formatear segundos a MM:SS
 */
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

/**
 * Inicializa el reproductor de música: llena el selector y configura eventos.
 */
function setupMusicPlayer() {
    if (!musicSelector || !audioPlayer) return;

    // Llenar la lista desplegable
    musicTracks.forEach(track => {
        const option = document.createElement('option');
        option.value = track.url;
        option.textContent = track.name;
        musicSelector.appendChild(option);
    });
    
    // Cargar la primera canción por defecto
    if (musicTracks.length > 0) {
        audioPlayer.src = musicTracks[0].url;
    }

    // Evento: Cambiar de canción
    musicSelector.addEventListener('change', () => {
        audioPlayer.src = musicSelector.value;
        if (isPlaying) {
            audioPlayer.play();
        }
        progressBar.value = 0;
        timeDisplay.textContent = '0:00 / 0:00';
    });

    // Evento: Pausar/Reproducir
    togglePlayButton.addEventListener('click', () => {
        if (isPlaying) {
            audioPlayer.pause();
            togglePlayButton.textContent = '▶️';
            isPlaying = false;
        } else {
            audioPlayer.play().catch(error => {
                console.warn("Autoplay bloqueado. El usuario debe interactuar para reproducir.");
            });
            togglePlayButton.textContent = '⏸️';
            isPlaying = true;
        }
    });

    // Evento: Adelantar y Retroceder
    rewindButton.addEventListener('click', () => {
        audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 10); // Retrocede 10s
    });

    forwardButton.addEventListener('click', () => {
        audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 10); // Adelanta 10s
    });

    // Evento: Actualizar la barra y el tiempo mientras se reproduce
    audioPlayer.addEventListener('timeupdate', () => {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;

        if (!isNaN(duration)) {
            progressBar.value = (currentTime / duration) * 100;
            timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
        }
    });

    // Evento: Mover la canción al arrastrar la barra de progreso
    progressBar.addEventListener('input', () => {
        const duration = audioPlayer.duration;
        if (!isNaN(duration)) {
            const newTime = (progressBar.value / 100) * duration;
            audioPlayer.currentTime = newTime;
        }
    });
}


// =======================================================
// FUNCIONES DE CONTROL (Comentarios y Navegación)
// ... [El resto de tus funciones de showSection, renderComments y handleCommentSubmit permanecen aquí] ...
// =======================================================

function setupDOMReferences() {
    commentsList = document.getElementById('comments-list');
    submitButton = document.getElementById('submit-button');
    authorInput = document.getElementById('author-input');
    textInput = document.getElementById('text-input');
    messageArea = document.getElementById('message-area');
    commentCount = document.getElementById('comment-count');
}



function showSection(sectionId) {
    const sections = document.querySelectorAll('.feed.section');
    const navLinks = document.querySelectorAll('.navbar nav a');
    
    // 1. Ocultar todas las secciones y quitar el 'active' de los enlaces
    sections.forEach(section => {
        section.classList.remove('active');
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // 2. Mostrar la sección solicitada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // 3. Marcar el enlace activo (si existe)
    const targetLink = document.querySelector(`.navbar nav a[href="#"][onclick*="showSection('${sectionId}')"]`);
    if (targetLink) {
        targetLink.classList.add('active');
    }

    // 4. Lógica de inicialización: Si vamos a la discusión, aseguramos la conexión
    if (sectionId === 'discusion' && commentsList && !unsubscribeComments) {
        // Esta línea asegura que el tiempo real inicie SÓLO cuando vemos la discusión
        unsubscribeComments = subscribeToComments(POST_ID, renderComments);
    }
}

// Hacemos la función global para que el HTML pueda acceder a ella
window.showSection = showSection;

// ... [Código de renderComments y handleCommentSubmit] ...

/**
 * Función que recibe los comentarios de Firebase y actualiza la interfaz.
 */
function renderComments(commentsArray) {
    commentsList.innerHTML = '';
    commentCount.textContent = commentsArray.length; // Actualiza el contador

    if (commentsArray.length === 0) {
        commentsList.innerHTML = '<p>Sé el primero en comentar en este post.</p>';
        return;
    }

    commentsArray.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment'; // Usar la clase de tu compañero si tiene CSS
        
        const timeStr = comment.timestamp || 'Fecha desconocida';

        commentElement.innerHTML = `
            <p><strong>${comment.author || 'Anónimo'}</strong>: ${comment.text}</p>
            <p class="comment-meta">Publicado: ${timeStr}</p>
        `;
        commentsList.appendChild(commentElement);
    });
}

/**
 * Maneja el evento de envío del formulario de comentario.
 */
async function handleCommentSubmit() {
    const author = authorInput.value.trim();
    const text = textInput.value.trim();
    
    // Validaciones de Frontend
    if (!author || !text) {
        messageArea.textContent = '🛑 Tu nombre y comentario son obligatorios.';
        messageArea.style.color = 'red';
        return;
    }
    
    submitButton.disabled = true;
    messageArea.textContent = '⏳ Publicando...';
    messageArea.style.color = 'blue';

    // Llamada a tu servicio de datos (CREATE)
    const result = await addComment(POST_ID, author, text);

    if (result.success) {
        textInput.value = ''; // Limpiar solo el campo de comentario
        messageArea.textContent = '✅ Comentario publicado con éxito!';
        messageArea.style.color = 'green';
    } else {
        messageArea.textContent = '❌ Error al publicar: ' + result.message;
        messageArea.style.color = 'red';
    }
    
    submitButton.disabled = false;
}


// =======================================================
// 3. INICIALIZACIÓN (Función principal que se ejecuta al cargar)
// =======================================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtiene las referencias del DOM para los comentarios
    setupDOMReferences();

    // 2. Configura el envío del formulario (CREATE)
    if (submitButton) {
        submitButton.addEventListener('click', handleCommentSubmit);
    }
    
    // 3. Inicia la escucha en tiempo real (READ)
    // Nota: La suscripción se inicia en showSection('discusion') para ahorrar recursos.

    // 4. Inicializa el reproductor de música
    setupMusicPlayer();
    
    // 5. Inicializar el estado de la aplicación
    // Mostrar la sección 'inicio' por defecto al cargar home.html
    showSection('inicio'); 
});


// ----------------------------------------------------------------
// [Funciones del compañero]
// ----------------------------------------------------------------
function logout() { console.log('Cerrar Sesión...'); }
function openModal() { document.getElementById('modal').style.display = 'flex'; }
function closeModal() { document.getElementById('modal').style.display = 'none'; }
function addPost() { console.log('Añadir publicación...'); }

// Las hacemos globales para que el HTML pueda acceder a ellas
window.logout = logout;
window.openModal = openModal;
window.closeModal = closeModal;
window.addPost = addPost;
// ----------------------------------------------------------------