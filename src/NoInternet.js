import {Image, Text, View} from "react-native";

const imgUrl = require("./no-internet.jpg");
export default ({refreshPage}) => {
    return (<View style={{backgroundColor: "white", flex: 1}}>
        <Image
            source={imgUrl}
            style={{width: 400, height: 400, marginTop: 100, marginLeft: "auto", marginRight: "auto"}}
        />
        <Text style={{color: "black", textAlign: "center", fontSize: 20}}>No internet connection!
            <Text onPress={refreshPage} style={{color: "blue", paddingLeft: 10}}> Reload</Text>
        </Text>
    </View>);
};
