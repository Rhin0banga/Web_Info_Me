document.addEventListener("DOMContentLoaded", () => {
    // 1. Sprechblase für Links
    const speechBubble = document.getElementById("speechBubble");
    const links = document.querySelectorAll(".link, .link-left, .link-right");

    if (speechBubble) {
        links.forEach(link => {
            link.addEventListener("mouseover", (event) => {
                speechBubble.textContent = event.target.textContent;
                speechBubble.style.display = "block";
            });

            link.addEventListener("mouseout", () => {
                speechBubble.style.display = "none";
            });
        });
    }

    // 2. Jahr im Footer aktualisieren
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 3. Cookie-Management
    function getCookie(name) {
        let cookieArr = document.cookie.split(";");
        for (let i = 0; i < cookieArr.length; i++) {
            let cookie = cookieArr[i].trim();
            if (cookie.startsWith(name + "=")) {
                return cookie.substring(name.length + 1);
            }
        }
        return null;
    }

    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = `${name}=${value};${expires};path=/`;
    }

    // 4. AGB-Popup anzeigen
    const popup = document.getElementById("agbPopup");
    if (popup && !getCookie("agbAccepted")) {
        popup.style.display = "flex";

        const acceptBtn = document.getElementById("acceptBtn");
        const declineBtn = document.getElementById("declineBtn");

        if (acceptBtn) {
            acceptBtn.onclick = () => {
                setCookie("agbAccepted", "true", 30);
                popup.style.display = "none";
            };
        }

        if (declineBtn) {
            declineBtn.onclick = () => {
                window.location.href = "index.html";
            };
        }
    }

    // 5. Zusätzliche Felder anzeigen
    const appointmentCheckbox = document.getElementById("appointmentCheckbox");
    const optionalFields = document.getElementById("optionalFields");

    if (appointmentCheckbox && optionalFields) {
        appointmentCheckbox.addEventListener("change", () => {
            optionalFields.style.display = appointmentCheckbox.checked ? "block" : "none";
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const langSwitch = document.getElementById("languageSwitch");
    const langLabel = document.getElementById("languageLabel");
    const contentElements = document.querySelectorAll("[data-en]");

    // Set the current year in the footer
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Update text based on the language toggle
    langSwitch.addEventListener("change", () => {
        const isEnglish = langSwitch.checked;
        langLabel.textContent = isEnglish ? "English" : "Deutsch";

        contentElements.forEach(element => {
            element.textContent = isEnglish 
                ? element.getAttribute("data-en") 
                : element.getAttribute("data-de");
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const langSwitch = document.getElementById("languageSwitch");
    const langLabel = document.getElementById("languageLabel");
    const contentElements = document.querySelectorAll("[data-en]");

    // Sprache aus Local Storage laden (standardmäßig "de")
    const currentLanguage = localStorage.getItem("language") || "de";
    const isEnglish = currentLanguage === "en";

    // UI entsprechend der gespeicherten Sprache initialisieren
    if (langSwitch) {
        langSwitch.checked = isEnglish;
    }
    if (langLabel) {
        langLabel.textContent = isEnglish ? "English" : "Deutsch";
    }

    // Inhalte entsprechend der Sprache setzen
    updateContentLanguage(isEnglish);

    // Eventlistener für Schieberegler
    if (langSwitch) {
        langSwitch.addEventListener("change", () => {
            const newLanguage = langSwitch.checked ? "en" : "de";
            localStorage.setItem("language", newLanguage);
            updateContentLanguage(langSwitch.checked);
            if (langLabel) {
                langLabel.textContent = newLanguage === "en" ? "English" : "Deutsch";
            }
        });
    }

    // Funktion: Inhalte basierend auf der Sprache aktualisieren
    function updateContentLanguage(isEnglish) {
        contentElements.forEach((element) => {
            const text = isEnglish ? element.getAttribute("data-en") : element.getAttribute("data-de");
            if (text) element.textContent = text;
        });
    }
});
