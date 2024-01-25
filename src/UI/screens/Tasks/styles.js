// styles.ts
import {StyleSheet} from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  listItemContainer: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.card,
    borderRadius: 10,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.colors.text,
  },
  input: {
    height: 40,
    borderColor: theme.colors.border,
    borderWidth: 1,
    marginVertical: 10,
    padding: 8,
    color: theme.colors.text,
  },
  notificationText: {
    fontSize: 16,
    marginVertical: 10,
    color: theme.colors.text,
  },
  addButton: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  addButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
});
