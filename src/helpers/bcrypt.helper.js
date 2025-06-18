"use strict";
import bcrypt from "bcryptjs";

export async function encryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
    
}

(async () => {
    const testHash = await encryptPassword('admin123');
    console.log('Test Hash:', testHash); // Debe imprimir $2b$10$...
})();

export async function comparePassword(password, receivedPassword) {
    return await bcrypt.compare(password, receivedPassword);
}