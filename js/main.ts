import AboutPage from "./page-classes/About";

document.addEventListener("DOMContentLoaded", () => {
    const pathnames = ["/", "/contact.html", "/404.html", "/redirected.html", "/index.html", "/about.html"];
    
    if (location.pathname === "/") {
        location.href = "./index.html";
    }
    
    if (!pathnames.includes(location.pathname)) {
        console.log(location.pathname);
        location.href = "./404.html";
    }

    switch (location.pathname)  {
        case "/about.html": 
            new AboutPage();
            break; 
        default: break;
    }

});