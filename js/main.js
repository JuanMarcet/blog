// --- PROTECCIÓN DE SESIÓN ---
window.addEventListener("load", () => {
  const logged = localStorage.getItem("loggedIn");
  if (logged !== "true") {
    window.location.href = "login.html";
  }
  renderPosts(true); // con animación
});

// --- CERRAR SESIÓN ---
function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// --- MODAL ---
function openModal() {
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// --- CREAR PUBLICACIÓN ---
function addPost() {
  const title = document.getElementById("postTitle").value.trim();
  const tag = document.getElementById("postTag").value.trim();
  const content = document.getElementById("postContent").value.trim();

  if (!title || !tag || !content) {
    alert("Completa todos los campos antes de publicar.");
    return;
  }

  const newPost = {
    id: Date.now(),
    title,
    tag,
    content,
    author: localStorage.getItem("user") || "Anónimo",
    comments: [],
    votes: 0
  };

  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.unshift(newPost);
  localStorage.setItem("posts", JSON.stringify(posts));

  closeModal();
  renderPosts(true);
}

// --- RENDERIZAR PUBLICACIONES ---
function renderPosts(animated = false) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const feed = document.querySelector(".feed");
  feed.innerHTML = "";

  if (posts.length === 0) {
    feed.innerHTML = `<p class="no-posts fade-in">Aún no hay publicaciones. ¡Crea la primera!</p>`;
    return;
  }

  posts.forEach(post => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post", "fade-in");
    postDiv.innerHTML = `
      <div class="vote">
        <span class="arrow" onclick="vote(${post.id})">⬆️</span>
        <p>${post.votes}</p>
      </div>
      <div class="post-info">
        <h3>${post.title}</h3>
        <p class="meta">por <span>@${post.author}</span> · 
        <span class="tag">${post.tag.toUpperCase()}</span> · ${post.comments.length} comentarios</p>
        <p>${post.content}</p>
        <button class="btn-comment" onclick="toggleComments(${post.id})">💬 Ver/Responder</button>
        <div class="comments" id="comments-${post.id}" style="display:none;"></div>
      </div>
    `;
    feed.appendChild(postDiv);
  });

  if (animated) {
    feed.classList.add("fade-in");
    setTimeout(() => feed.classList.remove("fade-in"), 400);
  }
}

// --- VOTAR PUBLICACIÓN ---
function vote(id) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const post = posts.find(p => p.id === id);
  if (post) {
    post.votes++;
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
  }
}

// --- MOSTRAR / OCULTAR COMENTARIOS ---
function toggleComments(id) {
  const div = document.getElementById(`comments-${id}`);
  if (div.style.display === "none") {
    renderComments(id);
    div.style.display = "block";
    div.classList.add("fade-in");
  } else {
    div.style.display = "none";
  }
}

// --- RENDERIZAR COMENTARIOS ---
function renderComments(id) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const post = posts.find(p => p.id === id);
  const div = document.getElementById(`comments-${id}`);

  div.innerHTML = post.comments.map(c => `
    <div class="comment fade-in"><span>@${c.author}</span>: ${c.text}</div>
  `).join("") + `
    <div class="comment-input fade-in">
      <input type="text" id="comment-input-${id}" placeholder="Escribe un comentario...">
      <button onclick="addComment(${id})">Enviar</button>
    </div>
  `;
}

// --- AGREGAR COMENTARIO ---
function addComment(id) {
  const input = document.getElementById(`comment-input-${id}`);
  const text = input.value.trim();
  if (!text) return;

  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const post = posts.find(p => p.id === id);

  post.comments.push({
    author: localStorage.getItem("user") || "Anónimo",
    text
  });

  localStorage.setItem("posts", JSON.stringify(posts));
  renderComments(id);
}

// --- CAMBIO DE SECCIONES (NAVBAR) ---
document.querySelectorAll("header nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    document.querySelectorAll("header nav a").forEach(a => a.classList.remove("active"));
    link.classList.add("active");

    const section = link.textContent.trim();
    const feed = document.querySelector(".feed");

    feed.classList.add("section-transition");
    feed.style.opacity = 0;
    setTimeout(() => {
      feed.innerHTML = "";
      switch (section) {
        case "Inicio":
          renderPosts(true);
          break;
        case "Discusión":
          feed.innerHTML = `<h2 class="fade-in">💬 Debates populares</h2><p class="fade-in">Aquí aparecerán los temas más comentados.</p>`;
          break;
        case "Categorías":
          feed.innerHTML = `<h2 class="fade-in">🏷️ Categorías</h2><p class="fade-in">Técnología, Creatividad, Cine, Consejos...</p>`;
          break;
        case "Autores":
          feed.innerHTML = `<h2 class="fade-in">👥 Autores Destacados</h2><p class="fade-in">Usuarios más activos de la comunidad.</p>`;
          break;
      }
      feed.style.opacity = 1;
    }, 200);
  });
});
// Render inicial
renderPosts();