const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$|^$/iu;
const NAME_REGEXP= /^[а-яА-ЯёЁa-zA-Z0-9]{3,}$|^$/;

function isEmailValid(value) {
    return EMAIL_REGEXP.test(value)
}

function isNameValid(value) {
    return NAME_REGEXP.test(value);
}

function isPasswordValid(value) {
    if((value.length > 3 && value.length < 10) || value.length === 0) {
        return (true);
    }
}

function isEpmtyValid(values) {
    for(let i in values){
        if(values[i].length === 0) return false;
    }
    return true;
}

export {isEmailValid, isNameValid, isPasswordValid, isEpmtyValid};
