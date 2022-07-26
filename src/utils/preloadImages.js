const images = [
    '../../../assets/img/lose-min.webp',
    '../../../assets/img/right-min.webp',
    '../../../assets/img/start_img.webp',
    '../../../assets/img/win-min.webp'
]

export const preloadImages = () => {
    images.forEach(imagePath => {
        const img = new Image();
        img.src = imagePath
    })
}