    // src/services/audioService.js

    import { db, storage } from '../firebase-config.js';
    import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js';
    import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js';

/**
    * Sube un archivo de audio a Firebase Storage y guarda sus datos en Firestore.
    * @param {File} file - El archivo de audio a subir.
    * @param {string} author - Nombre del cantante
    * @param {string} title - Título de la canción.
    * @param {string} singer - Iniciales del compañero que canta (ej. "AZ").
*/
    export async function uploadAudio(file, author, title, singer) {
    if (!file) return { success: false, message: "No se seleccionó ningún archivo." };

    try {
        //crear referencia única en Storage
        const storageRef = ref(storage, `audios/${Date.now()}_${file.name}`);

        //subir el archivo
        await uploadBytes(storageRef, file);

        // Obtiene la URL pública
        const url = await getDownloadURL(storageRef);

        // 4️Guarda los datos en Firestore
        await addDoc(collection(db, "audios"), {
        title,
        author,
        singer, 
        url,
        timestamp: serverTimestamp()
        });

        return { success: true, message: "Audio subido correctamente.", url };

    } catch (e) {
        console.error("Error al subir audio:", e);
        return { success: false, message: "Error al subir el audio." };
    }
    }
