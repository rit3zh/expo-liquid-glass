import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Button,
  Animated,
} from "react-native";
import React, { useState, useRef } from "react";
import {
  CornerStyle,
  ExpoLiquidGlassView,
  LiquidGlassType,
} from "expo-liquid-glass-view";
import { SymbolView } from "expo-symbols";
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import * as constants from "./constants";
import Video from "react-native-video";

export default function App() {
  const [showEye, setShowEye] = useState<boolean>(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const videoSources = [
    require("./video/liquid-background.mp4"),
    require("./video/abstract.mp4"),
    require("./video/sunny-beach.mp4"),
  ];

  const handleVideoChange = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    Animated.sequence([
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),

      Animated.delay(50),

      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsTransitioning(false);
    });

    setTimeout(() => {
      const nextIndex = (currentVideoIndex + 1) % videoSources.length;
      setCurrentVideoIndex(nextIndex);
    }, 350);
  };

  const onEyePress = () => {
    setShowEye(!showEye);
  };

  return (
    <View style={styles.container}>
      <Video
        source={videoSources[currentVideoIndex]}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        muted={true}
        repeat={true}
        paused={false}
        playInBackground={false}
        playWhenInactive={false}
      />

      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            opacity: overlayOpacity,
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 1,
          },
        ]}
        pointerEvents="none"
      />

      <View style={[StyleSheet.absoluteFill, { zIndex: 2 }]}>
        <StatusBar barStyle="light-content" />

        <ScrollView
          contentInsetAdjustmentBehavior="always"
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <ExpoLiquidGlassView
              cornerRadius={25}
              cornerStyle={CornerStyle.Circular}
              type={LiquidGlassType.Clear}
              style={styles.headerGlass}
            >
              <View style={styles.headerContent}>
                <View style={styles.headerTop}>
                  <View style={styles.profileSection}>
                    <ExpoLiquidGlassView
                      cornerRadius={25}
                      cornerStyle={CornerStyle.Circular}
                      type={LiquidGlassType.Clear}
                      style={styles.profileAvatar}
                    >
                      <View style={styles.avatarContent}>
                        <Ionicons name="person" size={20} color="white" />
                      </View>
                    </ExpoLiquidGlassView>
                    <View style={styles.greetingSection}>
                      <Text style={styles.greeting}>Good Evening</Text>
                      <Text style={styles.userName}>rit3zh</Text>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <ExpoLiquidGlassView
                      cornerRadius={20}
                      cornerStyle={CornerStyle.Circular}
                      type={LiquidGlassType.Clear}
                      style={styles.notificationIcon}
                    >
                      <View style={styles.iconContent}>
                        <Ionicons
                          name="notifications-outline"
                          size={18}
                          color="white"
                        />
                        <View style={styles.notificationBadge} />
                      </View>
                    </ExpoLiquidGlassView>
                  </TouchableOpacity>
                </View>
              </View>
            </ExpoLiquidGlassView>
          </View>

          <View style={styles.quickActionsSection}>
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity style={styles.quickActionItem}>
                <ExpoLiquidGlassView
                  cornerRadius={30}
                  cornerStyle={CornerStyle.Circular}
                  type={LiquidGlassType.Clear}
                  style={styles.quickActionGlass}
                >
                  <View style={styles.quickActionContent}>
                    <SymbolView
                      name="creditcard"
                      size={24}
                      type="monochrome"
                      tintColor="white"
                    />
                    <Text style={styles.quickActionText}>Pay</Text>
                  </View>
                </ExpoLiquidGlassView>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickActionItem}>
                <ExpoLiquidGlassView
                  cornerRadius={30}
                  cornerStyle={CornerStyle.Circular}
                  type={LiquidGlassType.Clear}
                  style={styles.quickActionGlass}
                >
                  <View style={styles.quickActionContent}>
                    <SymbolView
                      name="arrow.up.arrow.down"
                      size={24}
                      type="monochrome"
                      tintColor="white"
                    />
                    <Text style={styles.quickActionText}>Transfer</Text>
                  </View>
                </ExpoLiquidGlassView>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickActionItem}>
                <ExpoLiquidGlassView
                  cornerRadius={30}
                  cornerStyle={CornerStyle.Circular}
                  type={LiquidGlassType.Clear}
                  style={styles.quickActionGlass}
                >
                  <View style={styles.quickActionContent}>
                    <SymbolView
                      name="plus"
                      size={24}
                      type="monochrome"
                      tintColor="white"
                    />
                    <Text style={styles.quickActionText}>Top Up</Text>
                  </View>
                </ExpoLiquidGlassView>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickActionItem}>
                <ExpoLiquidGlassView
                  cornerRadius={30}
                  cornerStyle={CornerStyle.Circular}
                  type={LiquidGlassType.Clear}
                  style={styles.quickActionGlass}
                >
                  <View style={styles.quickActionContent}>
                    <SymbolView
                      name="chart.bar"
                      size={24}
                      type="monochrome"
                      tintColor="white"
                    />
                    <Text style={styles.quickActionText}>Analytics</Text>
                  </View>
                </ExpoLiquidGlassView>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.balanceSection}>
            <ExpoLiquidGlassView
              cornerRadius={20}
              cornerStyle={CornerStyle.Circular}
              type={LiquidGlassType.Clear}
              style={styles.balanceOverviewGlass}
            >
              <View style={styles.balanceOverviewContent}>
                <View style={styles.balanceHeader}>
                  <Text style={styles.balanceTitle}>Total Balance</Text>
                  <TouchableOpacity onPress={onEyePress}>
                    <Feather
                      name={showEye ? "eye" : "eye-off"}
                      size={18}
                      color="rgba(255,255,255,0.7)"
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.totalBalance}>
                  {showEye ? "$12,547.85" : "**********"}
                </Text>
                <View style={styles.balanceChange}>
                  <AntDesign name="arrowup" size={12} color="#4ECDC4" />
                  <Text style={styles.changeText}>+2.5% from last month</Text>
                </View>

                <View style={styles.balanceBreakdown}>
                  <View style={styles.breakdownItem}>
                    <Text style={styles.breakdownLabel}>Checking</Text>
                    <Text style={styles.breakdownAmount}>$8,247.85</Text>
                  </View>
                  <View style={styles.breakdownItem}>
                    <Text style={styles.breakdownLabel}>Savings</Text>
                    <Text style={styles.breakdownAmount}>$4,300.00</Text>
                  </View>
                </View>
              </View>
            </ExpoLiquidGlassView>
          </View>

          <View style={styles.cardSection}>
            <View style={styles.sectionHeader}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  color: "white",
                  marginBottom: 10,
                }}
              >
                My Cards
              </Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.cardsScroll}
            >
              <ExpoLiquidGlassView
                cornerRadius={20}
                cornerStyle={CornerStyle.Circular}
                type={LiquidGlassType.Clear}
                style={styles.creditCardGlass}
              >
                <View style={styles.creditCardContent}>
                  <View style={styles.cardHeader}>
                    <ExpoLiquidGlassView
                      cornerRadius={8}
                      cornerStyle={CornerStyle.Circular}
                      type={LiquidGlassType.Clear}
                      style={styles.cardChip}
                    >
                      <View style={styles.chipContent}>
                        <MaterialCommunityIcons
                          name="chip"
                          size={20}
                          color="rgba(255,255,255,0.8)"
                        />
                      </View>
                    </ExpoLiquidGlassView>
                    <FontAwesome name="cc-visa" size={24} color="white" />
                  </View>

                  <Text style={styles.cardNumber}>2566 8478 8974 2135</Text>
                  <Text style={styles.cardHolder}>FIDAN PARAJULLAYEVA</Text>

                  <View style={styles.cardFooter}>
                    <Text style={styles.expiryDate}>10/27</Text>
                    <ExpoLiquidGlassView
                      cornerRadius={15}
                      cornerStyle={CornerStyle.Circular}
                      type={LiquidGlassType.Clear}
                      style={styles.contactlessIcon}
                    >
                      <View style={styles.contactlessContent}>
                        <MaterialCommunityIcons
                          name="contactless-payment"
                          size={16}
                          color="white"
                        />
                      </View>
                    </ExpoLiquidGlassView>
                  </View>
                </View>
              </ExpoLiquidGlassView>

              <ExpoLiquidGlassView
                cornerRadius={20}
                cornerStyle={CornerStyle.Circular}
                type={LiquidGlassType.Clear}
                style={[styles.creditCardGlass, styles.secondaryCard]}
              >
                <View style={styles.creditCardContent}>
                  <View style={styles.cardHeader}>
                    <ExpoLiquidGlassView
                      cornerRadius={8}
                      cornerStyle={CornerStyle.Circular}
                      type={LiquidGlassType.Clear}
                      style={styles.cardChip}
                    >
                      <View style={styles.chipContent}>
                        <MaterialCommunityIcons
                          name="chip"
                          size={20}
                          color="rgba(255,255,255,0.8)"
                        />
                      </View>
                    </ExpoLiquidGlassView>
                    <FontAwesome name="cc-mastercard" size={24} color="white" />
                  </View>

                  <Text style={styles.cardNumber}>4521 •••• •••• 8901</Text>
                  <Text style={styles.cardHolder}>BUSINESS CARD</Text>

                  <View style={styles.cardFooter}>
                    <Text style={styles.expiryDate}>08/26</Text>
                    <ExpoLiquidGlassView
                      cornerRadius={15}
                      cornerStyle={CornerStyle.Circular}
                      type={LiquidGlassType.Clear}
                      style={styles.contactlessIcon}
                    >
                      <View style={styles.contactlessContent}>
                        <MaterialCommunityIcons
                          name="contactless-payment"
                          size={16}
                          color="white"
                        />
                      </View>
                    </ExpoLiquidGlassView>
                  </View>
                </View>
              </ExpoLiquidGlassView>
            </ScrollView>
          </View>

          <View style={styles.analyticsSection}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "white",
                marginBottom: 30,
                marginTop: 20,
              }}
            >
              This Month's Spending
            </Text>

            <ExpoLiquidGlassView
              cornerRadius={20}
              cornerStyle={CornerStyle.Circular}
              type={LiquidGlassType.Clear}
              style={{
                width: "100%",
                height: 250,
              }}
            >
              <View style={styles.analyticsContent}>
                <View style={styles.spendingHeader}>
                  <Text style={styles.spentAmount}>$2,847.32</Text>
                  <Text style={styles.spentLabel}>of $5,000 budget</Text>
                </View>

                <View style={styles.progressBar}>
                  <View style={styles.progressFill} />
                </View>

                <View style={styles.categoriesGrid}>
                  <View style={styles.categoryItem}>
                    <ExpoLiquidGlassView
                      cornerRadius={15}
                      cornerStyle={CornerStyle.Circular}
                      type={LiquidGlassType.Clear}
                      style={styles.categoryIcon}
                    >
                      <View style={styles.categoryIconContent}>
                        <SymbolView
                          name="fork.knife"
                          size={16}
                          type="monochrome"
                          tintColor="#FF6B6B"
                        />
                      </View>
                    </ExpoLiquidGlassView>
                    <Text style={styles.categoryLabel}>Food</Text>
                    <Text style={styles.categoryAmount}>$847</Text>
                  </View>

                  <View style={styles.categoryItem}>
                    <ExpoLiquidGlassView
                      cornerRadius={15}
                      cornerStyle={CornerStyle.Circular}
                      type={LiquidGlassType.Clear}
                      style={styles.categoryIcon}
                    >
                      <View style={styles.categoryIconContent}>
                        <SymbolView
                          name="car"
                          size={16}
                          type="monochrome"
                          tintColor="#4ECDC4"
                        />
                      </View>
                    </ExpoLiquidGlassView>
                    <Text style={styles.categoryLabel}>Transport</Text>
                    <Text style={styles.categoryAmount}>$234</Text>
                  </View>

                  <View style={styles.categoryItem}>
                    <ExpoLiquidGlassView
                      cornerRadius={15}
                      cornerStyle={CornerStyle.Circular}
                      type={LiquidGlassType.Clear}
                      style={styles.categoryIcon}
                    >
                      <View style={styles.categoryIconContent}>
                        <SymbolView
                          name="bag"
                          size={16}
                          type="monochrome"
                          tintColor="#FFD93D"
                        />
                      </View>
                    </ExpoLiquidGlassView>
                    <Text style={styles.categoryLabel}>Shopping</Text>
                    <Text style={styles.categoryAmount}>$1,245</Text>
                  </View>

                  <View style={styles.categoryItem}>
                    <ExpoLiquidGlassView
                      cornerRadius={15}
                      cornerStyle={CornerStyle.Circular}
                      type={LiquidGlassType.Clear}
                      style={styles.categoryIcon}
                    >
                      <View style={styles.categoryIconContent}>
                        <SymbolView
                          name="gamecontroller"
                          size={16}
                          type="monochrome"
                          tintColor="#A8E6CF"
                        />
                      </View>
                    </ExpoLiquidGlassView>
                    <Text style={styles.categoryLabel}>Entertainment</Text>
                    <Text style={styles.categoryAmount}>$521</Text>
                  </View>
                </View>
              </View>
            </ExpoLiquidGlassView>
          </View>

          <View style={styles.transactionsSection}>
            <View style={styles.sectionHeader}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  color: "white",
                  marginBottom: 3,
                }}
              >
                Recent Transactions
              </Text>
            </View>

            <ExpoLiquidGlassView
              cornerRadius={18}
              cornerStyle={CornerStyle.Circular}
              type={LiquidGlassType.Clear}
              style={{
                width: "100%",
                height: 125,
              }}
            >
              <View style={styles.transactionContent}>
                <View style={{ flexDirection: "row", bottom: 10 }}>
                  <ExpoLiquidGlassView
                    cornerRadius={22}
                    cornerStyle={CornerStyle.Circular}
                    type={LiquidGlassType.Clear}
                    style={styles.transactionIcon}
                  >
                    <View style={styles.transactionIconContent}>
                      <SymbolView
                        name="cup.and.saucer"
                        size={20}
                        type="monochrome"
                        tintColor="#FF6B6B"
                      />
                    </View>
                  </ExpoLiquidGlassView>
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionName}>Friends Cafe</Text>
                    <Text style={styles.transactionLocation}>
                      182 9th Ave, New York
                    </Text>
                    <Text style={styles.transactionTime}>Today, 2:30 PM</Text>
                  </View>
                  <View style={styles.transactionRight}>
                    <Text style={styles.transactionAmount}>-$64.00</Text>
                    <MaterialCommunityIcons
                      name="contactless-payment"
                      size={14}
                      color="rgba(255,255,255,0.6)"
                    />
                  </View>
                </View>
              </View>
            </ExpoLiquidGlassView>

            <ExpoLiquidGlassView
              cornerRadius={18}
              cornerStyle={CornerStyle.Circular}
              type={LiquidGlassType.Clear}
              style={{
                width: "100%",
                height: 125,
              }}
            >
              <View style={styles.transactionContent}>
                <View style={{ flexDirection: "row", bottom: 10 }}>
                  <ExpoLiquidGlassView
                    cornerRadius={22}
                    cornerStyle={CornerStyle.Circular}
                    type={LiquidGlassType.Clear}
                    style={styles.transactionIcon}
                  >
                    <View style={styles.transactionIconContent}>
                      <SymbolView
                        name="house"
                        size={20}
                        type="monochrome"
                        tintColor="#4ECDC4"
                      />
                    </View>
                  </ExpoLiquidGlassView>
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionName}>House Rent</Text>
                    <Text style={styles.transactionLocation}>
                      Monthly Payment
                    </Text>
                    <Text style={styles.transactionTime}>Dec 19, 9:00 AM</Text>
                  </View>
                  <View style={styles.transactionRight}>
                    <Text style={styles.transactionAmountLarge}>
                      -$1,685.00
                    </Text>
                    <Feather
                      name="repeat"
                      size={14}
                      color="rgba(255,255,255,0.6)"
                    />
                  </View>
                </View>
              </View>
            </ExpoLiquidGlassView>

            <ExpoLiquidGlassView
              cornerRadius={18}
              cornerStyle={CornerStyle.Circular}
              type={LiquidGlassType.Clear}
              style={{
                width: "100%",
                height: 125,
              }}
            >
              <View style={styles.transactionContent}>
                <View style={{ flexDirection: "row", bottom: 10 }}>
                  <ExpoLiquidGlassView
                    cornerRadius={22}
                    cornerStyle={CornerStyle.Circular}
                    type={LiquidGlassType.Clear}
                    style={styles.transactionIcon}
                  >
                    <View style={styles.transactionIconContent}>
                      <SymbolView
                        name="arrow.down"
                        size={20}
                        type="monochrome"
                        tintColor="#A8E6CF"
                      />
                    </View>
                  </ExpoLiquidGlassView>
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionName}>Salary Deposit</Text>
                    <Text style={styles.transactionLocation}>
                      Monthly Salary
                    </Text>
                    <Text style={styles.transactionTime}>Dec 15, 8:00 AM</Text>
                  </View>
                  <View style={styles.transactionRight}>
                    <Text style={styles.transactionAmountPositive}>
                      +$5,200.00
                    </Text>
                    <AntDesign name="checkcircle" size={14} color="#A8E6CF" />
                  </View>
                </View>
              </View>
            </ExpoLiquidGlassView>
          </View>

          <View style={styles.goalsSection}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "white",
                marginBottom: 30,
              }}
            >
              Savings Goals
            </Text>

            <ExpoLiquidGlassView
              cornerRadius={20}
              cornerStyle={CornerStyle.Circular}
              type={LiquidGlassType.Clear}
              style={styles.goalGlass}
            >
              <View style={styles.goalContent}>
                <View style={styles.goalHeader}>
                  <ExpoLiquidGlassView
                    cornerRadius={20}
                    cornerStyle={CornerStyle.Circular}
                    type={LiquidGlassType.Clear}
                    style={styles.goalIcon}
                  >
                    <View style={styles.goalIconContent}>
                      <SymbolView
                        name="airplane"
                        size={20}
                        type="monochrome"
                        tintColor="#FFD93D"
                      />
                    </View>
                  </ExpoLiquidGlassView>
                  <View style={styles.goalInfo}>
                    <Text style={styles.goalTitle}>Vacation Fund</Text>
                    <Text style={styles.goalDescription}>Trip to Japan</Text>
                  </View>
                  <Text style={styles.goalPercentage}>68%</Text>
                </View>

                <View style={styles.goalProgress}>
                  <View style={styles.goalProgressBar}>
                    <View style={styles.goalProgressFill} />
                  </View>
                  <Text style={styles.goalAmount}>$3,400 of $5,000</Text>
                </View>
              </View>
            </ExpoLiquidGlassView>

            <Button
              title="Change Background Video"
              color={"white"}
              onPress={handleVideoChange}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 25,
  },
  headerGlass: {
    width: "100%",
    height: 90,
  },
  headerContent: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileAvatar: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  avatarContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  greetingSection: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  notificationIcon: {
    width: 40,
    height: 40,
    right: 40,
  },
  iconContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B6B",
  },
  quickActionsSection: {
    marginBottom: 25,
  },
  quickActionsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickActionItem: {
    flex: 1,
    marginHorizontal: 5,
  },
  quickActionGlass: {
    width: "100%",
    height: 80,
  },
  quickActionContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  quickActionText: {
    fontSize: 12,
    color: "white",
    marginTop: 8,
    fontWeight: "500",
  },
  balanceSection: {
    marginBottom: 25,
  },
  balanceOverviewGlass: {
    width: "100%",
    height: 200,
  },
  balanceOverviewContent: {
    flex: 1,
    padding: 25,
  },
  balanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  balanceTitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  totalBalance: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  balanceChange: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  changeText: {
    fontSize: 14,
    color: "#4ECDC4",
    marginLeft: 5,
  },
  balanceBreakdown: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  breakdownItem: {
    flex: 1,
  },
  breakdownLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: 4,
  },
  breakdownAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  cardSection: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 40,
  },
  seeAllText: {
    fontSize: 14,
    color: "#4ECDC4",
    fontWeight: "500",
  },
  cardsScroll: {
    flexDirection: "row",
  },
  creditCardGlass: {
    width: 280,
    height: 180,
    marginRight: 15,
  },
  secondaryCard: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  creditCardContent: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardChip: {
    width: 40,
    height: 32,
  },
  chipContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  visaText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    fontStyle: "italic",
  },
  mastercardText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    letterSpacing: 2,
    marginTop: 20,
  },
  cardHolder: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  expiryDate: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
  },
  contactlessIcon: {
    width: 30,
    height: 30,
  },
  contactlessContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  analyticsSection: {
    marginBottom: 25,
  },
  analyticsGlass: {
    width: "100%",
    height: 240,
  },
  analyticsContent: {
    flex: 1,
    padding: 25,
  },
  spendingHeader: {
    marginBottom: 15,
  },
  spentAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  spentLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 4,
    marginBottom: 20,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    width: "57%",
    backgroundColor: "#4ECDC4",
    borderRadius: 4,
  },
  categoriesGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryItem: {
    alignItems: "center",
    flex: 1,
  },
  categoryIcon: {
    width: 30,
    height: 30,
    marginBottom: 8,
  },
  categoryIconContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 4,
  },
  categoryAmount: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  transactionsSection: {
    marginBottom: 25,
    gap: 12,
  },
  transactionGlass: {
    width: "100%",
    height: 85,
  },
  transactionContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  transactionIcon: {
    width: 44,
    height: 44,
    marginRight: 15,
  },
  transactionIconContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginBottom: 2,
  },
  transactionLocation: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: 2,
  },
  transactionTime: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
  },
  transactionRight: {
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B6B",
    marginBottom: 4,
  },
  transactionAmountLarge: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B6B",
    marginBottom: 4,
  },
  transactionAmountPositive: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#A8E6CF",
    marginBottom: 4,
  },
  goalsSection: {
    marginBottom: 25,
  },
  goalGlass: {
    width: "100%",
    height: 170,
  },
  goalContent: {
    flex: 1,
    padding: 20,
  },
  goalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  goalIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  goalIconContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginBottom: 2,
  },
  goalDescription: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
  },
  goalPercentage: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFD93D",
  },
  goalProgress: {
    gap: 8,
  },
  goalProgressBar: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 4,
    overflow: "hidden",
  },
  goalProgressFill: {
    height: "100%",
    width: "68%",
    backgroundColor: "#FFD93D",
    borderRadius: 4,
  },
  goalAmount: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
  },
});
