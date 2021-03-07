document.addEventListener("DOMContentLoaded", () => {
    console.log("loaded");
    });/**
 * Get videos on load
 */
 (function () {
    getVideos();
})();

/**
 * For each video player, create custom thumbnail or
 * use Youtube max resolution default thumbnail and create
 * iframe video.
 */
function getVideos() {
    const videoPlayers = document.getElementsByClassName("youtube-player");

    function hideOnClickOutside(element, id) {
        const outsideClickListener = event => {
            const el = document.getElementById(id);
            if (!element.contains(event.target) && event.target.id !== "youtube-thumbnail" &&  event.target.id !== "play-btn" && isVisible(el)) { 
                removeIframe(id);
                createImage(element);
                removeClickListener();
            }
        };
    
        const removeClickListener = () => {
            document.removeEventListener("click", outsideClickListener);
        };
    
        document.addEventListener("click", outsideClickListener);
    }

    function createImage(element) {
        const p = document.createElement("div");
        const id = element.getAttribute("data-id");

        const placeholder = element.hasAttribute("data-thumbnail")
            ? element.getAttribute("data-thumbnail")
            : "";

        if (placeholder.length) p.innerHTML = createCustomThumbail(placeholder);
        else p.innerHTML = createThumbail(id);

        element.appendChild(p);
        p.addEventListener("click", function () {
            const parent = p.parentElement;
            createIframe(parent, parent.getAttribute("data-id"));
        });

        hideOnClickOutside(element, "youtube-iframe");
    }

    const isVisible = elem => !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );

    for (const videoPlayer of videoPlayers) {
        createImage(videoPlayer);
    }

}

/**
 * Create custom thumbnail from data-attribute provided url
 * @param {string} url
 * @return {string} The HTML containing the <img> tag
 */
function createCustomThumbail(url) {
    return (
        "<img id=\"youtube-thumbnail\" class=\"youtube-thumbnail\" src=\"" +
        url +
        "\" alt=\"Youtube Preview\" /><div id=\"play-btn\" class=\"youtube-play-btn\"></div>"
    );
}

/**
 * Get Youtube default max resolution thumbnail
 * @param {string} id The Youtube video id
 * @return {string} The HTML containing the <img> tag
 */
function createThumbail(id) {
    return (
        "<img class=\"youtube-thumbnail\" src=\"//i.ytimg.com/vi_webp/" +
        id +
        "/maxresdefault.webp\" alt=\"Youtube Preview\"><div class=\"youtube-play-btn\"></div>"
    );
}

/**
 * Create and load iframe in Youtube container
 **/
function createIframe(videoPlayer, id) {
    var iframe = document.createElement("iframe");
    iframe.setAttribute(
        "src",
        "//www.youtube.com/embed/" +
            id +
            "?autoplay=1&color=white&autohide=2&modestbranding=1&border=0&wmode=opaque&enablejsapi=1&showinfo=0&rel=0"
    );
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("class", "youtube-iframe");
    iframe.id = "youtube-iframe";
    videoPlayer.firstChild.replaceWith(iframe);
}

function removeIframe(id) {
    document.getElementById(id).remove();
}
