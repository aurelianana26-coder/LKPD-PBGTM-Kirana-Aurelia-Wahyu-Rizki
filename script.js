const form = document.getElementById("registrationForm");

const nama = document.getElementById("nama");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const ekskul = document.getElementById("ekskul");

const successMessage = document.getElementById("successMessage");


// Fungsi memberikan status valid / tidak valid
function setValid(input, kondisi) {
    if (kondisi) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
    }
}


// Validasi nama
function validateNama() {
    const nilai = nama.value.trim();

    setValid(nama, nilai.length >= 3);

    return nilai.length >= 3;
}


// Validasi email
function validateEmail() {
    const nilai = email.value.trim();

    const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setValid(email, polaEmail.test(nilai));

    return polaEmail.test(nilai);
}


// Validasi password
function validatePassword() {
    const nilai = password.value;

    setValid(password, nilai.length >= 8);

    return nilai.length >= 8;
}


// Validasi konfirmasi password
function validateConfirmPassword() {
    const benar =
        confirmPassword.value !== "" &&
        confirmPassword.value === password.value;

    setValid(confirmPassword, benar);

    return benar;
}


// Validasi ekstrakurikuler
function validateEkskul() {
    const benar = ekskul.value !== "";

    setValid(ekskul, benar);

    return benar;
}


// Validasi secara real-time
nama.addEventListener("input", validateNama);
email.addEventListener("input", validateEmail);

password.addEventListener("input", () => {
    validatePassword();

    if (confirmPassword.value !== "") {
        validateConfirmPassword();
    }
});

confirmPassword.addEventListener("input", validateConfirmPassword);
ekskul.addEventListener("change", validateEkskul);


// Saat form dikirim
form.addEventListener("submit", function(event) {

    // Mencegah halaman reload
    event.preventDefault();

    const namaValid = validateNama();
    const emailValid = validateEmail();
    const passwordValid = validatePassword();
    const confirmValid = validateConfirmPassword();
    const ekskulValid = validateEkskul();

    // Jika semua valid
    if (
        namaValid &&
        emailValid &&
        passwordValid &&
        confirmValid &&
        ekskulValid
    ) {

        successMessage.classList.remove("d-none");

        alert("Pendaftaran Berhasil!");

        form.reset();

        // Menghilangkan tanda valid setelah reset
        [nama, email, password, confirmPassword, ekskul]
            .forEach(input => {
                input.classList.remove("is-valid");
            });

    } else {
        successMessage.classList.add("d-none");
    }
});