const header = document.querySelector("header");
const menuButton = document.querySelector(".menu");
const nav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const topButton = document.querySelector(".top-button");
const guideTabs = document.querySelectorAll(".guide-tab");
const guideCard = document.querySelector("#guideCard");

const guideContent = {
    forest: {
        kicker: "FOREST NETWORK",
        title: "Glow Paths",
        text: "Bioluminescent plants react to movement and guide the Na'vi through the night forest."
    },
    bond: {
        kicker: "TSALU",
        title: "The Living Bond",
        text: "The queue links rider and creature, turning trust, balance, and breath into one shared rhythm."
    },
    flight: {
        kicker: "IKRAN",
        title: "First Flight",
        text: "To fly an ikran, a rider must earn its choice, listen to the wind, and move with the mountain."
    }
};

function setMenuOpen(isOpen) {
    header.classList.toggle("is-menu-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    menuButton.textContent = isOpen ? "×" : "☰";
}

if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
        setMenuOpen(!header.classList.contains("is-menu-open"));
    });

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            setMenuOpen(false);
        });
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            setMenuOpen(false);
        }
    });
}

if (guideTabs.length && guideCard) {
    guideTabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            const key = tab.dataset.guide;
            const content = guideContent[key];

            if (!content) {
                return;
            }

            guideTabs.forEach(function (item) {
                const isSelected = item === tab;
                item.classList.toggle("is-active", isSelected);
                item.setAttribute("aria-selected", String(isSelected));
            });

            guideCard.innerHTML = `
                <p class="guide-kicker">${content.kicker}</p>
                <h3>${content.title}</h3>
                <p>${content.text}</p>
            `;
        });
    });
}

function updateTopButton() {
    if (!topButton) {
        return;
    }

    topButton.classList.toggle("is-visible", window.scrollY > 500);
}

if (topButton) {
    updateTopButton();

    window.addEventListener("scroll", updateTopButton, { passive: true });

    topButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

if ("IntersectionObserver" in window && navLinks.length) {
    const sections = Array.from(navLinks)
        .map(function (link) {
            return document.querySelector(link.getAttribute("href"));
        })
        .filter(Boolean);

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
                return;
            }

            navLinks.forEach(function (link) {
                const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
                if (isCurrent) {
                    link.setAttribute("aria-current", "true");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        });
    }, {
        rootMargin: "-42% 0px -48%",
        threshold: 0.01
    });

    sections.forEach(function (section) {
        observer.observe(section);
    });
}
