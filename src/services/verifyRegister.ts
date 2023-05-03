import EmailValidator from 'email-validator';

export const verifyRegister = (email:string, password:string, passwordRepeat:string)=>{
    
    let error = '';
    if(!EmailValidator.validate(email)) {
       return error = 'Email Inválido'
    }
    if(password !== passwordRepeat) {
        return error = 'As Senhas não conferem!'
    }
    if(password.length <= 3 || passwordRepeat.length <= 3) {
        return error = 'Senha Fraca!'
    }
    return true;

}