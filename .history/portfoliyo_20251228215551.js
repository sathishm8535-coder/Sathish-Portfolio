// ==========================
// NAVBAR TOGGLE
// ==========================
let menu = document.querySelector('#menu-icon-js');
let menuicon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let navtc = document.querySelector('#nav-tc-js');

if (menu && menuicon && navbar && navtc) {
	menu.onclick = () => {
		menuicon.classList.toggle('bx-x');
		navbar.classList.toggle('open');
		navtc.classList.toggle("nav-touch-close-open");
	};

	navtc.onclick = () => {
		menuicon.classList.toggle('bx-x');
		navbar.classList.remove('open');
		navtc.classList.remove('nav-touch-close-open');
	};
}

// ==========================
// SMOOTH SCROLLING
// ==========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	});
});

// ==========================
// HIDE NAVBAR ON SCROLL
// ==========================
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
	var currentScrollPos = window.pageYOffset;
	let header = document.getElementById("header");

	header.classList.add('scrolled');
	if (currentScrollPos === 0) {
		header.classList.remove('scrolled');
	}
	if (navtc.classList.contains('nav-touch-close-open')) return;

	if (prevScrollpos > currentScrollPos) {
		header.style.top = "0";
	} else {
		header.style.top = "-100px";
	}
	prevScrollpos = currentScrollPos;
};

// ==========================
// CONTACT FORM
// ==========================
const contactSection = document.querySelector('.contact-section');
const formSection = document.querySelector('.form-section');
const contactSubmitAfter = document.querySelector('.contact-submit-after');
const csaOK = document.querySelector('.csa-ok');

const contactForm = document.querySelector('.contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const errorDiv = document.querySelector('.error');
const emailErrorDiv = document.querySelector('.email-error');
const contactButton = document.querySelector('.contact-button');
const contactLoad = document.querySelector('.contact-load');
const submitText = document.querySelector('.submit-text');

// Close success message
if (csaOK) {
	csaOK.onclick = () => {
		contactSubmitAfter.classList.remove('show');
		formSection.classList.remove('hide');
		contactSection.classList.remove('csa-cs');
		contactForm.classList.remove('csa-cf');
		contactButton.classList.remove('loading');
		contactLoad.classList.remove('show');
		submitText.classList.remove('hide');
	};
}

// Email validation regex
function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

// Form validation
function validateForm(event) {
	event.preventDefault();
	let isValid = true;
	let emailIsValid = true;
	let nameIsValid = true;
	let messageIsValid = true;

	if (nameInput.value.trim() === '') {
		isValid = false;
		nameIsValid = false;
	}
	if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value.trim())) {
		isValid = false;
		if (emailInput.value.trim() !== '' && !isValidEmail(emailInput.value.trim())) {
			emailIsValid = false;
		}
	}
	if (messageInput.value.trim() === '') {
		isValid = false;
		messageIsValid = false;
	}

	if (!isValid) {
		errorDiv.classList.add('error-show');
		emailErrorDiv.classList.remove('error-show');
		if (nameIsValid && messageIsValid && !emailIsValid) {
			errorDiv.classList.remove('error-show');
			emailErrorDiv.classList.add('error-show');
		}
	} else {
		emailErrorDiv.classList.remove('error-show');
		errorDiv.classList.remove('error-show');
		contactButton.classList.add('loading');
		contactLoad.classList.add('show');
		submitText.classList.add('hide');

		setTimeout(sendMail, 2000);
	}
}

if (contactForm) {
	contactForm.addEventListener('submit', validateForm);
}

// Send Email
function sendMail() {
	contactSubmitAfter.classList.add('show');
	formSection.classList.add('hide');
	contactSection.classList.add('csa-cs');
	contactForm.classList.add('csa-cf');

	var params = {
		name: nameInput.value,
		email: emailInput.value,
		message: messageInput.value
	};

	const serviceID = "service_4v7s1rp";
	const templateID = "template_gxw3shr";

	emailjs.send(serviceID, templateID, params)
		.then(res => {
			nameInput.value = "";
			emailInput.value = "";
			messageInput.value = "";
			console.log(res);
			alert("Your message was sent successfully");
		})
		.catch((error) => {
			console.log(error);
			alert("Error sending message");
		});
}

// ==========================
// THEME TOGGLE
// ==========================
const toggleButton = document.getElementById('toggle-theme');
if (toggleButton) {
	toggleButton.addEventListener('click', () => {
		document.body.classList.toggle('dark');
		document.body.classList.toggle('light');
	});
}
