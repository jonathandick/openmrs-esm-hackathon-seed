export const orderEntryConfig = {
  actions: ["NEW", "RENEW", "DISCONTINUE"],

  frequencies: [
    {
      conceptUuid: "160862OFAAAAAAAAAAAAAAA",
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
    conceptUuid: "162384AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    conceptId: "162384",
    conceptLabel: "Drug Dosing Unit",
    options: [
      {
        conceptLabel: "Tablets",
        conceptUuid: "1513AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        conceptId: "1513"
      }
    ]
  },

  drugRoutes: {
    conceptUuid: "162394AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    conceptId: "162394",
    conceptLabel: "Drug Routes",
    options: [
      {
        conceptLabel: "By mouth",
        conceptUuid: "160240AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        conceptId: "160240"
      }
    ]
  },

  durationUnits: {
    conceptUuid: "1732AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    conceptId: "1732",
    conceptLabel: "Duration Units",
    options: [
      {
        conceptLabel: "Days",
        conceptUuid: "1072AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        conceptId: "1072"
      }
    ]
  },

  drugDispensingUnits: {
    conceptUuid: "162402AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    conceptId: 162402,
    conceptLabel: "Drug Dispensing Units",
    options: [
      {
        conceptLabel: "Box",
        conceptUuid: "162396AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        conceptId: "162396"
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
