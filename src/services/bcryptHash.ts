const bcrypt = require('bcrypt');

export const encryptHash = async (password:string)=>{
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash
}

export const CompareHash = async(password:string, userPassword:string)=>{
    return await bcrypt.compare(password, userPassword);
}