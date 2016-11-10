**The workflow to automate**

Check which day or days all friends are available, if none - output this on screen
Get the available movies for that day(s)
Login to the restaurant Web site and get the content
See when the three friends can eat. Think that they want to book a table two hours after the movie starts.
Present the solution(s) in a HTML view
[Optional] - Use the form to book a table through with your application

**Requirements of your solution**

The application should be written as a Node.js application in Javascript
You are free to find and use external modules
Try to make a solution that is as general as possible, for more information about this see "Examination" below.

**vagrant up
**

The examination of the assignment will be done on a by the examinators provided server where some changes has been made. 
This is to test that your code is general for different senarios. The HTML structure will never be changed but there could be changes in:

**href-attributes in HTML: **

To check that your scraper doesn´t use hardcoded URLs. URLs only defined in Javascript-code will not be changed so you can hardcode these.
The day(s) all three friends will be available, if none the application should give the end-user a massage about that
The movie titles, their time and if they are fully booked or not
The availibility of tables at the restaurant and the redirect URL we are getting when we log in.
Goals with this assignment

Get practical experience of building a web scraper
Get knowledge about HTTP and use it when building an application in Node.js
Analyze the traffic between the client and the server
Get practical knowledge of asynchronous programming in Node.js
Analyze and solve a problem with Javascript code
Using Git to show progress in your work