
export function setCookie(name, value, days) {
    const date = new Date();
    // Set the expiration time to current time + specified days (7 days)
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // 7 days in milliseconds
    const expires = "expires=" + date.toUTCString(); // Format as UTC string
    document.cookie = name + "=" + value + ";" + expires + ";path=/"; // Set the cookie
}




