import { StyleSheet } from 'react-native';
import { widthRatio, heightRatio } from '../../../utils/consts';

export default StyleSheet.create({
  conversationWrapperStyle: {
    height: '100%',
    backgroundColor: 'white',
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conversationHeaderStyle: {
    paddingBottom: 32,
    position: 'relative',
    paddingHorizontal: 22 * widthRatio,
  },
  contactHeaderCloseStyle: {
    height: 24,
    width: '33%',
  },
  contactSearchInputStyle: {
    flex: 1,
    paddingVertical: 4 * heightRatio,
    marginHorizontal: 8 * widthRatio,
    fontSize: 15,
  },
  contactMsgStyle: {
    overflow: 'hidden',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactMsgTxtStyle: {
    margin: 0,
    height: 30 * heightRatio,
    fontSize: 24,
    fontWeight: '600',
  },
  itemSeperatorStyle: {
    borderBottomWidth: 1,
    width: '85%',
    alignSelf: 'flex-end',
    paddingHorizontal: 12 * widthRatio,
  },
  flexGrow1: { flexGrow: 1 },
  deleteText: { color: '#fff' },
});
