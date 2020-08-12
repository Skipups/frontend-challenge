# Database Evaluation Task

Let's design an event registration system! 

This database is not bound to any particular technology (e.g. SQL or NoSQL), and we are looking for clarity in communication, ability to turn abstract concepts into practical steps, and systematic thinking.

## Here are the requirements
- Required fields for each event are: **event title, event date, event location** and **registration cost**. 
- We have registered members (you can access member id, name, email etc.), and only members are allowed to register.
- Event registrations can be cancelled and/or transferred to different events. 
- Members can pay fully or partially at the time of registration.

## Questions
1. As per the above provided requirements, define the minimal database structure which can satisfy the requirements. No queries are required, and what required tables and fields required?

I would use a relational database with the MemberEventRegistration table being the associative table. The relationship of event and member is many to many- a member can register for multiple events and the event has multiple members in attendance. In order to keep track of which event a member is registered for an associative table is needed. 

[Tables](./MemberEvent-Db.png)
 
2. Define what steps required for event registration (i.e. database flow). Suppose you are already logged in and on registration page with option to select event from dropdown list, member information is available globally.

-The user opens the dropdown list
  Db: the EVENT table is queried to retrieve all events
-The user selects an event from dropdown list, and clicks register
  Db: a new instance is created in the MemberEventRegistration table, with the paymentStatus and registrationStatus set to pending. The eventID is associated with the chosen event from dropdown. The memberID is associated with globally available member information
-The user is redirected to a third party site to enter their payment information. Once the transaction is complete, the user is redirected to a success page
  DB: the MemberEventRegistration table is updated by setting the  paymentStatus to paidInFull/paidPartially and the registrationStatus to pending/complete. (We are assuming that registration is not complete until the event has been paid for in full). The amountPaid is updated accordingly
  DB: a new instance is created in the TRANSACTION table. The  amountPaid is updated accordingly

 
3. Describe the database flow for cancellation and/or refund?

-The user visits the profile page where all the events they are registered for are visible. They select the event they wish to cancel. 
  DB: the MemberEventRegistration table is updated by setting  the paymentStatus to refundPending and the registrationStatus pending
-A third party site refunds the payment. Once the refund is complete...
  DB: a new instance is created in the TRANSACTION table. The amountRefunded is updated accordingly. 
  DB: the MemberEventRegistration table updates the paymentsStatus to refundComplete and the resistrationStatus to cancel
-The user is redirected to a success page
