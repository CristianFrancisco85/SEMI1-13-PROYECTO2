export const URL_SERVER = 'http://ec2-3-15-156-30.us-east-2.compute.amazonaws.com:4000'
export const URL_S3 = 'https://semi1p2-13.s3.us-east-2.amazonaws.com/'

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