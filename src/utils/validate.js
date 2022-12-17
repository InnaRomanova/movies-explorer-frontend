const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const NAME_REGEXP= /^[а-яА-ЯёЁa-zA-Z0-9]+$/;

function isEmailValid(value) {
    return EMAIL_REGEXP.test(value)
}

function isNameValid(value) {
    return NAME_REGEXP.test(value);
}

function isPasswordValid(value) {
    if(value.length > 3 && value.length < 10) {
        return (true);
    }
}

export {isEmailValid, isNameValid, isPasswordValid};
