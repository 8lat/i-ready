// Config
const REVIEWS = [
	{ user: "Brady", stars: 5, text: "Sometimes school gets hard, but I-Ready help's me get through the hard times." },
	{ user: "Finn Fife", stars: 5, text: "I love this site almost as much as Karter Fife" },
	{ user: "Hudson", stars: 5, text: "This website makes biology fun!" },
	{ user: "Karter Fife", stars: 5, text: "The games are so fun, if only I had friends to play with."},
	{ user: "Jesse", stars: 5, text: "The games lowk dopefn on the per shizzel my nizzel."},
	{ user: "Nathan", stars: 5, text: "I Cant believe you guys added the hit Game DELTARUNE. Im so happy you guys have my thanks. And it has all 4 chapters currently out. Really kudos to you guys. Kudos."}
];

const FEATURED_REVIEW = [
	{
		user: "Want to be featured? <span>&starf;</span>",
		text: `Fill out <a href="https://forms.gle/HWdm9t1Rv6vB1p3M7" target="_blank">this form</a> to get a chance for your review to appear on the front page!`,
	},
 ];

// Global
let games = [];

// Reviews
(function initReviews() {
	const scroller = document.getElementById("reviews-scroller");

	function buildReview({ user, stars, text }) {
		const filled = "&starf;".repeat(stars);
		const empty = "&star;".repeat(5 - stars);

		return `
            <div class="review-card">
                <div class="review-header">
					<span class="review-user">${user}</span>
					<span class="review-stars">${filled}${empty}</span>
                </div>

                <p class="review-text">${text}</p>
            </div>
        `;
	}

	const allCards = [...REVIEWS, ...FEATURED_REVIEW, ...FEATURED_REVIEW, ...FEATURED_REVIEW];

	scroller.innerHTML = [...allCards, ...allCards, ...allCards, ...allCards].map(buildReview).join("");
})();

// Recently played
(function initRecentlyPlayed() {
	const grid = document.getElementById("recently-played-grid");
	const recentGames = getRecentlyPlayed();

	if (!recentGames.length) {
		grid.parentElement.style.display = "none";
	}

	recentGames.forEach((game) => grid.appendChild(buildGameCard(game)));
})();

// Panic Modal
(function initModal() {
	const modal = document.getElementById("panic-modal");
	const exitBtn = document.getElementById("modal-btn");

	if (localStorage.getItem("panic-modal-read")) {
		modal.style = "display: none;";
	}

	exitBtn.addEventListener("click", () => {
		modal.style = "display: none;";
		localStorage.setItem("panic-modal-read", "true");
		localStorage.setItem("panic-toggle", "true");
		localStorage.setItem("show-banners", "true");
	});
})();

// Game Counter
function initGameCounter() {
	const count = document.getElementById("game-count");
	count.textContent = `${games.length} GAMES AVAILABLE`;
}

// Initialize
(async function init() {
	games = await fetchGames();

	initGameCounter();
	addRandomGames(games);
})();
