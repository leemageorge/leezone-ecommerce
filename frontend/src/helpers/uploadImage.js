const url =`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`

const uploadImage = async(image)=>{
    //Create an empty form data
    const formData = new FormData();
    // You could add a key/value pair to this using append():
    formData.append("file", image)
    formData.append("upload_preset", "lee_product")

    const dataResponse = await fetch(url, {
        method: "POST",
        body: formData
    })

    return dataResponse.json()

}

export default uploadImage