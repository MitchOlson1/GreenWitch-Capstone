import {GoogleLogin} from 'react-google-login'
import axios from 'axios'


function CalendarPage() {

    const responseGoogle = (response) => {
        console.log(response)
        const { code } = response
        axios.post(' http://localhost:4000/api/users/create-tokens', { code })
        .then(response => {
            console.log(response.data)
        })
        .catch(error => console.log)
    }

    
    const responseError = (error) => {
        console.log(error)
    }

    return (
        <div>

        <div className="App">
            <h1>Google Calendar</h1>
        </div>
        <div>
            <GoogleLogin clientId='64833929409-1umo9q3tqup8v2mlg523mhh0i8ukr8mr.apps.googleusercontent.com'
            buttonText='Sign in Authorize Calendar'
            onSuccess={responseGoogle}
            onFailure={responseError}
            cookiePolicy={'single_host_origin'}
            responseType='code'
            accessType='offline'
            scope='openid email profile https://www.googleapis.com/auth/calendar'
            />
        </div>

        </div>

        

    )
}
export default CalendarPage;