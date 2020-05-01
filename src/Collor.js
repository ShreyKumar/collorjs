import React, { Component } from 'react'

const Collor = (Page, apiCalls, { error: ErrorComponent, loading: LoadingComponent, errorsOn = [], logError = () => {} }) => {
    return class extends Component {
        constructor(props) {
            super(props)
            this.state = {
                loading: true,
                error: false,
                data: null
            }
        }

        componentDidMount = async () => {
            try {
                const res = await Promise.all(apiCalls.map(async(apiCall) => {
                    try {
                        const res2 = await apiCall
                        if (res2.status === 200) {
                            return Promise.resolve(res2)
                        }
                    } catch (error) {
                        return Promise.reject(error?.response || error)   
                    }
                }))
                console.log(res)
                this.setState({ loading: false, data: res.length > 1 ? res : res[0] })
            } catch(error) {
                const response = error?.response
                if (response) {
                    // Definitely an Axios request
                    const { status } = error
                    if (errorsOn?.length > 0) {
                        if (errorsOn?.includes(status)) {
                            logError(response)
                            this.setState({ loading: false, error: true, data: response })
                        } else {
                            this.setState({ loading: false, data: response })
                        }
                    } else {
                        logError(response)
                        this.setState({ loading: false, error: true, data: response })
                    }
                } else {
                    logError(response)
                    this.setState({ loading: false, error: true, data: response })
                }
            }
        }

        render(){
            const { loading, error, data } = this.state

            if (error) {
                return <ErrorComponent error={data} />
            }

            if (loading) {
                return <LoadingComponent />
            }

            return <Page data={data} />
        }
    }
}

export default Collor