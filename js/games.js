// Global
let games = [];
let activeFilter = "";
let search = "";

// Filters
function addFilter(text, filter) {
    const filterBar = document.getElementById("filter-bar");

    const btn = document.createElement("button");
    btn.classList.add("filter");
    btn.textContent = text;
    btn.dataset.filter = filter;

    filterBar.append(btn);
}

function initFilters() {
    const filters = document.querySelectorAll(".filter");
    const searchInput = document.getElementById("search-input");

    filters.forEach((button) => {
        button.addEventListener("click", () => {
            filters.forEach((filter) => filter.classList.remove("active"));

            if (button.dataset.filter != activeFilter) {
                button.classList.add("active");
                activeFilter = button.dataset.filter;
            } else {
                activeFilter = "";
            }

            renderGrid();
        });
    });

    searchInput.addEventListener("input", () => {
        search = searchInput.value.toLowerCase().trim();
        renderGrid();
    });
}

// Build a game card element
function buildGameCard(game) {
    const card = document.createElement("a");
    card.classList.add("game-card");
    card.href = `/player/?game=${encodeURIComponent(game.gameName)}`;

    const thumb = document.createElement("div");
    thumb.classList.add("game-thumb");
    thumb.style.backgroundImage = `url('${game.thumbnail}')`;
    card.appendChild(thumb);

    const title = document.createElement("h4");
    title.textContent = game.gameName;
    card.appendChild(title);

    const overlay = document.createElement("div");
    overlay.classList.add("game-overlay");

    const button = document.createElement("button");
    button.classList.add("btn-secondary");
    button.textContent = "Play";
    overlay.appendChild(button);
    card.appendChild(overlay);

    return card;
}

// Render (Filtered) Games
function renderGrid() {
    const pills = document.querySelectorAll(".filter");
    let favoritedGames = [];

    if (localStorage.getItem("favorited-games")) {
        favoritedGames = JSON.parse(localStorage.getItem("favorited-games"));
    }

    const filtered = games.filter((game) => {
        const matchesSearch = game.gameName.toLowerCase().includes(search);
        let matchesFilter = !activeFilter;

        pills.forEach((pill) => {
            if (pill.classList.contains("active")) {
                switch (pill.dataset.filter) {
                    case "hot":
                        matchesFilter = game.popular;
                        break;
                    case "favorite":
                        matchesFilter = favoritedGames.includes(game.gameName);
                        break;
                    default:
                        matchesFilter = game.gameName.toLowerCase().includes(pill.dataset.filter);
                        break;
                }
            }
        });

        return matchesFilter && matchesSearch;
    });

    const grid = document.getElementById("games-grid");
    grid.innerHTML = "";

    // ✅ Add the placeholder first
    const placeholder = document.createElement("div");
    placeholder.classList.add("game-card");
    placeholder.style.cursor = "pointer";
    placeholder.onclick = () => window.open("https://example.com", "_blank");

    const thumb = document.createElement("div");
    thumb.classList.add("game-thumb");
    thumb.style.backgroundImage = "url('/../img/placeholders/placeholder-game.png')";
    placeholder.appendChild(thumb);

    const title = document.createElement("h4");
    title.textContent = "Open External Link";
    placeholder.appendChild(title);

    const overlay = document.createElement("div");
    overlay.classList.add("game-overlay");
    const button = document.createElement("button");
    button.classList.add("btn-secondary");
    button.textContent = "Play";
    overlay.appendChild(button);
    placeholder.appendChild(overlay);

    grid.appendChild(placeholder);

    if (!filtered.length) {
        const noGames = document.createElement("div");
        noGames.textContent = "No games found.";
        grid.appendChild(noGames);
    } else {
        filtered.forEach((game) => grid.appendChild(buildGameCard(game)));
    }
}

(async function init() {
    games = await fetchGames();
    games.sort((a, b) => a.gameName.localeCompare(b.gameName));

    addFilter("Hot 🔥", "hot");
    addFilter("Favorite ❤️", "favorite");
    addFilter("Papa's Games", "papa");
    addFilter("Riddle School", "riddle");
    addFilter("Pokemon", "pokemon");

    renderGrid();
    initFilters();
})();
