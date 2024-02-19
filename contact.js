let formRef = document.querySelector("form");

let nameRef = document.querySelector(".contact-name")
let emailRef = document.querySelector(".contact-email")
let messageRef = document.querySelector(".contact-message")


submitMessage = (e) =>{
    e.preventDefault();
    let name = nameRef.value;

    formRef.innerHTML = `Thank you for your input ${name} !`
}