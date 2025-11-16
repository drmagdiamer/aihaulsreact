// src/utils/JIElement.js
export class JIElement {
    constructor(getValues, validators = {}) {
        this.getValues = getValues;
        this.validators = validators;
    }

    getErrors() {
        const values = this.getValues();
        const errors = {};

        for (const key of Object.keys(this.validators)) {
            const validatorFn = this.validators[key];
            const result = validatorFn(values[key], values);

            errors[key] = {
                valid: result?.valid ?? true,
                message: result?.message ?? ""
            };
        }

        return errors;
    }

    validate() {
        const errors = this.getErrors();
        return Object.values(errors).every(error => error.valid);
    }
}
