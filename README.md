# Gamification for android & ios platform

this package provide rewards integration of any existing system to integrate rewards and claim.

## Installation

You can install this package using npm:

```bash
npm install gamification-react-test1
```

## Usage

1.create new page and import Gamification & pass config.

```react-native
import GamificationReactTest1 from "gamification-react-test1";
import {useState} from "react";
import {Button} from "react-native";

export default (() => {
    const [open, setOpen] = useState(false);
    const baseUrl = "https://thelogicalbanya.com/popupdemo/dashboard.php";
    const clientID = "demo";
    const clientKey = "demo";
    const userID = "100031";
    const username = "TheLogicalBanya";
    const keyString = "bR5z6*r$00p#Eno__odrEgeW";
    return (<>
        {open ?
            <GamificationReactTest1
                baseUrl={baseUrl}
                clientID={clientID}
                clientKey={clientKey}
                userID={userID}
                username={username}
                keyString={keyString}
                onClose={() => setOpen(false)}/> :
            <Button title={'open'}
                    onPress={() => setOpen(true)}/>
        }

    </>);
})
```
also you can pass another optional parameters <br>
    1.utm_param1 <br>
    2.utm_param2 <br>
    3.utm_param3 <br>
    s4.utm_param4 <br>

for example
```react-native
import GamificationReactTest1 from "gamification-react-test1";
import {useState} from "react";
import {Button} from "react-native";

export default (() => {
    const [open, setOpen] = useState(false);
    const baseUrl = "https://thelogicalbanya.com/popupdemo/dashboard.php";
    const clientID = "demo";
    const clientKey = "demo";
    const userID = "100031";
    const username = "TheLogicalBanya";
    const keyString = "bR5z6*r$00p#Eno__odrEgeW";
    return (<>
        {open ?
            <GamificationReactTest1
                baseUrl={baseUrl}
                clientID={clientID}
                clientKey={clientKey}
                userID={userID}
                username={username}
                keyString={keyString}
                onClose={() => setOpen(false)}
                utm_param1="pass value"
                /> :
            <Button title={'open'}
                    onPress={() => setOpen(true)}/>
        }

    </>);
})
```
