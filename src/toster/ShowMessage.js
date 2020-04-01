import {WSnackBar, WModal} from 'react-native-smart-tip';

const types = {
  ERROR: {
    textColor: '#fff',
    backgroundColor: '#bf0002',
    actionText: null,
    actionTextColor: '#bf0002',
    position: WSnackBar.position.TOP,
  },
  DONE: {
    textColor: '#fff',
    backgroundColor: '#564FF5',
    actionText: null,
    actionTextColor: '#bf0002',
    position: WSnackBar.position.TOP,
  },
};

export default (type, message) => {
  const snackBarOpts = {
    data: message.includes('Variable "$')
      ? 'Error processing request please try again'
      : message,
    position: WSnackBar.position.BOTTOM, // 1.TOP 2.CENTER 3.BOTTOM
    duration: WSnackBar.duration.LONG, //1.SHORT 2.LONG 3.INDEFINITE
    ...types[type],
    actionClick: () => {
      // Click Action
    },
  };
  WSnackBar.show(snackBarOpts);
};

export const type = {
  ERROR: 'ERROR',
  DONE: 'DONE',
};
