export const savedUserLogin = (userId) => {
    localStorage.setItem("userid", userId);
}

export let moneyFormat = (money) => {
    return money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}