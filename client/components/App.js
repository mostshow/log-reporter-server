
import React from 'react'
import NavigationBar from './NavigationBar'


class App extends React.Component {


    render(){
        return (
            <div class="container">
                <NavigationBar />
                {this.props.children}
            </div>
        )

    }
}

export default App;
