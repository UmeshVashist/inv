let button = document.getElementById("btn");
const box = document.querySelector(".box");

let isVisible = false;
let timeoutId = null; // optional: to clear previous timeout if needed

button.addEventListener("click", () => {
    if (!isVisible) {
        // Show the message
        box.innerHTML = `
            <p class="query-message">
                <b>If you want to add new link please contact on mentioned email!:- 
                <a href="mailto:us781819@gmail.com">link.inv.help@gmail.com</a></b><br>
                <b>Note:- When contacting by email, please mention the link or name of the website you want to add!</b>
            </p>
        `;
        button.textContent = "Close";
        isVisible = true;

        // Clear previous timeout if any
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Auto-close after 10 seconds
        timeoutId = setTimeout(() => {
            box.innerHTML = "";
            button.textContent = "Any Quary";
            isVisible = false;
        }, 10000);

    } else {
        // Manual hide
        box.innerHTML = "";
        button.textContent = "Any Quary";
        isVisible = false;

        // Clear timeout if user manually hides before 10s
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    }
});


// Search funaction start
const allLinks = document.querySelectorAll("a");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase().trim();
    searchResults.innerHTML = "";

    if (query.length === 0) return;

    const matchedLinks = [];

    allLinks.forEach(link => {
        const text = link.textContent.toLowerCase();
        if (text.includes(query)) {
            matchedLinks.push(`<p><a href="${link.href}" target="_blank">${link.textContent}</a></p>`);
        }
    });

    if (matchedLinks.length > 0) {
        searchResults.innerHTML = `
                
                ${matchedLinks.join("")}
            `;
    } else {
        searchResults.innerHTML = `<p class="found">No matching websites found.</p>`;
    }
});


// const searchInput = document.getElementById("searchInput");
const actionButton = document.getElementById("actionButton");

// Update button icon depending on input content
searchInput.addEventListener("input", () => {
    if (searchInput.value.trim() === "") {
        // actionButton.textContent = "📋"; // Paste icon
        actionButton.innerHTML = `<img src="copy.png" width="30" height="30" />`; // Paste icon
    } else {
        actionButton.innerHTML = `<img src="clear.png" width="30" height="30" />`; // Clear icon
    }
});

actionButton.addEventListener("click", async () => {
    if (searchInput.value.trim() === "") {
        // If empty, paste clipboard text
        try {
            const text = await navigator.clipboard.readText();
            searchInput.value = text;
            searchInput.dispatchEvent(new Event("input")); // trigger input event
        } catch (err) {
            alert("Clipboard access failed: " + err);
        }
    } else {
        // If has text, clear
        searchInput.value = "";
        searchInput.dispatchEvent(new Event("input")); // update icon
        searchInput.focus();
        document.getElementById("searchResults").innerHTML = "";
    }
});


// Speack Fun sec.

const micButton = document.getElementById("micButton");

if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    micButton.addEventListener("click", () => {
        recognition.start();
        micButton.disabled = true;
        micButton.textContent = "🎙️ Listening...";
    });

    recognition.onresult = (event) => {
        const speechText = event.results[0][0].transcript.toLowerCase().trim();
        const searchInput = document.getElementById("searchInput");
        searchInput.value = speechText;
        searchInput.dispatchEvent(new Event("input"));

        const allLinks = document.querySelectorAll("a");
        const matchedLinks = [];

        allLinks.forEach(link => {
            const linkText = link.textContent.toLowerCase();
            const linkHref = link.href.toLowerCase();
            if (
                linkText.includes(speechText) ||
                speechText.includes(linkText) ||
                linkHref.includes(speechText)
            ) {
                matchedLinks.push(link.href);
            }
        });

        if (matchedLinks.length === 1) {
            window.open(matchedLinks[0], "_blank");
        } else if (matchedLinks.length > 1) {
            console.log("Multiple matches found. No auto open.");
        } else {
            console.log("No match found.");
        }
    };

    recognition.onerror = (event) => {
        alert("Voice error: " + event.error);
    };

    recognition.onend = () => {
        micButton.disabled = false;
        micButton.innerHTML = `<img src="mic.png" width="30" height="30" />`;
    };
} else {
    micButton.style.display = "none";
    alert("Your browser does not support speech recognition.");
}
