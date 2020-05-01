import React from 'react'
import Axios from 'axios'
import Collor from './Collor'
import './App.css'
import Error from './Error'
import Loading from './Loading'

function App(props) {
    return (
        <div className="App">
            <h1>This is my cool site!</h1>
            <h2>Data from first api call:</h2>
            <code>{JSON.stringify(props.data[0])}</code>
        
            <h2>Data from second api call:</h2>
            <code>{JSON.stringify(props.data[1])}</code>
        </div>
    )
}

export default Collor(App, [Axios.get('http://dummy.restapiexample.com/api/v1/employees'), Axios.get('https://jsonplaceholder.typicode.com/todos/1')], { error: Error, loading: Loading });
