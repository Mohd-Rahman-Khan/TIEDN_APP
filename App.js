import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  AppState,
  Platform,
  LogBox,
} from "react-native";
import Login from "./src/Screen/Login";
import Splash from "./src/Screen/Splash";
import AppRoutes from "./src/Navigation/Routes";
import AppNavigator from "./src/Navigation/RootNavigator";
import COLORS from "./src/GlobalConstants/COLORS";
import NetInfo from "@react-native-community/netinfo";
import NetworkError from "./src/GlobalUtils/NetworkError";
import AppStateListner from "./src/GlobalUtils/AppStateListner";
import { Provider } from "react-redux";
import store from "./src/store";
import { createStore } from "redux";
import { withPreventScreenshots } from "react-native-prevent-screenshots";
import { initPushHandler } from "./src/PushNotification/NotificationConfig";

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();
console.log = console.warn = console.error = () => {};

function App() {
  let [netInfo, setNetInfo] = useState(true);

  useEffect(() => {
    initPushHandler();
  }, []);

  useEffect(() => {
    const netListner = NetInfo.addEventListener((netstate) =>
      setNetInfo(netstate.isConnected)
    );
  }, []);

  const checkConnectivity = () => {
    NetInfo.fetch().then((netState) => {
      setNetInfo(netState.isConnected);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {!netInfo ? (
        <NetworkError
        // checkConnectivity={checkConnectivity}
        />
      ) : null}
      <AppStateListner />
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </SafeAreaView>
  );
}
export default withPreventScreenshots(App);
//export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.black
  },
});
