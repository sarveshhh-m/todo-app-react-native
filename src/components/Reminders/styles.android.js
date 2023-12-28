import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2C3E50',
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      margin: 10,
    },
    heading: {
      fontSize: 30,
      flex: 1,
      color: '#ECF0F1',
    },
    addReminderBtn: {
      backgroundColor: '#3498DB',
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      borderRadius: 5,
    },
    addReminderBtnText: {
      color: '#f8f8f8',
      fontSize: 12,
    },
    scrollViewContent: {
      paddingHorizontal: 10,
      paddingBottom: 20,
    },
    reminderItem: {
      flexDirection: 'row',
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#ddd',
      marginVertical: 5,
      padding: 15,
      backgroundColor: '#fff',
    },
    reminderItemContent: {
      flex: 1,
    },
    reminderTitle: {
      fontSize: 18,
      color: '#333',
    },
    timestamp: {
      color: '#888',
      fontSize: 12,
      marginTop: 5,
    },
    deleteBtn: {
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      marginLeft: 10,
    },
    modalContainer: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalContent: {
      width: '100%',
      height: '95%',
      backgroundColor: '#fff',
      position: 'absolute',
      bottom: 0,
      // borderRadius: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },
    closeBtn: {
      // position: 'absolute',
      // top: 20,
      // right: 20,
      // height: 30,
      // width: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalLabel: {
      fontSize: 14,
      // marginHorizontal: 10,
      color: '#666',
    },
    input: {
      // margin: 10,
      marginVertical:10,
      color: '#333',
      backgroundColor: '#f8f8f8',
      // borderRadius: 10,
      padding: 10,
      fontSize:16
      // marginTop: 5,
    },
    timeDisplay: {
      color: '#3498DB',
      fontSize: 16,
      // marginTop: 10,
    },
    setTimingText: {
      color: '#888',
      fontSize: 16,
      // marginTop: 20,
    },
    addBtn: {
      padding: 10,
      alignItems: 'center',
      borderRadius: 5,
      backgroundColor: '#3498DB',
      marginTop: 10,
      justifyContent: 'center',
    },
    addBtnText: {
      color: '#3498db',
      fontSize: 16,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 10,
    },
  });

  export default styles;