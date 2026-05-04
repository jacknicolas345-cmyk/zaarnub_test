export const formatToman = (n: number) =>
  new Intl.NumberFormat("fa-IR").format(Math.round(n)) + " تومان";
