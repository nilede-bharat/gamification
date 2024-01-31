import {useEffect, useRef, useState} from 'react';
import WebView from 'react-native-webview';
import AES256 from 'aes-everywhere';
import {BackHandler, Pressable, SafeAreaView, Text} from "react-native";
import base64 from 'base-64';
import NoInternet from "./src/NoInternet";

export default ({
                    baseUrl = "https://thelogicalbanya.com/popupdemo/dashboard.php",
                    clientID = "demo",
                    key = "demo",
                    userID = "100031",
                    username = "TheLogicalBanya",
                    keyString = "bR5z6*r$00p#Eno__odrEgeW",
                    utm_param1 = "",
                    utm_param2 = "",
                    utm_param3 = "",
                    utm_param4 = "",
                    children,
                    style,
                    title = "test"
                }) => {

    const webViewRef = useRef(null);
    const [encryptedUrl, setEncryptedUrl] = useState(false);
    const [canGoBack, setCanGoBack] = useState(baseUrl);
    const [open, setOpen] = useState(false);
    const [backPress, setBackPress] = useState(false);
    const [isError, setErrorData] = useState(false);

    useEffect(() => {
        encryptInformation();
    }, []);

    useEffect(() => {
        if (backPress && canGoBack === baseUrl) {
            setOpen(false);
        }
    }, [backPress]);


    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButton);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
        };
    }, []);


    const encryptInformation = () => {
        let encryptedData = AES256.encrypt(JSON.stringify({
            clientID, key, userID, username, utm_param1, utm_param2, utm_param3, utm_param4, utm_source: 'Android'
        }), keyString);
        const encode = base64.encode(encryptedData);
        const encodedData = encodeURIComponent(encode);
        const finalUrl = `${baseUrl}?data=${encodedData}`;
        setEncryptedUrl(finalUrl);
    }

    const handleNavigationStateChange = (event) => {
        setBackPress(false);
        if (event.url && !event.loading) {
            setCanGoBack(event.url)
        }
    }

    const handleBackButton = () => {
        setBackPress(true);
        try {
            webViewRef.current.goBack();
        } catch (e) {
            console.log(e);
        }
        return true;
    };
    const refreshPage = () => {
        setErrorData(false);
    }
    const openWeb = () => {
        setOpen(true);
    }
    return (
        <SafeAreaView style={{flex: 1}}>
        {(encryptedUrl && open) ? (isError ? <NoInternet refreshPage={refreshPage}/> : <WebView
            ref={webViewRef}
            source={{uri: encryptedUrl}}
            userAgent={'android'}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            scalesPageToFit={false}
            onError={() => setErrorData(true)}
            onNavigationStateChange={handleNavigationStateChange}
        />) : <Pressable onPress={openWeb} style={{...style}}>
            {children ?? <Text
                style={{color: 'white', backgroundColor: '#354156', textAlign: 'center', padding: 10}}>Test</Text>}
        </Pressable>}
    </SafeAreaView>
    );
};
