# HeyAstro-App

# Steps to make build for android app.

<!-- Step 1 - Open a terminal or command prompt and navigate to your project’s root folder. And execute command below. It will delete any existing ‘index.android.bundle’ from your android project’s assets directory. If no such file exists then you will get ‘No such file or directory’ message -->

# rm android/app/src/main/assets/index.android.bundle

<!-- Step 2 - Now run below command to generate android bundle file manually. Kindly note below command is a single command. -->

# npm run build or npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

<!-- Step 3 - Now if you will try to build the project you may get ‘Duplicate resources’ errors. Reason behind this is when we run react-native bundle command it generate few drawable folder inside android project’s res ([project_root]/android/app/src/main/res)folder. -->

# To build your project properly delete all drawable folders and raw folder.

<!-- Step 4 - Now from your project’s root folder navigate inside android folder. -->

# cd android

<!-- Step 5 - Now run the below command to generate your release Bundle. -->

# ./gradlew clean && ./gradlew bundleRelease
