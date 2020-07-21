import React, { Component } from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

export default class EditExercise extends Component {
    
    constructor(props){
        super(props)

        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            username: '',
            description: '',
            date: Date.now(),
            users: []
        }
        

    }

    componentDidMount(){
        axios.get('http://localhost:4040/api/user/fetch-exercise'+this.props.match.params.id)
        .then((response)=>{
            this.setState({
                username: response.data.username,
                description: response.data.description,
                duration: response.data.duration,
                date: new Date(response.data.date)
              })   
            })
            .catch(function (error) {
              console.log(error);
            })
        

      axios.get('http://localhost:4040/api/user/get-user').then(response=>{
        console.log(response)
      if(response.data.success == true && response.data.user != null){
        
        this.setState({
          users: response.data.user.map(user => user.username),
         
      })
       }
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
        
        axios.post('http://localhost:4040/api/exercise/update/'+this.props.match.params.id, exercise)
        .then(res=>{
            console.log(res)
        })

        window.location = '/'
    }
    
    render() {
        return (
            <div>
            <h3>Edit New Exercise Log</h3>
            <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
              <div className="form-group"> 
                <label>Description: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    />
              </div>
              
              <div className="form-group">
                <label>Date: </label>
                <div>
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                  />
                </div>
              </div>
      
              <div className="form-group">
                <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
              </div>
            </form>
          </div>
    
        )
        
    }
}