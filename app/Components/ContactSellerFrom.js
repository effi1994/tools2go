
import React from "react";
import { Alert, Keyboard } from "react-native";
import * as Notifications from 'expo-notifications';
import * as Yup from "yup";

import { AppForm, AppFormField, SubmitButton, } from "./forms";
import messagesApi from "../api/messages";
import logger from "../utility/logger";

Notifications.setNotificationHandler({
       handleNotification: async () => ({
              shouldShowAlert: true,
              shouldPlaySound: true,
              shouldSetBadge: true,
       }),
});


function ContactSellerForm({ listing,navigation }) {
       
       const handleSubmit = async ({ message }, { resetForm }) => {
              Keyboard.dismiss();

              const result = await messagesApi.sendMessage(message, listing.product.id);

              if (!result.ok) {
                     logger.log("Error", result);
                     return Alert.alert("Error", "Could not send the message to the seller.");
              }

              resetForm();
              Notifications.scheduleNotificationAsync({
                     content: {
                             title: "Awesome!",
                                   body: "Your message was sent to the seller.",
                     },
                     trigger: null,
              });

              navigation.goBack();




       };

       return (
              <AppForm
                     initialValues={{ message: "" }}
                     onSubmit={handleSubmit}
                     validationSchema={validationSchema}
              >
                     <AppFormField
                            maxLength={255}
                            multiline
                            name="message"
                            numberOfLines={3}
                            placeholder="Message..."
                     />
                     <SubmitButton title="Contact Seller" />
              </AppForm>
       );
}

const validationSchema = Yup.object().shape({
       message: Yup.string().required().min(1).label("Message"),
});

export default ContactSellerForm;