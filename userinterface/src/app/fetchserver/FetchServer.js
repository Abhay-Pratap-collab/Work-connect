import axios from "axios";
const serverURL = "http://localhost:5000";
const postData = async (URL, body) => {
    try {
        const response = await axios.post(`${serverURL}/${URL}`, body)
        return response.data;
    }

    catch (e) {
        console.log("Errrr:", e)
        return null
        // 4. More descriptive error logging

    }
}

const getData = async (URL) => {


    try {
        var response = await axios.get(`${serverURL}/${URL}`)
        var res = response.data
        return res



    } catch (e) {
        console.log("Errrr:", e)
        return null

    }

}

export { postData, serverURL, getData }