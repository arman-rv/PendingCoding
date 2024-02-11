function getPersianNumbers(en, date) {
  if (!date) en = numberWithCommas(en);
  return ("" + en).replace(/[0-9]/g, function (t) {
    return "٠١٢٣٤٥٦٧٨٩".slice(+t, +t + 1);
  });
}

function numberWithCommas(x = 100000) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const persianPagination = (number) => {
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return number.toString().replace(/\d/g, (match) => arabicNumerals[+match]);
};

export { getPersianNumbers, persianPagination };
