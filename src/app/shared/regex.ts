const TEXT = /^[a-zA-Z0-9 ]+$/;
const EMAIL = /\S+@\S+\.\S+/;
const POSTAL_CODE = /^[0-9]{5}[-][0-9]{3}$/;

export const regexMask = {
  TEXT,
  EMAIL,
  POSTAL_CODE
};
