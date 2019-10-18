export const TEXT_FIELD_MIN_LENGTH = 3;

export const messages = {
  required: (fieldName: string) => {
    return `${fieldName} is required`;
  },

  pattern: (fieldName: string) => {
    return `${fieldName} must be valid`;
  },

  mustBeNumber: (fieldName: string) => {
    return `${fieldName} must be a number`;
  },

  minLength: (fieldName: string) => {
    return `${fieldName} must be at least ${TEXT_FIELD_MIN_LENGTH} characters long.`;
  }
};
