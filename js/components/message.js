function message(message = "", messageType = "success") {
    return `<div class="alert ${messageType}">${message}</div>`;
}