import Game from './index';
import {useState} from "react";
import {Button, View} from "react-native";

export default (() => {

    const [open, setOpen] = useState(false);
    return (<>
        {open ? <Game onClose={() => setOpen(false)}/> :
            <Button title={'open'}
                    onPress={() => setOpen(true)}

            />
        }
    </>)
})
