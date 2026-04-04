// Navbar
function isActive(href) {
	const currentPage = window.location.pathname;

	if (currentPage.split("/").pop("") == href) return `class="active"`;
}

function addLink(href, name) {
	return `
        <a href="${href}" ${isActive(href)}>${name}</a>
    `;
}

function buildNavbar() {
	const navbar = document.getElementById("navbar");

	navbar.innerHTML = `
        <a href="index.html" class="nav-logo">I-Ready <span>Services</span></a>

        <div class="nav-links">
            ${addLink("/", "Home")}
            ${addLink("/games/", "Games")}
            ${addLink("/settings/", "Settings")}
            ${addLink("/helper/", "AI")}
        </div>

        <button class="theme-toggle" id="theme-toggle">
            ${SUN_SVG}
            ${MOON_SVG}
        </button>
    `;
}

// Footer
function buildFooter() {
	const footer = document.getElementById("footer");
	const year = new Date().getFullYear();

	footer.innerHTML = `
       Use of this site during school hours is at your own discretion; we are not responsible for any consequences resulting from its use. 
    `;
}

(function init() {
	buildNavbar();
	buildFooter();
})();
