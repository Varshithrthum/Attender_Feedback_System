export function getUserData(args) {
    try {
        return JSON.parse(localStorage.getItem(args));
    } catch (ex) {
        console.error(ex);
    }

}

