// Typing animation
const roles = ["Software Developer", "Cloud Engineer", "Data Enthusiast"];
let roleIndex = 0, charIndex = 0, currentRole = "", typingElement = document.getElementById("typing");

function typeEffect() {
  if (charIndex < roles[roleIndex].length) {
    currentRole += roles[roleIndex].charAt(charIndex);
    typingElement.textContent = currentRole;
    charIndex++;
    setTimeout(typeEffect, 100);
  } else {
    setTimeout(eraseEffect, 1500);
  }
}

function eraseEffect() {
  if (charIndex > 0) {
    currentRole = roles[roleIndex].substring(0, charIndex - 1);
    typingElement.textContent = currentRole;
    charIndex--;
    setTimeout(eraseEffect, 50);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeEffect, 500);
  }
}
typeEffect();

// Dark/light theme toggle
const toggle = document.getElementById("theme-toggle");
const storedTheme = localStorage.getItem("theme");
if (storedTheme) document.documentElement.setAttribute("data-theme", storedTheme);

toggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  toggle.textContent = newTheme === "light" ? "🌞" : "🌙";
});

// Fetch GitHub repositories dynamically
const username = "saleem-shaik-git";
const repoGrid = document.getElementById("repo-grid");

fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
  .then(response => response.json())
  .then(repos => {
    repoGrid.innerHTML = "";
    repos.slice(0, 8).forEach(repo => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description available."}</p>
        <a href="${repo.html_url}" target="_blank">🔗 View Repository</a>
      `;
      repoGrid.appendChild(card);
    });
  })
  .catch(() => {
    repoGrid.innerHTML = "<p>Failed to load repositories.</p>";
  });
