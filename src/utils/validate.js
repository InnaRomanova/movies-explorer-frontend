const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const NAME_REGEXP= /^[а-яА-ЯёЁa-zA-Z0-9]{3,}$/;

function isEmailValid(value) {
    if(value.length == 0) return true;
    return EMAIL_REGEXP.test(value)
}

function isNameValid(value) {
    if(value.length == 0) return true;
    return NAME_REGEXP.test(value);
}

function isPasswordValid(value) {
    if(value.length == 0) return true;
    if(value.length > 3 && value.length < 10) {
        return (true);
    }
}

export {isEmailValid, isNameValid, isPasswordValid};
