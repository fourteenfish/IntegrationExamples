# FourteenFish-Integration
This repository is intended to give you a great starting point for integrating with our **iframe widget**.

To use the Learning Diary (the name for our CPD recorder) via the widget, the user needs a FourteenFish account. We try and make it nice and easy for them to create their account if they don't already have them.

![What the test page looks like](http://i.imgur.com/BYqqNXy.png)

## article-simple.html
This is the easiest option for you to implement. You put a button in any pages of your website that you want the user to be able to record CPD from. When the user clicks this button, you show an **iframe** with some special parameters:

+ `integrationid`
+ `pagetitle`
+ `pageurl`

You can use **demo** as the `integrationid` for testing, but before too long you should [contact us](https://www.fourteenfish.com/contact) and we will set you up with your own `integrationid`. At the same time we can do things like customise the text on the login widget for you as needed.

The iframe widget uses **postMessage()** to enable it to communicate its desired height to the parent page. This avoids scrollbars on the iframe and improves usability and oerall appearance. The code for handling this is in all of the demo pages and is contained in the **scripts/iframeresize.js** file. You don't have to implement this, but we recommend it.

### Optional parameters
As well as the parameters above, you can optionally pass some of the user's personal details to make it quicker for them to create a FourteenFish account if they don't already have them. Of course this only works if you have user accounts on your website and the user is logged in.

+ `email`
+ `salutation` (eg. Mr, Mrs, Dr)
+ `firstname`
+ `lastname`
+ `county` (eg. Wiltshire)
+ `profession` (eg. Nurse)

## article-callback.html
If putting the user's personal details in the **iframe** src attribute feels messy but you still want to assist the user with account creation, you can just send us your `userid` and we will then use this to perform a serverside callback to get their details.

With the **demo** `integrationid` we just use a dummy callback. You can see the JSON data that we use to mock the response from the callback in the **userdatacallback.json** file. If you want to use this method then we will ask you for your callback URL when we set up your `integrationid`. We'll also give you a secret `key` that you can use to validate requests.

Just to clarify, there is nothing wrong with putting the user's personal details in the **src** of the iframe. This method just feels a little neater 🤓.  