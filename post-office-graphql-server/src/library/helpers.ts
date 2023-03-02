import bcrypt from 'bcryptjs';

function hashPassword(password: string){
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}

function comparePassword(raw: any, hash: any) {
    return bcrypt.compareSync(raw, hash);
}

export default { hashPassword, comparePassword };