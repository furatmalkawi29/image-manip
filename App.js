import React, { useState, useEffect } from 'react';
import { Button, View, Image, Platform,StyleSheet } from 'react-native';
import { Asset } from 'expo-asset';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';


export default function App() {
  let width = 500;
  let height= 500;

  const [image, setImage] = useState(null);

  useEffect(() => {
  
     

    (async () => {

      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
        setReady(true);
      }
    })();
  }, []);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.cancelled) {
      setImage(result);
    }
  };


  const flip = async () => {
    const manipResult = await ImageManipulator.manipulateAsync(
      image.localUri || image.uri,
      [ { flip: ImageManipulator.FlipType.Horizontal }],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    );
    setImage(manipResult);
  };

  const flipY = async () => {
    const manipResult = await ImageManipulator.manipulateAsync(
      image.localUri || image.uri,
      [ { flip: ImageManipulator.FlipType.Vertical }],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    );
    setImage(manipResult);
  };

  const rotate = async () => {
    const manipResult = await ImageManipulator.manipulateAsync(
      image.localUri || image.uri,
      [ { rotate: 90 } ],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    );
    setImage(manipResult);
  };

  const resize = async () => {
    let x = width;
    let y = height;
    const manipResult = await ImageManipulator.manipulateAsync(
      image.localUri || image.uri,
      [ { resize: {width: x, height:y}}],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    );
    setImage(manipResult);
  };

  const crop = async () => {
    // const manipResult = await ImageManipulator.manipulateAsync(
    //   image.localUri || image.uri,
    //   [{crop: {
    //     originX: width / 2,
    //     originY: height/2,
    //     width: width,
    //     height: height,
    //  }}],
    //   { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    // );
    // setImage(manipResult);
  };



  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image.uri }} style={{ width: `${width/10}%`, height: `${height/10}%` }} />}
      <Button title="Flip Horizontal" style={styles.button} onPress={flip} />
      <Button title="Flip Vertical" onPress={flipY} />
      <Button title="Crop" onPress={crop} />
      <Button title="Rotate 90" onPress={rotate} />
      <Button title="Reduce Quality" onPress={resize} />
    </View>
  );
}


const styles = StyleSheet.create({
  button :{
    width:20,
    marginTop: 16,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    marginTop: 25,
  },
});