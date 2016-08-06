/* ngInject */
export default function Guid() {
    class GuidModel {

        constructor() {
            this._guid = this.newRandomGuid();
        }

        get value() { return this._guid; }
        set value(value) {
            // eslint-disable-next-line max-len
            const guidRegEx = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$', 'i');
            if (guidRegEx.test(value)) {
                this._guid = value;
            } else {
                throw new Error('The value entered doesn\'t match a valid Guid pattern.');
            }
        }

        newRandomGuid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
                const r = Math.random() * 16 | 0;
                const v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    }

    return GuidModel;
}
