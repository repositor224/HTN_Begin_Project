README: Instructions of running the program.
Step 1: Use git clone to clone the repository
Step 2: CD to htn-events/server and input node server.js to start the backend
Step 3: Start Another Terminal
Step 3: CD to htn-events and input ‘npm run dev’ to start the frontend

Q1.
I start by identifying the key functionalities of the program and ensure that the key functionalities could run as expected. This includes registration/login, event page, filtering and event page detail display. After this is completed, I will work on refining some details, such as displaying each individual box of event page with different colour and orientation, filtering using several different methods so that it is effective. In terms of the design, I start with the bare bone (which makes sure the function 100% show up and work), then i set the location and places of each user interface via CSS, and finally I beautify the remaining factors, such as colour and interactivity.
THe tool that I used is React js the front end, and Node.js + Sqlite as backend. Ichoose React.js as i am familiar with the tool, while i use Sqlite because of its simplicity and how itt is easy for local development.

Urgent Update on Dec.8th: The Node.js + Sqlite is later removed because of how Vercel doesn't support Sqlite. Hard code is used

There are several problems that I encounter. Some notable ones are the following:
At the start of the design, the top bar (header bar) of the event would always move down. I solved it by adding a “position: sticky” for layout
When I design the database for the login authentication system, it often had registration because of missing endpoints. I solve it by connecting registerUser function to the backend endpoint /api/register so that it could handle responses properly.
As the file size grow bigger, it gets more difficult to manage and change the individual parts. I change it by dividing it into several documents.                                                                                                                               

Q2.
If I had enough time, there are several things that I want to change: First is increasing the interactivity between users and the platform , in which the user could perform more actions on it instead of  just looking at the information on it. For example, I could integrate it with a registration system so that the user could directly register the event on it. I could also include an “Interested” button, which decides the popularity of the event and hence events with higher popularity would be shown in front of those with lower popularity, which helps user with choosing which event to attend when there are several event at the same time. Also, I want mechanisms which could help user better navigate the event. For example, user could input their interest and the system will generate events that suit them the most based on AI analysis. For another example, it would be export the events to the user’s local calendar, so that user would visualize faster whether an event they want to attend is conflicted with their own schedule. Finally, I wish to include more images for each event, as I believe images help user better understand what each event is compared to the description.

Q3.
IMPORTANT: Because of the context of the program, for the checkbox “event that happens now or future”, the time of “now” is defined as Dec 1st, 2021, 0AM.
