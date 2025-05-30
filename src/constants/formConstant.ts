export const familyFormOptions = {
  maritalStatus: ["Single", "Married", "Divorced"],
  dependents: ["Yes", "No"],
  employmentStatus: [
    "Employed",
    "Self-Employed",
    "Unemployed",
    "Student",
    "Retired",
  ],
  housingStatus: ["Owned", "Rented", "Mortgaged", "Company Provided"],
};

export const familyFormFIelds = [
  {
    label: "Marital Status",
    name: "maritalStatus",
    options: familyFormOptions.maritalStatus,
    type: "select",
  },
  {
    label: "Dependents",
    name: "dependents",
    options: familyFormOptions.dependents,
    type: "select",
  },
  {
    label: "Employment Status",
    name: "employmentStatus",
    options: familyFormOptions.employmentStatus,
    type: "select",
  },
  {
    label: "Monthly Income",
    name: "monthlyIncome",
    placeholder: "Enter monthly income",
    type: "text",
    pattern: {
      value: /^\d+(\.\d{1,2})?$/,
      message: "Enter a valid amount (up to 2 decimal places)",
    },
  },
  {
    label: "Housing Status",
    name: "housingStatus",
    options: familyFormOptions.housingStatus,
    type: "select",
  },
];
