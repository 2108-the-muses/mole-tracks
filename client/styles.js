import {Dimensions,StyleSheet} from 'react-native'

const heightConst = Dimensions.get("screen").height;
const styles = StyleSheet.create({
  container: {
    height: heightConst - 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    fontFamily: "OpenSans",
  },
  image: {
    width: 325,
    height: 325,
    position: "absolute",
    top: 20,
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
    shadowOffset: {width: 0, height: 1},
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
});

export default styles