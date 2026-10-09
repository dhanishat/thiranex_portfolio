const menuIcon = document.querySelector(".menu-icon");
const navLinks = document.querySelector(".nav-links");

if (menuIcon && navLinks) {
    menuIcon.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

async function loadProjects() {
    const container = document.getElementById("project-container");

    // Stop safely if the projects container doesn't exist
    if (!container) {
        console.warn("Project container not found in HTML.");
        return;
    }

    try {
        const response = await fetch(
            "http://localhost:5000/api/projects"
        );

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const projects = await response.json();

        container.innerHTML = "";

        if (!Array.isArray(projects) || projects.length === 0) {
            container.innerHTML = "<p>No projects available yet.</p>";
            return;
        }

        projects.forEach((project) => {
            const card = document.createElement("div");
            card.className = "project-card";

            const imageContainer = document.createElement("div");
            imageContainer.className = "project-image";

            const icon = document.createElement("i");
            icon.className = "fas fa-laptop-code";
            imageContainer.appendChild(icon);

            const content = document.createElement("div");
            content.className = "project-content";

            const title = document.createElement("h3");
            title.textContent = project.title || "Untitled Project";

            const description = document.createElement("p");
            description.textContent =
                project.description || "No description available.";

            content.appendChild(title);
            content.appendChild(description);

            // Only display a link if the project has one
            if (project.link) {
                const link = document.createElement("a");
                link.href = project.link;
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                link.className = "project-link";
                link.textContent = "View Project →";

                content.appendChild(link);
            }

            card.appendChild(imageContainer);
            card.appendChild(content);

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading projects:", error);

        container.innerHTML =
            "<p>Unable to load projects. Please check that the backend is running.</p>";
    }
}

loadProjects();


const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        if (!name || !email || !subject || !message) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "Sending...";
            }

            const response = await fetch(
                "http://localhost:5000/api/messages",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        subject,
                        message
                    })
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to send message."
                );
            }

            alert("Thank you, " + name + "! Your message was saved successfully.");
            contactForm.reset();

        } catch (error) {
            console.error("Contact form error:", error);

            alert(
                "Unable to send your message. Please check that the backend is running and try again."
            );

        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Send Message";
            }
        }
    });
}


const typingText = document.getElementById("typing-text");

const roles = [
    "Full Stack Developer",
    "Web Developer",
    "Programmer",
    "Tech Enthusiast"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {
    // Don't run if the typing element isn't in the HTML
    if (!typingText) {
        return;
    }

    const currentRole = roles[roleIndex];

    if (!deleting) {
        typingText.textContent = currentRole.substring(
            0,
            characterIndex + 1
        );

        characterIndex++;

        if (characterIndex === currentRole.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }

    } else {
        typingText.textContent = currentRole.substring(
            0,
            characterIndex - 1
        );

        characterIndex--;

        if (characterIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeEffect, deleting ? 60 : 100);
}

typeEffect();

const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        const icon = themeToggle.querySelector("i");

        if (icon) {
            if (document.body.classList.contains("light-mode")) {
                icon.className = "fas fa-moon";
            } else {
                icon.className = "fas fa-sun";
            }
        }
    });
}