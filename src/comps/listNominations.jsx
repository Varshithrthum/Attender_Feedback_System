import React, { Component } from 'react'
// import EmployeeService from '../services/EmployeeService'
import Modal from 'react-bootstrap/Modal';

class ListNominationComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: []
        }
        this.addNominee = this.addNominee.bind(this);
        this.editNominee = this.editNominee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(id) {
        // EmployeeService.deleteEmployee(id).then(res => {
        //     this.setState({ employees: this.state.employees.filter(employee => employee.id !== id) });
        // });
    }
    viewEmployee(id) {
        // this.props.history.push(`/view-employee/${id}`);
    }
    editNominee(id) {
        // this.props.history.push(`/add-employee/${id}`);
    }


    addNominee() {
        // this.props.history.push('/add-employee/_add');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Nomination of people</h2>
                <h2 className="text-center">People List</h2>
                <div className="row m-3">
                    <button className="btn btn-primary" onClick={this.addNominee}> Add People</button>
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th> First Name</th>
                                <th> Last Name</th>
                                <th> Employee Email Id</th>
                                <th> Age</th>
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td> Mark </td>
                                <td> Smith</td>
                                <td> marksmith@gmail.com</td>
                                <td> 20</td>
                                <td>
                                    <button onClick={() => this.editNominee(1)} className="btn btn-info">Nominate </button>
                                    <button style={{ marginLeft: "10px" }} onClick={() => this.deleteEmployee(1)} className="btn btn-danger">Delete </button>
                                    <button style={{ marginLeft: "10px" }} onClick={() => this.viewEmployee(1)} className="btn btn-info">View Info </button>
                                </td>
                            </tr>

                            <tr >
                                <td> Mark </td>
                                <td> Smith</td>
                                <td> marksmith@gmail.com</td>
                                <td> 20</td>
                                <td>
                                    <button onClick={() => this.editNominee(1)} className="btn btn-info">Nominate </button>
                                    <button style={{ marginLeft: "10px" }} onClick={() => this.deleteEmployee(1)} className="btn btn-danger">Delete </button>
                                    <button style={{ marginLeft: "10px" }} onClick={() => this.viewEmployee(1)} className="btn btn-info">View Info </button>
                                </td>
                            </tr>

                            <tr >
                                <td> Mark </td>
                                <td> Smith</td>
                                <td> marksmith@gmail.com</td>
                                <td> 20</td>
                                <td>
                                    <button onClick={() => this.editNominee(1)} className="btn btn-info">Nominate </button>
                                    <button style={{ marginLeft: "10px" }} onClick={() => this.deleteEmployee(1)} className="btn btn-danger">Delete </button>
                                    <button style={{ marginLeft: "10px" }} onClick={() => this.viewEmployee(1)} className="btn btn-info">View Info </button>
                                </td>
                            </tr>

                            <tr >
                                <td> Mark </td>
                                <td> Smith</td>
                                <td> marksmith@gmail.com</td>
                                <td> 20</td>
                                <td>
                                    <button onClick={() => this.editNominee(1)} className="btn btn-info">Nominate </button>
                                    <button style={{ marginLeft: "10px" }} onClick={() => this.deleteEmployee(1)} className="btn btn-danger">Delete </button>
                                    <button style={{ marginLeft: "10px" }} onClick={() => this.viewEmployee(1)} className="btn btn-info">View Info </button>
                                </td>
                            </tr>
                            <tr >
                                <td> Mark </td>
                                <td> Smith</td>
                                <td> marksmith@gmail.com</td>
                                <td> 20</td>
                                <td>
                                    <button onClick={() => this.editNominee(1)} className="btn btn-info">Nominate </button>
                                    <button style={{ marginLeft: "10px" }} onClick={() => this.deleteEmployee(1)} className="btn btn-danger">Delete </button>
                                    <button style={{ marginLeft: "10px" }} onClick={() => this.viewEmployee(1)} className="btn btn-info">View Info </button>
                                </td>
                            </tr>
                            <tr >
                                <td> Mark </td>
                                <td> Smith</td>
                                <td> marksmith@gmail.com</td>
                                <td> 20</td>
                                <td>
                                    <button onClick={() => this.editNominee(1)} className="btn btn-info">Nominate </button>
                                    <button style={{ marginLeft: "10px" }} onClick={() => this.deleteEmployee(1)} className="btn btn-danger">Delete </button>
                                    <button style={{ marginLeft: "10px" }} onClick={() => this.viewEmployee(1)} className="btn btn-info">View Info </button>
                                </td>
                            </tr>
                            

                            {
                                this.state.employees.map(
                                    employee =>
                                        <tr key={1}>
                                            <td> {1} </td>
                                            <td> {1}</td>
                                            <td> {1}</td>
                                            <td>
                                                <button onClick={() => this.editNominee(1)} className="btn btn-info">Update </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteEmployee(1)} className="btn btn-danger">Delete </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.viewEmployee(1)} className="btn btn-info">View </button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>

                </div>

            </div>
        )
    }
    
}



export default ListNominationComponent
