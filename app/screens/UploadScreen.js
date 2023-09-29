import React, { useRef } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import * as Progress from 'react-native-progress';
import LottieView from 'lottie-react-native';
import colors from '../config/colors';

function UploadScreen({ onDone,progress = 0, visible = false }) {
       const animation = useRef(null);

       return (
              <Modal visible={visible}>
                     <View style={styles.container}>
                            {progress < 1 ?
                                   <Progress.Bar color={colors.primary} progress={progress} width={200} />
                                   :
                                   <LottieView
                                          ref={animation}
                                          autoPlay
                                          loop={false}
                                          source={require('../assets/animations/done.json')}
                                          style={styles.animation}
                                          onAnimationFinish={onDone}

                                   />
                            }
                     </View>
              </Modal>

       );
}

const styles = StyleSheet.create({
       container: {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
       },
       animation:{
              width:150,      
       }
});

export default UploadScreen;