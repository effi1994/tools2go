import client from './client';

const endpoint = '/creditCard';

const getCredits = () => client.get(endpoint + '/get-creditCard');
const addCredit = (creditCard) =>{
       // creditCard.expiryDate to do from 1020 to 10/20
       let newExpiryDate;
       let expiryDate = creditCard.expiryDate;
       if(!expiryDate.includes('/')){
       let month = expiryDate.substring(0,2);
       let year = expiryDate.substring(2,4);
        newExpiryDate = month + '/' + year;
       }else{
              newExpiryDate = expiryDate;
       }



     
       let newCreditCard = {
              cardNumber:creditCard.numberCard.toString(),
              expiryDate:newExpiryDate,
              cvv:Number(creditCard.cvc),
              personId:Number(creditCard.personId),
              userId:0,
              id:0
       }
     

     return   client.post(endpoint + '/add-creditCard',{newCreditCard:newCreditCard});

}
const deleteCredit = () => client.post(endpoint + '/delete-creditCard');


export default {
       getCredits,
       addCredit,
       deleteCredit
};


