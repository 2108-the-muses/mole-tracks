import { Dimensions, StyleSheet, StatusBar } from "react-native";
const brown = "#E59F71";
const pink = "#FF7379";
const heightConst = Dimensions.get("screen").height;
const widthConst = Dimensions.get("screen").width;
const statusHeight = StatusBar.currentHeight;
const logoRatio = (0.9 * widthConst) / 621;
const styles = StyleSheet.create({
  /***********************
   Containers            *
  ***********************/

  containerScroll: {
    height: "100%",
    flex: 1,
    backgroundColor: "white",
  },
  containerCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  containerFlexStart: {
    height: heightConst,
    width: widthConst,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
  containerInfoTags: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  /***********************
   Fonts               *
  ***********************/
  fontExtraSmall: {
    fontFamily: "SulphurPoint-Regular",
    fontSize: 16,
  },
  fontSmall: {
    fontFamily: "SulphurPoint-Regular",
    fontSize: 18,
  },
  fontMedium: {
    fontFamily: "SulphurPoint-Regular",
    fontSize: 20,
  },
  fontLarge: {
    fontFamily: "SulphurPoint-Regular",
    fontSize: 22,
  },
  fontExtraLarge: {
    fontFamily: "SulphurPoint-Regular",
    fontSize: 24,
  },
  /***********************
   Headers               *
  ***********************/
  noMoles: {
    alignSelf: "center",
    position: "absolute",
    top: 200,
    backgroundColor: "rgba(1, 91, 63,.5)",
    height: 50,
    width: 300,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  navHeader: {
    fontFamily: "SulphurPoint-Regular",
    fontSize: 30,
    color: "white",
    backgroundColor: "#BA5A31",
  },
  headerBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 35,
    alignItems: "center",
    backgroundColor: "#E59F71",
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
    },
  },
  headerText: {
    fontFamily: "SulphurPoint-Bold",
    color: "black",
    fontSize: 20,
    padding: 3,
  },
  headerBoxLarge: {
    // width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
    alignItems: "center",
    backgroundColor: "#E59F71",
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
    },
  },
  headerBoxMedium: {
    // width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    alignItems: "center",
    backgroundColor: "#E59F71",
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
    },
  },
  screenTitle: {
    borderRadius: 10,
    width: 115,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  /***********************
   Images                *
  ***********************/
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.5,
  },
  logoSmall: {
    width: 75,
    height: 75,
  },
  bodyMap: {
    width: "100%",
    height: "100%",
  },
  infoTagsImgs: {
    width: 75,
    height: 115,
    marginHorizontal: 10,
  },
  /***********************
   Buttons               *
  ***********************/
  buttonBox: {
    flexDirection: "row",
    width: 260,
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonLarge: {
    borderRadius: 10,
    backgroundColor: "#FF7379",
    width: 115,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      // width: 2,
    },
  },
  buttonLargeText: {
    color: "white",
    textAlign: "center",
    fontFamily: "SulphurPoint-Regular",
    fontSize: 22,
  },
  buttonSmall: {
    borderRadius: 10,
    backgroundColor: "#FF7379",
    width: 100,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
    },
  },
  buttonSmallText: {
    color: "white",
    textAlign: "center",
    fontFamily: "SulphurPoint-Regular",
    fontSize: 18,
  },
  /***********************
   Text Input            *
  ***********************/
  textInputLarge: {
    height: 40,
    width: "100%",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginTop: 15,
    color: "black",
    fontFamily: "SulphurPoint-Regular",
    fontSize: 22,
  },

  textInputNotes: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginTop: 15,
    color: "black",
    fontFamily: "SulphurPoint-Regular",
    fontSize: 22,
  },
  /***********************
   Dropdown Menuts       *
  ***********************/
  // These are "medium" sized dropdowns
  dropdownBtnStyle: {
    width: "100%",
    height: 30,
    alignSelf: "center",
    backgroundColor: "transparent",
  },
  dropdownBtnTxtStyle: {
    textAlign: "center",
    fontFamily: "SulphurPoint-Regular",
    fontSize: 18,
  },
  dropdownDropdownStyle: {
    backgroundColor: "#E59F71",
  },
  dropdownRowStyle: {
    borderBottomColor: "#BA5A31",
    height: 30,
  },
  dropdownRowTxtStyle: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "SulphurPoint-Regular",
    fontSize: 18,
    marginVertical: 6,
  },
  // These are "large" sized dropdowns
  dropdown2BtnStyle: {
    width: "100%",
    height: 50,
    backgroundColor: "#E59F71",
    borderRadius: 15,
    alignSelf: "center",
    marginTop: 20,
  },
  dropdown2BtnTxtStyle: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "SulphurPoint-Bold",
    fontSize: 22,
  },
  dropdown2DropdownStyle: {
    backgroundColor: "#E59F71",
  },
  dropdown2RowStyle: {
    backgroundColor: "#E59F71",
    borderBottomColor: "#BA5A31",
    height: 50,
  },
  dropdown2RowTxtStyle: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "SulphurPoint-Bold",
    fontSize: 22,
    marginVertical: 12,
  },
  /***********************
   Multiples             *
  ***********************/
  polaroidContainer: {
    backgroundColor: "#F8F2ED",
    alignItems: "center",
    justifyContent: "flex-start",
    width: 150,
    height: 150,
    borderColor: "#F3EAD3",
    borderWidth: 1,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
    },
  },
  polaroidLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 11,
    width: "100%",
  },
  polaroidImage: {
    alignItems: "center",
    width: 130,
    height: 110,
    resizeMode: "cover",
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: "black",
    borderColor: "#F3EAD3",
    borderWidth: 1,
  },
  polaroidContainerLarge: {
    backgroundColor: "#F8F2ED",
    alignItems: "center",
    justifyContent: "flex-start",
    width: 300,
    height: 325,
    borderColor: "#F3EAD3",
    borderWidth: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
    },
  },
  polaroidLabelLarge: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 22,
    width: "100%",
  },
  polaroidImageLarge: {
    alignItems: "center",
    width: 260,
    height: 220,
    resizeMode: "cover",
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: "black",
    borderColor: "#F3EAD3",
    borderWidth: 2,
  },
  /***********************
   Login/Sign Up         *
  ***********************/
  logoLarge: {
    width: "90%",
    height: 621 * logoRatio,
    marginVertical: "2%",
  },
  authForm: {
    alignItems: "center",
    width: "80%",
    top: 0.3 * heightConst,
  },
  googleButton: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FF7379",
    backgroundColor: "white",
    width: 260,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    flexDirection: "row",
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
    },
  },
  googleButtonText: {
    color: "black",
    textAlign: "center",
    fontFamily: "SulphurPoint-Regular",
    fontSize: 16,
  },
  googleImage: {
    width: 25,
    height: 25,
    position: "absolute",
    left: 12,
  },
  /***********************
   All Moles             *
  ***********************/
  moleSilhouette: {
    height: 35,
    resizeMode: "contain",
    width: "30%",
  },
  horizontalScroll: {
    padding: 10,
    width: widthConst,
    height: 170,
  },
  /***********************
   Single Mole           *
  ***********************/
  entryBox: {
    width: "100%",
    height: 50,
    borderColor: "#E59F71",
    borderBottomWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  entryText: {
    fontFamily: "SulphurPoint-Regular",
    color: "black",
    fontSize: 18,
  },
  headerInput: {
    fontFamily: "SulphurPoint-Regular",
    color: "black",
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: "white",
    padding: 3,
    paddingBottom: 2,
    width: 160,
  },
  // LABEL is the category label
  labelBox: {
    // borderTopWidth: 1,
    // borderColor: "black",
    alignItems: "flex-start",
    paddingTop: 4,
  },
  labelText: {
    fontFamily: "SulphurPoint-Regular",
    color: "gray",
    fontSize: 14,
  },
  // SELECT is the current categories
  selectBox: {
    width: "100%",
    height: 30,
    fontSize: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  select: {
    fontSize: 18,
    fontFamily: "SulphurPoint-Regular",
  },
  /***********************
   Take Photo            *
  ***********************/
  photoContainer: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    // flex: 1,
  },
  photoTopContainer: {
    // position: "absolute",
    flex: 1,
    flexDirection: "row",
    // top: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    // height: 147,
    backgroundColor: "#E59F71",
    opacity: 0.7,
  },
  photoCaptureDimeAdvice: {
    flex: 1,
    color: "black",
    fontFamily: "SulphurPoint-Regular",
    textAlign: "center",
    fontSize: 25,
  },
  dimeImage: {
    width: 90,
    height: 90,
    opacity: 0.6,
  },
  photoGuide: {
    width: "100%",
    height: 110 * 3,
    borderWidth: 2,
    borderColor: "black",
  },
  photoBottomButtonsContainer: {
    // position: "absolute",
    flex: 1,
    flexDirection: "row",
    // bottom: 0,
    width: "100%",
    // height: 146,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E59F71",
    opacity: 0.7,
    // shadowColor: "#000000",
    // shadowOpacity: 0.3,
    // shadowRadius: 2,
    // shadowOffset: {
    //   height: 2,
    // },
  },
  photoCapture: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 13,
    borderRadius: 10,
    backgroundColor: "#FF7379",
    borderColor: "black",
    borderWidth: 2,
    width: 120,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  photoCaptureText: {
    color: "white",
    textAlign: "center",
    fontFamily: "SulphurPoint-Regular",
    fontSize: 20,
  },

  /***********************
            Tags           
  ***********************/
  moleDot: {
    backgroundColor: brown,
    height: 20,
    width: 20,
    borderRadius: 10,
    position: "absolute",
    zIndex: 1000,
  },
  tagsInAddEntryContainer: {
    padding: 10,
  },
  tagsInAddEntryTitle: {
    fontFamily: "SulphurPoint-Regular",
    fontSize: 18,
  },
  tagsCategoryContainer: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "flex-end",
  },
  tagsInactiveButton: {
    marginHorizontal: 7,
    width: 105,
    backgroundColor: "#FFDEDF",
    alignItems: "center",
    justifyContent: "center",
  },
  tagsSmallButton: {
    marginHorizontal: 7,
    backgroundColor: "#FFDEDF",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "SulphurPoint-Regular",
    fontSize: 18,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
    },
  },
  tagsActiveButton: {
    backgroundColor: "#FF7379",
    width: 105,
    alignItems: "center",
    justifyContent: "center",
  },
  tagText: {
    marginHorizontal: 6,
    marginVertical: 3,
    fontFamily: "SulphurPoint-Regular",
    fontSize: 15,
  },
  moreInfoButton: {
    borderColor: "black",
    borderWidth: 2,
    width: 200,
    paddingHorizontal: 7,
    paddingVertical: 3,
    alignItems: "center",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
    },
  },
});

export default styles;
