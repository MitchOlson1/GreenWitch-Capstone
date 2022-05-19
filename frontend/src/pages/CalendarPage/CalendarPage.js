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
      a1: 'a1',
      a10: 'a10',
      a2: 'a2',
      a3: 'a3',
      a4: 'a4',
      a5: 'a5',
      a6: 'a6',
      a7: 'a7',
      a8: 'a8',
      a9: 'a9'
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
  utm={{
    utmCampaign: 'Spring Sale 2019',
    utmContent: 'Shoe and Shirts',
    utmMedium: 'Ad',
    utmSource: 'Facebook',
    utmTerm: 'Spring'
  }}
/>
       

        

    )
}
export default CalendarPage;