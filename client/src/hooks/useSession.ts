import {useEffect, useState} from "react";
import generateRandomString from "../utils/generateRandomString";

export type useSessionReturnType = {
    sessionId: string
}

export const useSession = (): useSessionReturnType => {

    const generateSessionId = () => {
        let sessionId = sessionStorage.getItem('sessionId');
        if (!sessionId) {
            sessionId = generateRandomString(10);
            sessionStorage.setItem('sessionId', sessionId);
        }
        return sessionId;
    }

    return {
        sessionId: generateSessionId()
    }
}

export default useSession;