// src/services/commentService.js

import { db } from '../firebase-config.js';
import { 
    collection, 
    addDoc, 
    serverTimestamp, 
    query, 
    where, 
    orderBy, 
    onSnapshot 
} from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js';

/**
 * Añade un nuevo comentario a Firestore.
 * @param {string} postId - El ID del post al que pertenece el comentario.
 * @param {string} author - Nombre del autor del comentario.
 * @param {string} text - Contenido del comentario.
 */
export async function addComment(postId, author, text) {
    if (!text.trim()) {
        return { success: false, message: "El comentario no puede estar vacío." };
    }

    try {
        await addDoc(collection(db, "comments"), {
            postId: postId,
            author: author,
            text: text,
            timestamp: serverTimestamp() // Marca de tiempo del servidor
        });
        return { success: true, message: "Comentario publicado." };
    } catch (e) {
        console.error("Error al añadir comentario: ", e);
        return { success: false, message: "Error al publicar." };
    }
}


// =======================================================
// 2. READ 
// =======================================================
/**
 * Se suscribe a los comentarios de un post para actualizaciones en tiempo real.
 * @param {string} postId - El ID del post a escuchar.
 * @param {function} callback - Función que se ejecuta con la lista actualizada de comentarios.
 * @returns {function} Función de 'unsubscribe' para dejar de escuchar.
 */
export function subscribeToComments(postId, callback) {
    // 1. Define la consulta: Colección 'comments', filtrada por 'postId' y ordenada por tiempo.
    const commentsQuery = query(
        collection(db, "comments"),
        where("postId", "==", postId),
        orderBy("timestamp", "asc")
    );

    //  Abre la conexión en tiempo real.
    const unsubscribe = onSnapshot(commentsQuery, (querySnapshot) => {
        const comments = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();

            // Si el timestamp existe, lo convierte a formato legible
            let fechaFormateada = 'Ahora';
            if (data.timestamp) {
                const fecha = data.timestamp.toDate();
                fechaFormateada = fecha.toLocaleString('es-EC', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
            }

            // Mapea cada documento con el formato listo para la UI
            comments.push({ 
                id: doc.id, 
                ...data,
                timestamp: fechaFormateada
            });
        });

        // Llama al Frontend con los datos actualizados
        callback(comments);
    });

    // Retorna la función que permite detener la suscripción
    return unsubscribe;
}
