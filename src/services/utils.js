export const encodeBase64 = async (myblob) =>{

    let base64 = await new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(myblob);
    })
    base64 = base64.replace('data:image/png;base64,','')
    base64 = base64.replace('data:image/jpeg;base64,','')
    base64 = base64.replace('data:application/pdf;base64,','')
    return base64

}