import React, { useState } from 'react';
import { View, Button, Platform, TouchableOpacity, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppButton from './Button';
import productActions from '../api/productActions';
import ActivitiyIndicator from './ActivitiyIndicator';
function DateRangePicker({ setStartDate1, setEndDate1, setPrice, setNextStep, productId, price }) {
       // Initialize startDate and endDate with valid Date objects
       const [startDate, setStartDate] = useState(new Date());
       const [endDate, setEndDate] = useState(new Date()); // Initialize with the current date
       const [showPicker, setShowPicker] = useState(false);
       const [pickerType, setPickerType] = useState('start');
       const [enableButton, setEnableButton] = useState(true);
       const [loading, setLoading] = useState(false);
       const [error, setError] = useState(null);

       const onChange = (event, selectedDate) => {
              const currentDate = selectedDate || (pickerType === 'start' ? startDate : endDate);
              setShowPicker(Platform.OS === 'ios');
              if (pickerType === 'start') {
                     setStartDate(currentDate);
              } else {
                     if (checkDateEndIsBigFromStart(currentDate))
                            setEndDate(currentDate);
              }
       };

       const showDatePicker = (type) => {
              setShowPicker(true);
              setPickerType(type);
       };

    
       const checkDateEndIsBigFromStart = (currentDate) => {
              if (startDate > currentDate) {
                     alert('End date must be greater than the start date: ' + startDate + ' - ' + currentDate);
                     setEnableButton(true);
                     return false;
              }
              setEnableButton(false);
              return true;
       };

       const handleSubmit = async () => {
              setLoading(true);
              const result = await productActions.checkIsAvailable(productId,startDate ,endDate);
              setLoading(false);
              console.log(result);
              if (!result.ok) {
                     alert('try different date');
                     return;
              }
              const data = result.data.data;
              console.log(data);
              if(data){
                     setEndDate1(endDate);
                     setStartDate1(startDate);
                     handlePrice();
                     setNextStep(true);

              } else{
                     alert('try different date');
                     return;
              }
       

             

       };

       const handlePrice =  () => {
              let end = new Date(endDate);
              console.log(end,'end');
              let start = new Date(startDate);
              let price1;
              if(end.getMonth() == start.getMonth() && end.getFullYear() == start.getFullYear() && end.getDate() == start.getDate()){
                     price1 = price;
                     setPrice(price1);
                     return;
              }
              
              const diffTime = Math.abs(end - start);
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
               price1 = diffDays * price;
              setPrice(price1);
       };



       return (
              <>
                     <ActivitiyIndicator visible={loading} />
                
                     <View>
                            <View>
                                   <AppButton onPress={() => showDatePicker('start')} title="Select Start Date" />
                                   <Text>{startDate.toDateString()}</Text>
                                   <AppButton onPress={() => showDatePicker('end')} title="Select End Date" />
                                   <Text>{endDate.toDateString()}</Text>
                                   {showPicker && (
                                          <View>
                                                 {Platform.OS === 'ios' ? (
                                                        <View>
                                                               <TouchableOpacity onPress={() => setShowPicker(false)}>
                                                                      <Text>Done</Text>
                                                               </TouchableOpacity>
                                                               <DateTimePicker
                                                                      testID={pickerType === 'start' ? 'startDatePicker' : 'endDatePicker'}
                                                                      value={pickerType === 'start' ? startDate : endDate}
                                                                      mode="date"
                                                                      is24Hour={true}
                                                                      display="spinner"
                                                                      onChange={onChange}
                                                               />
                                                        </View>
                                                 ) : (
                                                        <DateTimePicker
                                                               testID={pickerType === 'start' ? 'startDatePicker' : 'endDatePicker'}
                                                               value={pickerType === 'start' ? startDate : endDate}
                                                               mode="date"
                                                               is24Hour={true}
                                                               display="default"
                                                               onChange={onChange}
                                                        />
                                                 )}
                                          </View>
                                   )}
                            </View>

                            <Button onPress={handleSubmit} disabled={enableButton} title="Check Date Range" />
                     </View>
              </>
       );
}

export default DateRangePicker;
