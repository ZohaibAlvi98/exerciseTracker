import React, { Component } from 'react';

export default class CreateExerciseList extends Component {
    
    constructor(props){
        super(props)

        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            username = '',
            description = '',
            date = Date.now(),
            users: []
        }
        

    }

    componentDidMount(){
        this.setState({
            users:['test user'],
            user: 'test user'
        })
    }
    
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        })
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        })
    }
    onChangeDate(date){
        this.setState({
            date: date 
        })
    }
    
    onSubmit(e){
        e.preventDefault()

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            date: this.state.date
        }
        console.log(exercise)

        window.location = '/'
    }
    
    render() {
        return (
            <div>
            <p>hi you are on create exercise list component</p>
            </div>  
    
        )
        
    }
}