// Load Progress
const loadingBannerLeft = document.querySelector(".banner-left-content__loading");
const loadingBannerRightTop = document.querySelector(".banner-right__content-top-loading");
const loadingBannerRightBottom = document.querySelector(".banner-right__content-bottom-loading");

function loadingProgress() {
    setTimeout(() => {
        console.log(loadingBannerLeft);
        loadingBannerLeft.style.display = 'none';
        loadingBannerRightTop.style.display = 'none';
        loadingBannerRightBottom.style.display = 'none';
    }, 1000);
}
loadingProgress();