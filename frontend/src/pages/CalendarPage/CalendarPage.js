import { InlineWidget } from "react-calendly";
import axios from 'axios';


function CalendarPage() {

  
// Calendly.initInlineWidget({
//     url: 'https://calendly.com/greenwitch',
//     parentElement: document.getElementById('SA'),
//     prefill: {},
//     utm: {}
//    });

    return (
        
        <InlineWidget
  iframeTitle="GreenWitch Scheduling Page"
  pageSettings={{
    backgroundColor: 'ffffff',
    hideEventTypeDetails: false,
    hideGdprBanner: true,
    hideLandingPageDetails: false,
    primaryColor: '00a2ff',
    textColor: '4d5055'
  }}
  prefill={{
    customAnswers: {
      a1: 'type here',
      a10: 'a10',
      a2: 'type here',
      
    },
    date: new Date('2022-05-19T00:11:30.069Z'),
    email: 'test@test.com',
    firstName: 'Jon',
    guests: [
      'janedoe@example.com',
      'johndoe@example.com'
    ],
    lastName: 'Snow',
    name: 'Jon Snow'
  }}
  styles={{
    height: '1000px'
  }}
  url="https://calendly.com/greenwitch"
 
/>
       

        

    )
}
export default CalendarPage;