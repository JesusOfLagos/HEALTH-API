const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string,
})


export async function uploadImage(image: any): Promise<any> {
    try {
        const result = await cloudinary.uploader.upload(image, {
            upload_preset: 'dev_setups',
        });
        return result;
    } catch (error) {
        throw error;
    }
}

export async function deleteImage(imageId: string): Promise<any> {
    try {
        const result = await cloudinary.uploader.destroy(imageId);
        return result;
    } catch (error) {
        throw error;
    }
}

export async function uploadVideo(video: any): Promise<any> {
    try {
        const result = await cloudinary.uploader.upload(video, {
            upload_preset: 'dev_setups',
        });
        return result;
    } catch (error) {
        throw error;
    }
}


export async function deleteVideo(videoId: string): Promise<any> {
    try {
        const result = await cloudinary.uploader.destroy(videoId);
        return result;
    } catch (error) {
        throw error;
    }
}

export async function uploadAudio(audio: any): Promise<any> {
    try {
        const result = await cloudinary.uploader.upload(audio, {
            upload_preset: 'dev_setups',
        });
        return result;
    } catch (error) {
        throw error;
    }
}

    export async function deleteAudio(audioId: string): Promise<any> {
        try {
            const result = await cloudinary.uploader.destroy(audioId);
            return result;
        } catch (error) {
            throw error;
        }
    }

    export async function uploadDocument(document: any): Promise<any> {
        try {
            const result = await cloudinary.uploader.upload(document, {
                upload_preset: 'dev_setups',
            });
            return result;
        } catch (error) {
            throw error;
        }
    }


    export async function deleteDocument(documentId: string): Promise<any> {
        try {
            const result = await cloudinary.uploader.destroy(documentId);
            return result;
        } catch (error) {
            throw error;
        }
    }

    export async function uploadFile(file: any): Promise<any> {
        try {
            const result = await cloudinary.uploader.upload(file, {
                upload_preset: 'dev_setups',
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

    export async function deleteFile(fileId: string): Promise<any> {
        try {
            const result = await cloudinary.uploader.destroy(fileId);
            return result;
        } catch (error) {
            throw error;
        }
    }

    export async function uploadImages(images: any): Promise<any> {
        try {
            const result = await cloudinary.uploader.upload(images, {
                upload_preset: 'dev_setups',
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

    export async function deleteImages(imagesId: string): Promise<any> {
        try {
            const result = await cloudinary.uploader.destroy(imagesId);
            return result;
        } catch (error) {
            throw error;
        }
    }


    export async function uploadVideos(videos: any): Promise<any> {
        try {
            const result = await cloudinary.uploader.upload(videos, {
                upload_preset: 'dev_setups',
            });
            return result;
        } catch (error) {
            throw error;
        }
    }


    export async function deleteVideos(videosId: string): Promise<any> {
        try {
            const result = await cloudinary.uploader.destroy(videosId);
            return result;
        } catch (error) {
            throw error;
        }
    }


    