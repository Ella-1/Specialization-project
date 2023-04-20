### E-Commerce Demo Application

#### How To Use

* Download the zip and unzip in destination of your choice.
* Open the destination folder in VSCode and navigate to the terminal or open up the destination folder via your favourite terminal and use the commands:
`npm install`
followed by
`node index.js`
* To start the server, user should navigate to:
`api`
then run `npm start`
* After on a different terminal navigate to client and run `npm run dev`.

### Note: 
The user should make sure they run `npm install` on both directory before running those command.

#### Features Implemented

You can expect to see really basic implementations of what a larger e-commerce platform truly offers like:

* A cart system that allows the addition and subtraction of products returning a subtotal of accrued expense.

* An administrator panel with a basic authentication system complete with a product management system for adding and removing products.

Note: Due to the issue of hosting charges for such a small demo project a few compromises were made in the code to accommodate financial constraints, like the initial and subsequent data you choose to process with this app be stored on your local computer, including the password for the admin panel (in hashed format) as well as the images (as buffers) and product information.

#### Admin Routes

* /signup
* /signin
* /signout

