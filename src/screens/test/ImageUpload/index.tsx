import React, { Component, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Constants } from "expo";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import Clipboard from "expo-clipboard";
const ImageUpload = () => {
  const [permissions, askForPermission] = Permissions.usePermissions(
    Permissions.CAMERA,
    {
      ask: true,
    }
  );

  const [state, setState] = useState({
    image: null,
    uploading: false,
  });

  let { image } = state;

  const _maybeRenderUploadingOverlay = () => {
    if (state.uploading) {
      return (
        <View style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      );
    }
  };

  const _maybeRenderImage = () => {
    let { image } = state;

    if (!image) {
      return;
    }

    return (
      <View style={styles.maybeRenderContainer}>
        <View style={styles.maybeRenderImageContainer}>
          <Image source={{ uri: image }} style={styles.maybeRenderImage} />
        </View>

        <Text
          onPress={_copyToClipboard}
          onLongPress={share}
          style={styles.maybeRenderImageText}
        >
          {image}
        </Text>
      </View>
    );
  };

  const share = () => {
    Share.share({
      message: state.image,
      title: "Check out this photo",
      url: state.image,
    });
  };

  const _copyToClipboard = () => {
    Clipboard.setString(state.image);
    alert("Copied image URL to clipboard");
  };

  const _takePhoto = async () => {
    // const { status } = await Camera.requestPermissionsAsync();
    // if (status !== "granted") return;

    const { status: cameraPerm } = await Permissions.askAsync(
      Permissions.CAMERA
    );

    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.MEDIA_LIBRARY
    );

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === "granted" && cameraRollPerm === "granted") {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      _handleImagePicked(pickerResult);
    }
  };

  const _pickImage = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.MEDIA_LIBRARY
    );

    // only if user allows permission to camera roll
    if (cameraRollPerm === "granted") {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      _handleImagePicked(pickerResult);
    }
  };

  const _handleImagePicked = async (pickerResult) => {
    let uploadResponse, uploadResult: any;

    try {
      setState((v) => ({ ...v, uploading: true }));
      console.log(pickerResult.uri);
      if (!pickerResult.cancelled) {
        //TODO : 이미지 선택
        // uploadResponse = await uploadImageAsync(pickerResult.uri);
        // uploadResult = await uploadResponse.json();
        // setState((v) => ({ ...v, image: uploadResult.location }));
        setState((v) => ({ ...v, image: pickerResult.uri }));
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert("Upload failed, sorry :(");
    } finally {
      setState((v) => ({ ...v, uploading: false }));
    }
  };

  async function uploadImageAsync(uri) {
    let apiUrl = "https://file-upload-example-backend-dkhqoilqqn.now.sh/upload";

    // Note:
    // Uncomment this if you want to experiment with local server
    //
    // if (Constants.isDevice) {
    //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
    // } else {
    //   apiUrl = `http://localhost:3000/upload`
    // }

    let uriParts = uri.split(".");
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append("photo", {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    let options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };

    return fetch(apiUrl, options);
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />

      <Text style={styles.exampleText}>Example: Upload ImagePicker result</Text>

      <Button onPress={_pickImage} title="Pick an image from camera roll" />

      <Button onPress={_takePhoto} title="Take a photo" />
      {_maybeRenderImage()}
      {_maybeRenderUploadingOverlay()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  exampleText: {
    fontSize: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    textAlign: "center",
  },
  maybeRenderUploading: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
  },
  maybeRenderContainer: {
    borderRadius: 3,
    elevation: 2,
    marginTop: 30,
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    width: 250,
  },
  maybeRenderImageContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: "hidden",
  },
  maybeRenderImage: {
    height: 250,
    width: 250,
  },
  maybeRenderImageText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default ImageUpload;
