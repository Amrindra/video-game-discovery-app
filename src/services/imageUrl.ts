
// This functiono is uesed to optimize the image size. This helps to improve the laooding image
// This API support cropping the image on the fly, so what this function does to add "CROP/600/400" to reduce the image size
const getCroppedImageUrl = (url: string) => {
    const target = 'media/'
    const index = url.indexOf(target) + target.length;
    return  url.slice(0, index) + 'crop/600/400/' + url.slice(index)
}

export default getCroppedImageUrl