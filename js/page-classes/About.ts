import { browserDetector } from "../utils/browserDetector";

export class VideoIframe {

    constructor() {
    }

    /**
     * Create custom thumbnail from data-attribute provided url
     * @param {string} url
     * @return {string} The HTML containing the <img> tag
     */
    private createCustomThumbail(url) {
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
    private createThumbail(id) {
        return (
            "<img class=\"youtube-thumbnail\" src=\"//i.ytimg.com/vi_webp/" +
            id +
            "/maxresdefault.webp\" alt=\"Youtube Preview\"><div class=\"youtube-play-btn\"></div>"
        );
    }

    /**
     * Create and load iframe in Youtube container
     **/
    createIframe(videoPlayer, id) {
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

    private removeIframe(id) {
        document.getElementById(id).remove();
    }

    private isVisible = elem => !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length )

    public getVideos() {
        const videoPlayers = document.getElementsByClassName("youtube-player");
    
        for (const videoPlayer of videoPlayers) {
            this.createImage(videoPlayer);
        }
    }

    private hideOnClickOutside(element, id) {
        const outsideClickListener = event => {
            const el = document.getElementById(id);
            if (!element.contains(event.target) && event.target.id !== "youtube-thumbnail" &&  event.target.id !== "play-btn" && this.isVisible(el)) { 
                this.removeIframe(id);
                this.createImage(element);
                removeClickListener();
            }
        };
    
        const removeClickListener = () => {
            document.removeEventListener("click", outsideClickListener);
        };
    
        document.addEventListener("click", outsideClickListener);
    }

    createImage(element) {
        const p = document.createElement("div");
        const id = element.getAttribute("data-id");

        const placeholder = element.hasAttribute("data-thumbnail")
            ? element.getAttribute("data-thumbnail")
            : "";

        if (placeholder.length) p.innerHTML = this.createCustomThumbail(placeholder);
        else p.innerHTML = this.createThumbail(id);

        element.appendChild(p);
        p.addEventListener("click",  () => {
            const parent = p.parentElement;
            this.createIframe(parent, parent.getAttribute("data-id"));
        });

        this.hideOnClickOutside(element, "youtube-iframe");
    }
}


export default class AboutPage {
    videoIframe!: VideoIframe;  
    constructor() {
        this.videoIframe = new VideoIframe();
        this.videoIframe.getVideos();
        this.replaceSvgToImage();
    }

    replaceSvgToImage() {
        const browser = browserDetector();
        const svgImages = Array.from(document.getElementsByClassName("icon-img")) as Array<HTMLObjectElement>; 
        
        if (browser === "chrome" || browser === "safari") {
            for (const svgImage of svgImages) {
                const elem = document.createElement("img");
                elem.src = svgImage.data;
                elem.alt = "SVG image of Animal";
                Array.from(svgImage.classList).map(i => elem.classList.add(i));
                svgImage.parentNode.replaceChild(elem, svgImage);
            }
        }
    }
}