![eWay-CRM Logo](https://www.eway-crm.com/wp-content/themes/eway/img/logo_new-new.svg)

# React Sample App (Interview Assignment v2)

Hello and welcome to eWay-CRM job interview. We are happy to see you playing around with our code!

## Installation

### Prerequisites

To be able to run this project on your own computer, you will need [NPM & Node.JS](https://www.npmjs.com/get-npm).

**Recommended:**
- Node.js v22.x or later
- npm v10.x or later

### Duplicate and Run Non-Publicly

To install and run this project on your computer, please create a private repository and [duplicate](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/duplicating-a-repository) this repository to it.
Once you have all the sources on your computer, open command line in the directory where the repository was cloned into (the directory where `.gitignore` and `README.md` files are located). Run

```
npm install
```

to initialize the project structure and dependencies. Then run

```
npm run dev
```

A new window or tab of your default browser appears and the url is http://localhost:5173. Inside the browser the React web app is running. Feel free to edit the sources and the page will reload as you save the file.

We wish you a happy coding.

### Tech Stack

This project has been updated to use modern development tools:

- **⚡ Vite** - Lightning-fast build tool with HMR (Hot Module Replacement)
- **⚛️ React 18** - Latest React with concurrent rendering features
- **🎨 Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **📘 TypeScript** - Type-safe JavaScript development
- **🔌 eWay-CRM Connector** - JavaScript library for eWay-CRM API integration

### Available Scripts

- `npm run dev` - Start the Vite development server (default port: 5173)
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally

## Your Goal

The standard goal we want you to accomplish is an app consisting of two parts.

First part is a form where the user types contact's email address. After submitting the form, something like a business card containing the contact's info should appear. The profile picture should be shown as well.

Default emails:

    mroyster@royster.com 
    ealbares@gmail.com
    oliver@hotmail.com
    michael.ostrosky@ostrosky.com
    kati.rulapaugh@hotmail.com

Bussiness card structure from API:

    
    "ItemGUID": "37df209a-7347-4d74-b9d0-206c444c058c",
    "ItemVersion": 5,
    "AdditionalFields": null,
    "CreatedByGUID": "dcd4897d-1ec5-4c8a-9aca-7ae19487151c",
    "FileAs": "Royster, Maryann Eng",
    "ItemChanged": "2023-12-22T19:57:39+01:00",
    "ItemCreated": "2019-01-28T10:10:51+01:00",
    "ModifiedByGUID": "dcd4897d-1ec5-4c8a-9aca-7ae19487151c",
    "OwnerGUID": "dcd4897d-1ec5-4c8a-9aca-7ae19487151c",
    "Relations": null,
    "Server_ItemChanged": null,
    "Server_ItemCreated": null,
    "IsPrivate": false,
    "BusinessAddressCity": "Albany",
    "BusinessAddressCountryEn": "52ec58a3-1cf2-453c-a94d-93769ae99b9a",
    "BusinessAddressPOBox": "",
    "BusinessAddressPostalCode": "12204",
    "BusinessAddressState": "NY",
    "BusinessAddressStreet": "74 S Westgate St",
    "Company": null,
    "Department": "",
    "DoNotSendNewsletter": false,
    "Email1Address": "mroyster@royster.com",
    "Email2Address": "",
    "Email3Address": "",
    "FirstName": "Maryann",
    "HomeAddressCity": "",
    "HomeAddressCountryEn": null,
    "HomeAddressPOBox": "",
    "HomeAddressPostalCode": "",
    "HomeAddressState": "",
    "HomeAddressStreet": "",
    "ICQ": "",
    "ImportanceEn": null,
    "LastActivity": "2019-01-26T00:00:00+01:00",
    "LastName": "Royster",
    "MSN": "",
    "MiddleName": "Eng",
    "NextStep": null,
    "Note": "",
    "OtherAddressCity": "",
    "OtherAddressCountryEn": null,
    "OtherAddressPOBox": "",
    "OtherAddressPostalCode": "",
    "OtherAddressState": "",
    "OtherAddressStreet": "",
    "PrefixEn": null,
    "PrevStateEn": null,
    "ProfilePicture": null,
    "ProfilePictureHeight": 320,
    "ProfilePictureWidth": 320,
    "Skype": "",
    "StateEn": null,
    "SuffixEn": null,
    "TelephoneNumber1": "518-448-8982",
    "TelephoneNumber1Normalized": "5184488982",
    "TelephoneNumber2": null,
    "TelephoneNumber2Normalized": null,
    "TelephoneNumber3": null,
    "TelephoneNumber3Normalized": null,
    "TelephoneNumber4": null,
    "TelephoneNumber4Normalized": null,
    "TelephoneNumber5": null,
    "TelephoneNumber5Normalized": null,
    "TelephoneNumber6": null,
    "TelephoneNumber6Normalized": null,
    "Title": "",
    "TypeEn": null,
    "WebPage": ""


You should also handle the states, where wrong user input is given or no contact is found.

Second part of the app is a list of previously visited contacts. This list must preserve browser window/tab close and reopen. The user should be able to click the contacts they previously visited and open their business card again. Keep in mind, that contact info including the email address might change over time. If so, you should update the data in the preserverd list. Items in the list must not sync among other users or devices.

The [library for communication with eWay-CRM API](https://github.com/eway-crm/js-lib) is already included.

Feel free to update or add new dependencies. Using the latest React features is welcome.

## Commit and Push

Once you have your amazing app, commit and [push](https://help.github.com/en/github/using-git/pushing-commits-to-a-remote-repository) the codes to your repo. Give [rstefko](https://github.com/orgs/eway-crm/people/rstefko) and [havri](https://github.com/orgs/eway-crm/people/havri) permissions to your repository.

Let us know when the final revision is pushed (commit/tag/branch). We are looking forward to see your results.
