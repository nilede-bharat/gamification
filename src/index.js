import {useEffect, useRef, useState} from 'react';
import WebView from 'react-native-webview';
import AES256 from 'aes-everywhere';
import {BackHandler, Linking, SafeAreaView} from "react-native";
import base64 from 'base-64';
import NoInternet from "./NoInternet";
import Orientation from 'react-native-orientation-locker';

export default ({
                    baseUrl = "https://thelogicalbanya.com/popupdemo/dashboard.php",
                    clientID = "demo",
                    clientKey = "demo",
                    userID = "100031",
                    username = "TheLogicalBanya",
                    keyString = "bR5z6*r$00p#Eno__odrEgeW",
                    utm_param1 = "",
                    utm_param2 = "",
                    utm_param3 = "",
                    utm_param4 = "",
                    onClose
                }) => {

    const webViewRef = useRef(null);
    const [encryptedUrl, setEncryptedUrl] = useState(false);
    const [canGoBack, setCanGoBack] = useState(baseUrl);
    const [backPress, setBackPress] = useState(false);
    const [isError, setErrorData] = useState(false);

    useEffect(() => {
        Orientation.lockToPortrait(true);
        return () => {
            Orientation.unlockAllOrientations(true);
        };
    }, []);
    useEffect(() => {
        encryptInformation();
    }, []);

    useEffect(() => {
        if (backPress && canGoBack === baseUrl) {
            if (onClose) {
                onClose();
            }
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
            clientID, key: clientKey, userID, username, utm_param1,
            utm_param2, utm_param3, utm_param4, utm_source: 'Android'
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
    const handleShouldStartLoadWithRequest = (event) => {
        const {url, navigationType} = event;
        if (url !== 'about:blank') {
            // Open external links in the default browser
            Linking.openURL(url);
            return false; // Prevent WebView from loading the URL
        }
        return true; // Allow WebView to load the URL
    };
    return (
        <SafeAreaView style={{
            flex: 1,
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 999,
        }}>
            {(encryptedUrl) ? (isError ? <NoInternet refreshPage={refreshPage}/> : <WebView
                ref={webViewRef}
                source={{uri: encryptedUrl}}
                userAgent={'android'}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                scalesPageToFit={false}
                setBuiltInZoomControls={false}
                setSupportMultipleWindows={false}
                mediaPlaybackRequiresUserAction={false}
                bounces={false}
                onError={() => setErrorData(true)}
                onNavigationStateChange={handleNavigationStateChange}
                onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
            />) : null}
        </SafeAreaView>

    );
};
