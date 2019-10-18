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

  minLength: (fieldName: string, minLengthInclusive: number) => {
    return `${fieldName} must be at least ${minLengthInclusive} characters long.`;
  }
};
