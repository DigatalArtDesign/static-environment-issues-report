import { browserDetector } from "../utils/browserDetector";

document.addEventListener("DOMContentLoaded", () => {
    if (browserDetector() === "firefox") {
        document.getElementById("print-image").remove();
    }
});