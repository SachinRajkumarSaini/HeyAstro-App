import React from 'react';
import { View, Modal, Image, TouchableOpacity, Dimensions } from 'react-native';
import style from './styles';
import { get as _get } from 'lodash';
import BottomSheet from 'reanimated-bottom-sheet';
import VideoPlayer from 'react-native-video-controls';

const cross = require('./resources/clear.png');

class CometChatVideoViewer extends React.Component {
  constructor(props) {
    super(props);
    this.sheetRef = React.createRef(null);
  }

  render() {
    return (
      <Modal
        transparent
        animated
        onRequestClose={this.props.close}
        animationType="fade"
        visible={this.props.open}>
        <View style={style.outerContainer}>
          <BottomSheet
            ref={this.sheetRef}
            snapPoints={[Dimensions.get('window').height - 80, 0]}
            borderRadius={30}
            initialSnap={0}
            enabledInnerScrolling={false}
            enabledContentTapInteraction={false}
            overdragResistanceFactor={10}
            renderContent={() => {
              return (
                <View style={style.bottomSheetContainer}>
                  <TouchableOpacity
                    style={style.crossImgContainer}
                    onPress={this.props.close}>
                    <Image
                      source={cross}
                      style={style.crossImg}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <View style={style.outerImageContainer}>
                    <View style={[style.mainContainer]}>
                      <VideoPlayer
                        source={{
                          uri: this.props.message.data.url,
                        }} // Can be a URL or a local file.
                        navigator={this.props.navigator}
                        style={style.messageVideo}
                        disableBack
                        disableVolume
                        paused
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                </View>
              );
            }}
            onCloseEnd={() => {
              this.props.close();
            }}
          />
        </View>
      </Modal>
    );
  }
}
export default CometChatVideoViewer;
