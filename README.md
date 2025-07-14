Online store JS application
Demo online storefront application assignment.
Create a 3-page web application.
 
1. Page 1 (Store item list):
 Create a JSON object with a 20 store items – generate the items on startup.
 Show a html grid for all 20 store items, with one line per item.
 Each item must show generic picture, name, short description, suggested price, actual price and
percentage discount from suggested price
 It should be possible to sort grid by store item name alphabetically. Ascending and Descending
 It should be possible to sort grid by store item price. Low to High and reversed
 We should be able to filter grid by substring of the name. As the user starts typing only the items
that contain the typed text in the item’s name will be shown
 There should be a Buy button in each row. When user clicks on Buy button, Page 2 (see below)
should be presented. 
  
2. Page 2 (Check out form):
 Check out form should show a form collecting billing information: Full Name, Address, email,
phone number, Credit card number.
 Every form item should have some sort of verification for correctness.
Full Name - should only contain letters A-Z and a-z
E-mail – should have a valid email syntax (or at least something that resembles it)
Phone Number – should 10 digit long in a format xxx-xxx-xxxx
Credit card should be 19 digits long and contain only numbers
 It should also contain the summary of the item customer selected on the previous page.
 There should be a Submit order button at the bottom of the page.
 When user clicks on that button Page 3 should be displayed.

3. Page 3 (Order confirmation page):
 Summary of the order – item description should be presented with the order number and the
amount charged to the credit card.