import { router } from "expo-router";
import { Button } from "react-native";
import { View } from "react-native";
interface NavigationButtonProps{
    title: string;
    url: string;
}
function navigateTo(url:string){
    router.push({
        pathname: "/"+url,
        params: {id: url}
    })
}
const NavigationButton = (props:NavigationButtonProps) => {
    return ( 
    <View>
        <Button title={props.title} onPress={()=>navigateTo(props.url)}/>
    </View> 
    );
}
 
export default NavigationButton;