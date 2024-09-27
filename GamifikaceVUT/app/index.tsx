import CourseItem from "@/components/course_ui/course_item";
import NavigationButton from "@/components/navigation/NavigationButton";
import NavifgationButton from "@/components/navigation/NavigationButton";
import { Link, router } from "expo-router";
import { View,Text, Pressable, StyleSheet, ScrollView, Button } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
const HomePage = () => {
    return ( 
        <View style={styles.container}>
            <Button title="login" onPress={()=> router.push({
              pathname: "/courses/course_selector/[user_id]",
              params: {user_id: "xlogin"}
    })}/>
        </View>
     );
     
}
const styles = StyleSheet.create({
  container: {
      flex: 1,                    // Flexbox pre natiahnutie view na celú obrazovku
      justifyContent: 'center',    // Vertikálne vycentrovanie
      alignItems: 'center',        // Horizontálne vycentrovanie
  },
});

export default HomePage;