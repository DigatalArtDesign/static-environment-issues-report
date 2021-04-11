document.addEventListener("DOMContentLoaded", () => {
    const pathnames = ["/", "/contact.html", "/404.html", "/redirected.html", "/index.html", "/about.html"];
    
    console.log(location.pathname);

    if (localStorage.getItem("isContrastMode") === "true" && localStorage.getItem("isPrintMode") === "true") {
        localStorage.setItem("isPrintMode", "false");
    }
    
    if (location.pathname === "/") {
        location.href = "./index.html";
    }
    
    if (!pathnames.includes(location.pathname)) {
        console.log(location.pathname);
        location.href = "./404.html";
    }

});