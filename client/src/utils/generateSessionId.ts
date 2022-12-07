
import generateRandomString from "./generateRandomString";

const generateSessionId = () => {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
        sessionId = generateRandomString(10);
        sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
}

export default generateSessionId;