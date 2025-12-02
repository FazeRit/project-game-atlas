//images.igdb.com/igdb/image/upload/t_thumb/co3lwr.jpg

export const transformCoverUrl = (url?: string | null) => {
    if(!url) {
        return 'https://placehold.co/260x192/404040/FFFFFF?text=No+Cover';
    }

    const result = url.replace('t_thumb','t_1080p');

    return result
}