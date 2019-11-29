# Event quiz API

The following is a description of the Event quiz API which is used by RedWing on behalf of Red Whale to communicate
with FourteenFish once delegates have booked onto a Red Whale event. RedWing will supply basic details about the delegate booking and 
in the response we will provide 2 URLs. Both URLs will enable the delegate to take a knowledge test which will both have the same questions.
The first link is intended to be done (and normally sent out) before the GP Update event and the second one 
is the same questions done after the event. The idea behind two tests is to evidence learning from the GP Update 
event and following the second knowledge test the delegates have the opportunity to capture this result and any reflection 
into a FourteenFish appraisal. 

When setting up the questions on FourteenFish, Red Whale administrators can now set which set of questions
are the current default ones. The link will be to these questions that have been set as the default and this is
normally updated for each tranche of GP Update courses.

There are 4 circumstances that need to be considered by the API and these are detailed below.

## 1) A new booking onto a Red Whale event

This is done using a **POST** request using to following url:

**POST** https://integrations.fourteenfish.com/eventquiz

We will require the following fields supplied in the JSON format.

- key - *your shared key to interact with the FourteenFish API*
- partnerId - *your partner Id to interact with the FourteenFish API, e.g. redwhale*
- firstName - *the delegates first name*
- lastName
- email
- delegateId - *your local ID for the delegate*
- productId - *your local ID for the course booked*
- eventTitle - *for example simply "GP Update Autumn 2019"*
- postCode - *the delegates Post code which Red Whale use to analyse the results*
- job - *the job title for the delegate*
- delegateType - *the type of delegate*

We believe that from previous imports from Red Whale job and delegate type are often the same.

An example post request:
```json
    {
      "key": "xxxxxxxx",
      "partnerId": "redwhale",
      "firstName": "Test",
      "lastName": "Doctor",
      "email": "testdoctor@fourteenfish.com",
      "delegateId": "ghsdiw21223",
      "productId": "sdfdsffsd123",
      "eventTitle": "GP Update Autumn 2019",
      "postCode": "SP5 2AZ",
      "job": "GP Partner",
      "delegateType": "GP"
    }
```
We will then send JSON back in the response with the following fields:

- delegateId -*your local ID returned*
- preCourseLink 
- postCourseLink
- responseMessage - *this will normally be "OK" but if there is an issue this will be detailed here*

An example response:

```json
    {
        "delegateId": "ghsdiw21223",
        "preCourseLink": "https://www.fourteenfish.com/quiz/take/12345?p=ahtyrud",
        "postCourseLink": "https://www.fourteenfish.com/quiz/take/54321?p=tyreueh",
        "responseMessage": "OK"
    }
```

## 2) An email change on an existing booking

This is communicated to us through a **PUT** request with further details below. We will 
update the email details stored on our side which is then used to match the user to a potential
 existing FourteenFish account once the post-event questions have been done. All being well we will 
 return an HTTP response with the status OK (200).
 
 The URL is:
 
 **PUT** https://integrations.fourteenfish.com/eventquiz
 
 The body of the request is as above again in JSON format 
 but only the key, partnerId, email and delegateId are required.
 
 The quiz links will not be returned as they haven't changed.
 
 ## 3) A delegate cancels
 
 This is communicated through a **DELETE** request.
 
 The URL is:
 
 **DELETE** https://integrations.fourteenfish.com/eventquiz
 
 As above the body of the request is again the same in JSON format but this time
 only the key, partnerId and delegateId are required.
 
 The response will be empty with a status of OK (200).
 
 ##4) A delegate is changed entirely but the pre-course email with link has been sent
 
 In this scenario we suggest an initial **DELETE** request using the original delegateId followed by a 
 new **POST** request with the brand new details which will return 2 new links.
 
 
