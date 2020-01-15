export default class LocalStorageService {

    static setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    static getItem(key) {
        return JSON.parse(localStorage.getItem(key))
    }

    static removerItem(chave) {
        localStorage.removeItem(chave)
    }
}