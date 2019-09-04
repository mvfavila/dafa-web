export interface CountryState {
  name: string;
  initials: string;
}

export interface CountryStatesCollection {
  values: CountryState[];
  getStateByIndex(index: number): CountryState;
  getStateIndex(nameOrInitials: string): number;
  exists(nameOrInitials: string): boolean;
}

export const states: CountryStatesCollection = {
  getStateByIndex: (index: number) => {
    return states.values[index];
  },

  getStateIndex: (nameOrInitials: string) => {
    if (!states.exists(nameOrInitials)) {
      return -1;
    }
    if (isNamePresent(nameOrInitials)) {
      return getIndexByName(nameOrInitials);
    }
    return getIndexByInitials(nameOrInitials);
  },

  exists: (nameOrInitials: string) => {
    if (isNamePresent(nameOrInitials)) {
      return true;
    }

    return isInitialsPresent(nameOrInitials);
  },

  values: [
    { name: "Acre", initials: "AC" },
    { name: "Alagoas", initials: "AL" },
    { name: "Amapá", initials: "AP" },
    { name: "Amazonas", initials: "AM" },
    { name: "Bahia", initials: "BA" },
    { name: "Ceará", initials: "CE" },
    { name: "Distrito Federal", initials: "DF" },
    { name: "Espírito Santo", initials: "ES" },
    { name: "Goiás", initials: "GO" },
    { name: "Maranhão", initials: "MA" },
    { name: "Mato Grosso", initials: "MT" },
    { name: "Mato Grosso do Sul", initials: "MS" },
    { name: "Minas Gerais", initials: "MG" },
    { name: "Pará", initials: "PA" },
    { name: "Paraíba", initials: "PB" },
    { name: "Paraná", initials: "PR" },
    { name: "Pernambuco", initials: "PE" },
    { name: "Piauí", initials: "PI" },
    { name: "Rio de Janeiro", initials: "RJ" },
    { name: "Rio Grande do Norte", initials: "RN" },
    { name: "Rio Grande do Sul", initials: "RS" },
    { name: "Rondônia", initials: "RO" },
    { name: "Roraima", initials: "RR" },
    { name: "Santa Catarina", initials: "SC" },
    { name: "São Paulo", initials: "SP" },
    { name: "Sergipe", initials: "SE" },
    { name: "Tocantins", initials: "TO" }
  ]
};

// auxiliary methods

function isNamePresent(name: string): boolean {
  return getIndexByName(name) !== -1;
}

function isInitialsPresent(initials: string): boolean {
  return getIndexByInitials(initials) !== -1;
}

function getIndexByName(name: string): number {
  return states.values
    .map((s: CountryState) => s.name.toLowerCase())
    .indexOf(name.toLowerCase());
}

function getIndexByInitials(initials: string): number {
  return states.values
    .map((s: CountryState) => s.initials.toLowerCase())
    .indexOf(initials.toLowerCase());
}
