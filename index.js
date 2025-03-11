import { registerRootComponent } from 'expo'; 
import { AppRegistry } from 'react-native';  
import App from './App'; 
import { name as appName } from './app.json';  
import { Platform } from 'react-native'; 
import { View, Text } from 'react-native-web';  

registerRootComponent(App);


if (Platform.OS === 'web') {
  AppRegistry.registerComponent(appName, () => App);

  
  AppRegistry.runApplication(appName, {
    initialProps: {},
    rootTag: document.getElementById('app-root'),  
  });
}

