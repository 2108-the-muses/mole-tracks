import { Dimensions, StyleSheet } from "react-native";

const heightConst = Dimensions.get("screen").height;
const widthConst = Dimensions.get("screen").width;
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
    height: heightConst - 50,
    width: widthConst,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  containerFlexStart: {
    height: heightConst,
    width: widthConst,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
  /***********************
   Headers               *
  ***********************/
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
  },
  headerText: {
    fontFamily: "SulphurPoint-Bold",
    color: "black",
    fontSize: 20,
    padding: 3,
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
  /***********************
   Buttons               *
  ***********************/
  buttonLarge: {
    borderRadius: 10,
    backgroundColor: "#FF7379",
    width: 115,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
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
    height: 150,
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
    borderTopWidth: 1,
    borderColor: "black",
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

  // OTHER

  image: {
    width: 325,
    height: 325,
    position: "absolute",
    top: 20,
  },
  entryImage: {
    width: 250,
    height: 200,
    marginTop: 25,
  },
  form: {
    alignItems: "center",
    justifyContent: "flex-end",
    width: "80%",
    height: "100%",
    bottom: 150,
  },
  textInput: {
    height: 40,
    width: 290,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginTop: 15,
    color: "black",
    fontFamily: "SulphurPoint-Regular",
    fontSize: 22,
  },
  buttonBox: {
    flexDirection: "row",
    width: 260,
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    borderRadius: 10,
    backgroundColor: "#FF7379",
    width: 115,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  submitEntryButton: {
    borderRadius: 10,
    backgroundColor: "#FF7379",
    width: 115,
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 25,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "SulphurPoint-Regular",
    fontSize: 22,
  },
  background: {
    width: "100%",
    height: "100%",
    opacity: 0.5,
    position: "absolute",
  },
  imageBox: {
    width: 300,
    height: 275,
    backgroundColor: "#E59F71",
    borderRadius: 15,
    alignItems: "center",
    marginVertical: 25,
  },
  entryimageBox: {
    width: 300,
    height: 250,
    backgroundColor: "#E59F71",
    borderRadius: 15,
    alignItems: "center",
    marginVertical: 25,
  },
  name: {
    fontFamily: "SulphurPoint-Bold",
    color: "black",
    fontSize: 22,
    marginTop: 11,
    alignSelf: "flex-end",
    right: 25,
  },
  notes: {
    fontFamily: "SulphurPoint-Bold",
    color: "black",
    fontSize: 22,
  },
  notesBox: {
    width: 275,
  },
  photoContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  photoTopContainer: {
    backgroundColor: "#E59F71",
    position: "absolute",
    flexDirection: "row",
    top: 28,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.7,
  },
  photoBottomButtonsContainer: {
    position: "absolute",
    flexDirection: "row",
    bottom: 28,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  photoCapture: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 13,
    borderRadius: 10,
    backgroundColor: "#FF7379",
    width: 120,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  photoCaptureText: {
    color: "white",
    textAlign: "center",
    fontFamily: "SulphurPoint-Regular",
    fontSize: 20,
  },
  photoCaptureDimeAdvice: {
    color: "black",
    textAlign: "center",
    fontFamily: "SulphurPoint-Regular",
    fontSize: 25,
  },

  profileContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  profileText: {
    fontFamily: "SulphurPoint-Bold",
    fontSize: 22,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  tinyImage: {
    width: 75,
    height: 75,
    shadowColor: "black",
  },
});

export default styles;
