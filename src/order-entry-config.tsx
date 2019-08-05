export const orderEntryConfig = {
  actions: ["NEW", "RENEW", "DISCONTINUE"],

  frequencies: [
    {
      conceptUuid: "a8a05dc4-1350-11df-a1f1-0026b9348838",
      conceptLabel: "Once a day",
      frequency_per_day: "1",
      uuid: "bc1369f2-6795-11e7-843e-a0d3c1fcd41c"
    }
  ],

  careSetting: [
    { careSetting: "Outpatient", uuid: "6f0c9a92-6f24-11e3-af88-005056821db0" },
    { careSetting: "Inpatient", uuid: "c365e560-c3ec-11e3-9c1a-0800200c9a66" }
  ],

  dosingUnits: {
    conceptUuid: "c15c9fc3-8d20-4b39-a203-f8be1740d8f7",
    conceptId: "10603",
    conceptLabel: "Drug Dosing Unit",
    options: [
      {
        conceptLabel: "Tablets",
        conceptUuid: "a8a07f8e-1350-11df-a1f1-0026b9348838",
        conceptId: "1936"
      }
    ]
  },

  drugRoutes: {
    conceptUuid: "049ba22b-902e-442c-8615-94921700f0bc",
    conceptId: "10602",
    conceptLabel: "Drug Routes",
    options: [
      {
        conceptLabel: "By mouth",
        conceptUuid: "db0c5937-3874-4eae-9566-9a645ad7ac65",
        conceptId: "7447"
      }
    ]
  },

  durationUnits: {
    conceptUuid: "52e8a934-d57c-4ef0-9fb7-7c15d816b723",
    conceptId: "10604",
    conceptLabel: "Duration Units",
    options: [
      {
        conceptLabel: "Days",
        conceptUuid: "a899b9c4-1350-11df-a1f1-0026b9348838",
        conceptId: "1072"
      }
    ]
  },

  drugDispensingUnits: {
    conceptUuid: "a8a06490-1350-11df-a1f1-0026b9348838",
    conceptId: 1900,
    conceptLabel: "Medication Dosage",
    options: [
      {
        conceptLabel: "Tablets",
        conceptUuid: "a8a07f8e-1350-11df-a1f1-0026b9348838",
        conceptId: "1936"
      },
      {
        conceptLabel: "Milligrams",
        conceptUuid: "a8a063c8-1350-11df-a1f1-0026b9348838",
        conceptId: "1899"
      },
      {
        conceptLabel: "Capsules",
        conceptUuid: "ea404923-fe2b-4812-aec5-3be7fbe712f7",
        conceptId: "7916"
      },
      {
        conceptLabel: "",
        conceptUuid: "",
        conceptId: ""
      },
      {
        conceptLabel: "",
        conceptUuid: "",
        conceptId: ""
      },
      {
        conceptLabel: "",
        conceptUuid: "",
        conceptId: ""
      }
    ]
  }
};
