import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#bcbcbc',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeButton: {
    color: 'black', 
    fontWeight: 'bold',
  },
  redX: {
    backgroundColor: 'red',
    color: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 50,
  },
  modalContent: {
    marginTop: 30,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  removeIcon: {
    marginRight: 5, 
  },
  removeButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },

});

export default styles;
