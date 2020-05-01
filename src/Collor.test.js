import React from 'react'
import { render } from '@testing-library/react';
import Collor from './Collor';
import App from './App';
import Loading from './Loading';
import Error from './Error'

it('should render the error component with an invalid get url', () => {
    const CollorizedComponent = Collor(<App />, [Axios.get('http://dummy.restapiexample.com/api/v1/employees'), Axios.get('https://jsonplaceholder.typicode.com/todos/1')], { error: Error, loading: Loading })
})

