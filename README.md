# About this repository

This repository is intended to give you a great starting point for integrating with our iframe widget.

**Want to jump straight to the action? [Go to the demo >](https://philwilks.github.io/FourteenFish-Integration/article-simple.html)**

To use the Learning Diary (the name for our CPD recorder) via the widget, the user needs a FourteenFish account. We try and make it nice and easy for them to create their account if they don't already have one.

![What the test page looks like](http://i.imgur.com/G1Q78cb.png)

## article-simple.html

[Go to the demo page >](https://philwilks.github.io/FourteenFish-Integration/article-simple.html)

This is the easiest option for you to implement. You put a button in any pages of your website that you want the user to be able to record CPD from. When the user clicks this button, you show an **iframe** with some special parameters:

+ `integrationid`
+ `intent` (**newentry** or **list**)
+ `pagetitle`
+ `pageurl`

You can use **demo** as the `integrationid` for testing, but before too long you should [contact us](https://www.fourteenfish.com/contact) and we will set you up with your own `integrationid`. At the same time we can do things like customise the text on the login widget for you as needed.

The iframe widget uses **postMessage()** to enable it to communicate with the parent page. This includes sending its height, avoiding scrollbars on the iframe and improving usability and oerall appearance. The code for handling this is in all of the demo pages and is contained in the **scripts/message.js** file. You don't have to implement this, but we recommend it. The same script also handles closing the popover once the user has saved their CPD entry.

### Optional parameters

As well as the parameters above, you can optionally pass some of the user's personal details to make it quicker for them to create a FourteenFish account if they don't already have them. Of course this only works if you have user accounts on your website and the user is logged in.

+ `email`
+ `salutation` (eg. Mr, Mrs, Dr)
+ `firstname`
+ `lastname`
+ `county` (eg. Wiltshire)
+ `profession` (eg. Nurse)
+ `userid`

Passing us the **userid** from your database is a good idea as it allows us to record this in our database. If you then decide to move to one of our more complex APIs in future then this will be useful and will save people from linking their accounts again.

## article-callback.html

[Go to the demo page >](https://philwilks.github.io/FourteenFish-Integration/article-callback.html)

If putting the user's personal details in the **iframe** src attribute feels messy but you still want to assist the user with account creation, you can just send us your `userid` and `usercallback` set to **true** and we will then use this to perform a serverside callback to get their details. 

With the **demo** `integrationid` we just use a dummy callback. You can see the JSON data that we use to mock the response from the callback in the **userdatacallback.json** file. If you want to use this method then we will ask you for your callback URL when we set up your `integrationid`. We'll also give you a secret `key` that you can use to validate requests.

Just to clarify, there is nothing wrong with putting the user's personal details in the **src** of the iframe. This method just feels a little neater 🤓.  

## list-simple.html

[Go to the demo page >](https://philwilks.github.io/FourteenFish-Integration/list-simple.html)

This demo contains a single iframe for displaying a list of the user's CPD entries. The code in the **scripts/message.js** file ensures that the iframe is always tall enough to accomodate its content and avoids the iframe having scrollbars.

You could argue that it's strange to show a link to this page to the user before they have recorded any CPD. If you'd like to hide the page initially, let us know and we can send a callback to your server when the user records their first CPD entry along with their **userId** to enable you to show or hide the link to this page.

## list-record.html

[Go to the demo page >](https://philwilks.github.io/FourteenFish-Integration/list-record.html)

This demo contains two iframes, one for listing existing entries and one for recording new entries which is triggered by the link on the right hand side of the page.

When the message **refreshlist** is received then the list of entries is reloaded to display the new entry. This message is sent earlier than the **saved** message to allow the iframe to be reloaded in advance of the popover closing.

## Other pages

[Patient review >](https://philwilks.github.io/FourteenFish-Integration/patientreview.html)