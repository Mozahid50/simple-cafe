"use strict";

document.addEventListener("DOMContentLoaded", function () {
    // =====================================
    // 1. MOBILE NAVIGATION
    // =====================================
    const menuToggle = document.querySelector(
        "#menuToggle, .menu-toggle"
    );

    const navbar = document.querySelector(
        "#navbar, .navbar"
    );

    if (menuToggle && navbar) {
        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", function (event) {
            event.stopPropagation();

            const isOpen = navbar.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navbar.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navbar.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });

        document.addEventListener("click", function (event) {
            if (
                !navbar.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                navbar.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 950) {
                navbar.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    // =====================================
    // 2. AUTOMATIC FOOTER YEAR
    // =====================================
    document.querySelectorAll(".footer-year, #currentYear").forEach(
        function (element) {
            element.textContent = new Date().getFullYear();
        }
    );

    // If the footer contains a year span with class "year"
    document.querySelectorAll(".year").forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });

    // =====================================
    // 3. ACTIVE NAVIGATION LINK
    // =====================================
    const currentPage =
        window.location.pathname.split("/").pop().toLowerCase() ||
        "index.html";

    document.querySelectorAll(".navbar a[href]").forEach(function (link) {
        const href = link.getAttribute("href");

        if (!href || href.startsWith("#")) {
            return;
        }

        const linkPage = href.split("/").pop().split("?")[0].toLowerCase();

        const isCurrentPage =
            linkPage === currentPage ||
            (currentPage === "" && linkPage === "index.html");

        if (isCurrentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        } else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        }
    });

    // =====================================
    // 4. MENU CATEGORY FILTER
    // =====================================
    const filterButtons = document.querySelectorAll(
        ".menu-filters .filter-btn"
    );

    const menuItems = document.querySelectorAll(
        ".full-menu-grid .food-card"
    );

    if (filterButtons.length && menuItems.length) {
        filterButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                const selectedCategory =
                    button.dataset.category ||
                    button.dataset.filter ||
                    "all";

                filterButtons.forEach(function (item) {
                    item.classList.remove("active");
                    item.setAttribute("aria-pressed", "false");
                });

                button.classList.add("active");
                button.setAttribute("aria-pressed", "true");

                menuItems.forEach(function (item) {
                    const itemCategory = item.dataset.category || "all";

                    const shouldShow =
                        selectedCategory === "all" ||
                        itemCategory === selectedCategory;

                    item.hidden = !shouldShow;
                });
            });
        });
    }

    // =====================================
    // 5. CONTACT FORM
    // =====================================
    const contactForm = document.querySelector(
        "#contactForm, #contact-form, .contact-form"
    );

    if (contactForm) {
        const statusMessage = document.querySelector(
            "#formStatus, #form-status, .form-status"
        );

        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const nameInput = contactForm.querySelector(
                '[name="name"], #name'
            );

            const emailInput = contactForm.querySelector(
                '[name="email"], #email'
            );

            const subjectInput = contactForm.querySelector(
                '[name="subject"], #subject'
            );

            const messageInput = contactForm.querySelector(
                '[name="message"], #message'
            );

            function showStatus(message) {
                if (statusMessage) {
                    statusMessage.textContent = message;
                    statusMessage.setAttribute("role", "status");
                } else {
                    alert(message);
                }
            }

            if (!nameInput || !emailInput || !messageInput) {
                showStatus(
                    "Please check the contact form fields in contact.html."
                );
                return;
            }

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const subject = subjectInput
                ? subjectInput.value.trim()
                : "Café website enquiry";
            const message = messageInput.value.trim();

            if (!name || !email || !message) {
                showStatus("Please fill in your name, email and message.");
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                showStatus("Please enter a valid email address.");
                emailInput.focus();
                return;
            }

            // Replace this with the café's real email address.
            const cafeEmail = "REPLACE_WITH_REAL_CAFE_EMAIL";

            if (
                !cafeEmail ||
                cafeEmail === "REPLACE_WITH_REAL_CAFE_EMAIL" ||
                !emailPattern.test(cafeEmail)
            ) {
                showStatus(
                    "The café email has not been configured yet. Please add the real email address in script.js."
                );
                return;
            }

            const emailSubject = encodeURIComponent(
                subject || "Café website enquiry"
            );

            const emailBody = encodeURIComponent(
                "Name: " + name + "\n" +
                "Customer email: " + email + "\n\n" +
                "Message:\n" + message
            );

            const mailtoLink =
                "mailto:" + cafeEmail +
                "?subject=" + emailSubject +
                "&body=" + emailBody;

            showStatus("Opening your email app…");
            window.location.href = mailtoLink;
        });
    }
});