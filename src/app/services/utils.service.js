
export default class UtilsService {

    /**
     * Gets the public name of the Service.
     */
    static get name() { return 'UtilsService'; }

    /**
     * Description: Returns a random number between min and max.
     *
     * @param {any} min
     * @param {any} max
     * @returns
     */
    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * Creates a new random id.
     *
     * @returns
     */
    newId() {
        return 'xxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Converts str into title case if possible.
     *
     * @param {any} str
     * @returns
     */
    toTitleCase(str) {
        return str.replace(/\w\S*/g, (txt) =>
            txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }
}
