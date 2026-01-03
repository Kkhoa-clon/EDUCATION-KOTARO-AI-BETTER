// logic_email.js
document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("khPbYUbOKuUq_C1eZ"); // Public key của bạn

    const form = document.getElementById("contact-form");
    const responseMessage = document.getElementById("response-message");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const recaptchaToken = grecaptcha.getResponse();
        if (!recaptchaToken) {
            responseMessage.innerText = "Vui lòng xác nhận bạn không phải là robot.";
            return;
        }

        emailjs.sendForm("service_1debdy9", "template_7kiyjjp", form)
            .then(() => {
                responseMessage.innerText = "Đã gửi thành công! Chúng tôi sẽ liên hệ lại sớm.";
                form.reset();
                grecaptcha.reset();
            }, (error) => {
                responseMessage.innerText = "Gửi thất bại. Vui lòng thử lại sau.";
                console.error("EmailJS error:", error);
            });
    });
});
