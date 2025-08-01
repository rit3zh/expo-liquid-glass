import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Video from "react-native-video";
import {
  ExpoLiquidGlassView,
  CornerStyle,
  LiquidGlassType,
} from "expo-liquid-glass-view";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";

const WIDTH: number = 300;
const HEIGHT: number = 300;
const BORDER_RADIUS: number = 999;

const App = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setForceUpdate((prev) => prev + 1);
    }, 100);
    return () => clearTimeout(timer);
  }, [videoLoaded]);

  useEffect(() => {
    const interval = setInterval(() => {
      setForceUpdate((prev) => prev + 1);
    }, 1000);

    const cleanup = setTimeout(() => {
      clearInterval(interval);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(cleanup);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Video
        source={require("./video/background-beach.mp4")}
        style={StyleSheet.absoluteFillObject}
        muted
        repeat
        resizeMode="cover"
      />

      <SafeAreaView style={styles.overlay}>
        <View style={styles.videoContainer}>
          <Video
            source={require("./video/fish-pond.mp4")}
            style={styles.video}
            muted
            repeat
            resizeMode="cover"
            onLoad={() => setVideoLoaded(true)}
            onLoadStart={() => setVideoLoaded(false)}
          />

          {videoLoaded && (
            <ExpoLiquidGlassView
              key={forceUpdate}
              cornerRadius={BORDER_RADIUS}
              style={styles.glassOverlay}
              type={LiquidGlassType.Clear}
              cornerStyle={CornerStyle.Continuous}
            >
              <View style={styles.glassContent}>
                <View style={styles.innerView} />
              </View>
            </ExpoLiquidGlassView>
          )}
        </View>

        <View style={styles.bottomContent}>
          <ExpoLiquidGlassView
            cornerRadius={16}
            cornerStyle={CornerStyle.Circular}
            type={LiquidGlassType.Clear}
            style={styles.statsCard}
          >
            <View style={styles.statsContent}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>24°C</Text>
                <Text style={styles.statLabel}>Temperature</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>8</Text>
                <Text style={styles.statLabel}>Fish</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>94%</Text>
                <Text style={styles.statLabel}>Oxygen</Text>
              </View>
            </View>
          </ExpoLiquidGlassView>

          <View style={styles.controls}>
            <TouchableOpacity style={styles.controlButton}>
              <ExpoLiquidGlassView
                cornerRadius={25}
                cornerStyle={CornerStyle.Circular}
                type={LiquidGlassType.Clear}
                style={styles.controlGlass}
              >
                <View style={styles.controlContent}>
                  <MaterialCommunityIcons
                    name="food-turkey"
                    size={24}
                    color="white"
                  />
                </View>
              </ExpoLiquidGlassView>
              <Text style={styles.controlText}>Feed</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlButton}>
              <ExpoLiquidGlassView
                cornerRadius={25}
                cornerStyle={CornerStyle.Circular}
                type={LiquidGlassType.Clear}
                style={styles.controlGlass}
              >
                <View style={styles.controlContent}>
                  <FontAwesome6 name="lightbulb" size={24} color="white" />
                </View>
              </ExpoLiquidGlassView>
              <Text style={styles.controlText}>Light</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlButton}>
              <ExpoLiquidGlassView
                cornerRadius={25}
                cornerStyle={CornerStyle.Circular}
                type={LiquidGlassType.Clear}
                style={styles.controlGlass}
              >
                <View style={styles.controlContent}>
                  <FontAwesome6 name="gear" size={22} color="white" />
                </View>
              </ExpoLiquidGlassView>
              <Text style={styles.controlText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  videoContainer: {
    position: "relative",
    width: WIDTH,
    height: HEIGHT,
    borderRadius: BORDER_RADIUS,
    overflow: "hidden",
    bottom: 100,
  },
  video: {
    width: WIDTH,
    height: HEIGHT,
    position: "absolute",
    top: 0,
    left: 0,
  },
  glassOverlay: {
    height: HEIGHT,
    width: WIDTH,
  },
  glassContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerView: {
    overflow: "hidden",
    width: WIDTH,
    height: HEIGHT,
    borderRadius: BORDER_RADIUS,
  },
  bottomContent: {
    width: "90%",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "90%",
    position: "absolute",
  },
  statsCard: {
    width: "80%",
    height: 80,
    marginBottom: 40,
  },
  statsContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#888888",
    fontWeight: "400",
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#333333",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
    marginBottom: 40,
  },
  controlButton: {
    alignItems: "center",
  },
  controlGlass: {
    width: 50,
    height: 50,
    marginBottom: 12,
  },
  controlContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  controlIcon: {
    fontSize: 20,
  },
  controlText: {
    fontSize: 14,
    color: "#cccccc",
    fontWeight: "400",
  },
});
