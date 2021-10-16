import { Dimensions, StyleSheet } from "react-native";

const heightConst = Dimensions.get("screen").height;
const styles = StyleSheet.create({
  /***********************
   All                   *
  ***********************/
  container: {
    // height: heightConst - 50,
    height: heightConst,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  navHeader: {
    fontFamily: "SulphurPoint-Regular",
    fontSize: 30,
    color: "white",
    backgroundColor: "#BA5A31",
  },
  /***********************
   Multiple              *
  ***********************/
  /***********************
   Login/Sign Up         *
  ***********************/
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
