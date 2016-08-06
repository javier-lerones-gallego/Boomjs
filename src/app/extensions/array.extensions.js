//
// Array Extension Methods
//

export default class BetterArray extends Array {
    constructor() {
        super();
    }

    /**
     * The inArray() method determines whether an array includes a certain element, returning true or false as appropriate. 
     */
    inArray(predicate) {
        return this.filter(i => predicate(i)).length >= 0;
    };

    /**
     * Aadds an element to the array if it does not already exist using a comparer function.
     */
    pushIfNotExist(element, predicate) { 
        if (!this.inArray(predicate)) {
            this.push(element);
        }
    };
}
