import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  FlatList,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomInput from '../../custom-comp/CustomInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  createTable,
  getData,
  setData,
  deleteRecord,
  updateRecord,
  dropTable,
} from '../../db/tasksTX';

const Tasks = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<0 | 1 | 2 | 3>(0);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [editTask, setEditTask] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<boolean>(false);
  useEffect(() => {
    createTable();
  }, []);
  useEffect(() => {
    getData((fetchedData: any[]) => setTableData(fetchedData));
  }, [tableData]);
  const onAddPress = async () => {
    setData(taskName, priority, description);
    setAddTaskModal(false);
    setDescription('');
    setPriority(0);
    setTaskName('');
    setEditTask(null);
  };
  const onEditPress = (task: any) => {
    setEditTask(task);
    setTaskName(task.name);
    setPriority(task.priority);
    setDescription(task.description);
    setAddTaskModal(true);
  };
  const onUpdatePress = async () => {
    if (editTask) {
      updateRecord(editTask.id, {name: taskName, priority, description});
      setEditTask(null);
      getData((fetchedData: any[]) => setTableData(fetchedData));
      setAddTaskModal(false);
    }
  };

  const removeItem = (id: any) => {
    deleteRecord(id);
  };
  const onClearAll = () => {
    tableData.forEach(item => {
      deleteRecord(item.id);
    });
  };

  const renderItem = ({item}: {item: any}) => (
    <View
      key={item.id}
      style={[
        styles.itemView,
        {
          backgroundColor: expandedItemId === item.id ? '#34495E' : '#2C3E50',
        },
      ]}>
      <TouchableOpacity
        onPress={() => {
          setDeleteId(item.id);
          setTimeout(() => {
            removeItem(item.id);
          }, 500);
        }}
        style={{
          borderWidth: 1,
          height: 25,
          width: 25,
          borderRadius: 15,
          borderColor: 'white',
          marginRight: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {deleteId === item.id && (
          <AntDesign size={20} name="checkcircle" color={'white'} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemContent}
        onPress={() => setExpandedItemId(item.id)}>
        <View style={{flex: 1}}>
          <Text style={styles.taskName}>{item.name}</Text>
          {expandedItemId === item.id && (
            <Text style={styles.description}>{item.description}</Text>
          )}
        </View>
      </TouchableOpacity>

      {expandedItemId === item.id && (
        <View style={styles.expandedButtons}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              {backgroundColor: 'red'},
              styles.editButton,
            ]}
            onPress={() => onEditPress(item)}>
            <MaterialIcons name="edit" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.headingText}>Task List</Text>
      <Text onPress={onClearAll} style={styles.clearAll}>
        Clear All
      </Text>
      <FlatList
        data={tableData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />

      <Modal visible={addTaskModal} transparent={true} animationType="fade">
        <SafeAreaView style={styles.modalStyles}>
          <View style={styles.modalFormContainer}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => {
                setAddTaskModal(false);
                setTaskName('');
                setEditTask(null);
              }}>
              <MaterialIcons name="close" size={24} color="#ECF0F1" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>
              {editTask ? 'Edit Task' : 'Add New Task'}
            </Text>

            <Text style={styles.label}>Task Name</Text>
            <CustomInput
            placeholderTextColor='grey'
              value={taskName}
              onChangeText={(val: any) => setTaskName(val)}
              placeholder="Task Name"
              tiStyles={styles.inputTextDark}
            />

            <Text style={styles.label}>Priority</Text>
            <Dropdown
            placeholderStyle={{color:"grey" }}
              data={[
                {label: 'Low', value: 1},
                {label: 'Medium', value: 2},
                {label: 'High', value: 3},
              ]}
              mode="modal"
              placeholder="Choose Priority"
              onChange={(val: any) => setPriority(val.value)}
              labelField="label"
              valueField="value"
              value={priority}
              maxHeight={200}
              style={styles.dropdownContainer}
              selectedTextStyle={styles.dropdownText}
              itemTextStyle={styles.dropdownText}
            />

            <Text style={styles.label}>Description</Text>
            <CustomInput
            placeholder='Add Description'
            placeholderTextColor='grey'
              multiline={true}
              value={description}
              onChangeText={(val: any) => setDescription(val)}
              tiStyles={[styles.descriptionInput, styles.inputTextDark]}
            />
            <View style={styles.modalBtnContainer}>

              <TouchableOpacity
                style={[styles.addTaskBtn, {backgroundColor: 'grey'}]}
                onPress={() => {
                  setAddTaskModal(false);
                  setEditTask(null);
                  setTaskName('');
                  setPriority(0);
                  setDescription('');
                }}>
                <Text style={styles.addTaskBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addTaskBtn}
                onPress={editTask ? onUpdatePress : onAddPress}>
                <Text style={styles.addTaskBtnText}>
                  {editTask ? 'Update' : 'Add'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setAddTaskModal(true)}>
        <Text style={styles.addBtnText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalStyles: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalFormContainer: {
    width: '100%',
    position:"absolute",
    bottom:0,
    backgroundColor: '#ECF0F1',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalTitle: {
    fontSize: 24,
    color: '#3498DB',
    marginBottom: 10,
    textAlign: 'center',
  },
  label: {
    color: '#2C3E50',
    fontSize: 16,
    marginTop: 10,
  },
  dropdownContainer: {
    marginTop: 5,
    borderWidth:1,
    padding:5,
    borderRadius:5
  },
  dropdownText: {
    color: '#2C3E50',
  },
  descriptionInput: {
    // height: 100,
    justifyContent:"flex-start",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#34495E',
    marginTop: 5,
    padding: 10,
    color: '#2C3E50',
  },
  modalBtnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  addTaskBtn: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498DB',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addTaskBtnText: {
    fontSize: 18,
    color: '#ECF0F1',
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#2C3E50', // Dark background color
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headingText: {
    fontSize: 40,
    alignSelf: 'center',
    color: '#ECF0F1',
    marginBottom: 10,
  },
  addBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 60,
    width: 60,
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498DB',
  },
  flatList: {
    marginTop: 10,
    flex: 1,
  },
  addBtnText: {
    color: 'white',
    fontSize: 30,
  },
  itemView: {
    flexDirection: 'row',
    alignItems:"center",
    justifyContent:"center",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#455A64',
    shadowOpacity: 0.4,
    elevation: 5,
    shadowRadius: 2,
    shadowOffset: {width: 3, height: 3},
    backgroundColor: '#34495E', // Dark background color for list items
  },
  itemContent: {
    flex: 1,
  },
  expandedButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#E74C3C',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  clearAll: {
    fontSize: 18,
    // width:100,
    alignSelf:"flex-start",
    textDecorationLine: 'underline',
    marginBottom: 10,
    padding: 5,
    color: '#3498DB', // Accent color for the dark theme
  },
  taskName: {
    fontSize: 18,
    width: '100%',
    color: '#ECF0F1',
  },
  inputTextDark: {
    justifyContent: 'flex-start',
    color: '#000',
  },
  description: {
    color: '#DCE0E1',
    marginTop: 5,
  },
});

export default Tasks;