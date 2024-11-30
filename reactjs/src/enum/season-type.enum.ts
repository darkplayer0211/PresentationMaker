/**
 * Enum representing the liturgical seasons.
 */
export const SeasonType = Object.freeze({
  ADVENT: Object.freeze({
    key: 1,
    text: "Mùa vọng",
  }),
  CHRISTMAS: Object.freeze({
    key: 2,
    text: "Mùa giáng sinh",
  }),
  ORDINARY_TIME: Object.freeze({
    key: 3,
    text: "Mùa thường niên",
  }),
  LENT: Object.freeze({
    key: 4,
    text: "Mùa chay",
  }),
  EASTER: Object.freeze({
    key: 5,
    text: "Mùa phục sinh",
  }),
  list: function () {
    return [
      SeasonType.ADVENT,
      SeasonType.CHRISTMAS,
      SeasonType.ORDINARY_TIME,
      SeasonType.LENT,
      SeasonType.EASTER
    ];
  },
});
