const TEXT = /^([ A-z0-9!@#\$%\^\&*\)\(+=.,_-\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff]*)$/;
const TEXT_NO_EMPTY_SPACE = /^([A-z0-9!@#\$%\^\&*\)\(+=.,_-\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff]*)$/;
const POSTAL_CODE = /^[0-9]{5}[-][0-9]{3}$/;
const INTEGER = /^[0-9]+$/;

export const regexMask = {
  TEXT,
  TEXT_NO_EMPTY_SPACE,
  POSTAL_CODE,
  INTEGER
};
