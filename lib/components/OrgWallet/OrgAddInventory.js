import React from "react"
import {
  calculateWidthRatio,
  calculateHeightRatio,
} from "circles-mobile/lib/utilities/sizingHelper"
import { Image, View, Text, TouchableHighlight } from "react-native"
import { primary, mediumBackground, mediumLightBackground } from "circles-mobile/lib/styles/styles"

const OrgAddInventory = props => (
  <View style={{ flex: 1, backgroundColor: mediumBackground }}>
    <View
      style={{
        flex: 0.22,
        backgroundColor: mediumLightBackground,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 3 },
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 25,
          marginLeft: 23,
          marginRight: 23,
        }}>
        <TouchableHighlight
          style={{ alignItems: "center", justifyContent: "center", height: 35, width: 35 }}
          onPress={() => {
            this.props.navigation.goBack()
          }}>
          <Image
            style={{
              height: calculateHeightRatio(35),
              width: calculateWidthRatio(35),
              resizeMode: "contain",
            }}
            source={require("circles-mobile/images/close.png")}
          />
        </TouchableHighlight>
        <Text>OrgInventory</Text>
      </View>
    </View>
  </View>
)

export default OrgAddInventory
