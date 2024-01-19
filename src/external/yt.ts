import {ref} from "vue";

declare global {
    interface Window {
        YT: any;
    }
}
export let ytIsLoaded = ref(false);
// @ts-ignore
window.onYouTubeIframeAPIReady = () => {
    setTimeout(() => ytIsLoaded.value = true, 0)
}

let tag = document.createElement('script');
tag.async=true;
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);


export function createEmbed(src: string, targetElementId: string) {
    if (!ytIsLoaded.value) return console.error("Youtube embed api script not loaded!!");
    // console.log(window.YT)
    const player = new window.YT.Player(targetElementId, {
        width: null,
        height: null,
        videoId: src,
        playerVars: {
            'playsinline': 1
        }
    });


}

export function isYoutubeUrl(url: string) {
    var p = / ^(?:http)|(?:https):\/\/(?:www.)*(?:youtube.com)|(?:youtu\.be)/;
    // console.log(url, !!url.match(p))
    return !!url.match(p);
}

export function getYTVideoId(url: string) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
        return match[2];
    }
    console.error("Could not get video id for url: " + url)
    return ""
}