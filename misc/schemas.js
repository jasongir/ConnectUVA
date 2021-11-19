import { Timestamp } from "@firebase/firestore";

// here's a schema for our three main data types.
// use this to document when you're creating any new data

/*groups/uid:
{
   name: String,
   type: String, // course | interest | major | classYear
   members: uids[], // array of member uids
   
   lastMessage: String,
   timestamp: firebase time stamp,
}
*/

/*users/uid:
{
   id: String, // automatically generated string from auth
   
   firstName: string,
   lastName: string,
   email: string,

   groups: uids[], // array of group uids
}
*/

/*messages/groupuid/:
{   
   content: String,
   timestamp: firebase Timestamp, 

   userFirstName: String,
   userLastName: String,

}
*/
