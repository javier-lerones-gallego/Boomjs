
export interface IUtilsService {
    /**
     * Description: Returns a random number between min and max.
     *
     * @param {number} min
     * @param {number} max
     * @returns number
     */
    randomNumber(min: number, max: number): number;

    /**
     * Creates a new random id.
     *
     * @returns
     */
    newId(): string;

    /**
     * Converts str into title case if possible.
     *
     * @param {any} str
     * @returns
     */
    toTitleCase(str: string): string;
}
