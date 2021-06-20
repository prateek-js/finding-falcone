var SelectPlanets = React.createClass({
    render: function() {
        return ( < div > < select > {
            this.props.optionData.map(function(planet) {
                return <option key = {
                    planet.name
                }
                value = {
                    planet.distance
                }
                label = {
                    planet.name
                } > {
                    planet.name
                } < /option>        
            })
        } < /select> </div > );
    }
});

var SelectPlanetList = React.createClass({
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: this.succesHandler
        });
    },
    getInitialState: function() {
        return {
            planets: []
        }
    },
    succesHandler: function(data) {
        this.setState({
            planets: data
        })
    },
    render: function() {
        return ( < div className = "container" > < h3 > Planets to Search
            for Falcone < /h3>  <div className ="row"> <div className="col-md-3">< SelectPlanets optionData={this.state.planets} / > < /div> <div className="col-md-3 ">< SelectPlanets  optionData={this.state.planets} / > < /div> <div className="col-md-3">< SelectPlanets optionData={this.state.planets} / > < /div> <div className="col-md-3"> < SelectPlanets optionData={this.state.planets} / > < /div> < /div > < /div > )
        }
});

var Vehicles = React.createClass({
    render: function() {
    	var radioName = this.props.name
        return ( < div > {
                this.props.vehicles.map(function(vehicle) {
                        return <div > < input id = {
                            vehicle.name
                        }
                        name = {radioName}
                        type = "radio"
                        value = {
                            vehicle.name
                        }
                        /> < label > {
                        vehicle.name
                    } - {
                        vehicle.total_no
                    } < /label>  </div >
                })
        } < /div > );
    }
});

var VehiclesRadioGroupList = React.createClass({
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: this.succesHandler
        });
    },
    getInitialState: function() {
        return {
            vehicles: []
        }
    },
    succesHandler: function(data) {
        this.setState({
            vehicles: data
        })
    },
   render: function() {
        return ( < div className = "container" > < h3 > Vehicles to Send < /h3>  <div className ="row"> <div className="col-md-3"><Vehicles vehicles={this.state.vehicles} name ="p1" /> < /div><div className="col-md-3"><Vehicles vehicles={this.state.vehicles} name ="p2"  />< /div><div className="col-md-3"><Vehicles vehicles={this.state.vehicles}  name ="p3" />< /div><div className="col-md-3"><Vehicles vehicles={this.state.vehicles} name ="p4"  />< /div></div > < /div> );
        }
});

var FindFalconeButton = React.createClass({
	render : function(){
		return (<div className="container"><div className="row"> <br/><button type="button" className="center-block btn btn-success">Find Falcone</button></div> </div>)
	}
});

var SelectionDiv = React.createClass({
	render: function() {
	    return ( < div >
	        < SelectPlanetList url = "http://findfalcone.herokuapp.com/planets" / >
	        < VehiclesRadioGroupList url = "http://findfalcone.herokuapp.com/vehicles" / >
	        <FindFalconeButton/>
	        < /div>)
	    }
});

ReactDOM.render( < SelectionDiv / > ,
	document.getElementById('content')
);