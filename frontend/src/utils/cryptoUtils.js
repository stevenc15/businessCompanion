//frontend/src/utils/cryptoUtils.js

const encoder = new TextEncoder();
const decoder = new TextDecoder();


//derive a secure AES-GCM key from a password and salt using PBKDF2
async function deriveKey(password, salt) {
    
    const baseKey = await crypto.subtle.importKey(
        'raw',
        encoder.encode(password),
        'PBKDF2', 
        false, 
        ['deriveKey']
    );

    return await crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt, 
            iterations: 100000, 
            hash: 'SHA-256', 
        },
        baseKey,
        {name: 'AES-GCM', length: 256},
        false,
        ['encrypt', 'decrypt']
    );
}

//encrypt a js object using AES-GCM 
//returns an object containing base64-encoded ciphertext, IV, and salt
export async function encryptData(data, password) {
    const iv = crypto.getRandomValues(new Uint8Array(12)); //96-bit IV for AES-GCM
    const salt = crypto.getRandomValues(new Uint8Array(16)); //128-bit salt for PBKDF2
    
    const key = await deriveKey(password, salt);
    const encodedData = encoder.encode(JSON.stringify(data));

    const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv},
        key,
        encodedData
    );

    return{
        ciphertext: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
        iv: btoa(String.fromCharCode(...iv)),
        salt: btoa(String.fromCharCode(...salt))
    };
}

//Decrypt a previously encrypted object using AES-GCM
//Requires the same password used to encrypt, plus the stored iv and salt
export async function decryptData(encryptedObj, password) {
    const { ciphertext, iv, salt } = encryptedObj;

    const decodedIv = Uint8Array.from(atob(iv), c => c.charCodeAt(0));
    const decodedSalt = Uint8Array.from(atob(salt), c => c.charCodeAt(0));
    const encryptedBytes = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));

    const key = await deriveKey(password, decodedSalt);

    const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: decodedIv },
        key,
        encryptedBytes
    );

    return JSON.parse(decoder.decode(decrypted));
}