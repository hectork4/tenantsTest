import React, {useState} from 'react';
import { Service } from './Service';

const TAB_NAVIGATOR = {
  all: 'All',
  paymentDate: 'Payment is late',
  leaseEndDate: 'Lease ends in less than a month'
} 

function App() {

  const [formFields, setFormFields] = useState({
    name: '',
    paymentStatus: 'CURRENT',
    leaseEndDate: '',
  })
  const [tabActive, setTabActive] = useState()

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value
    })
  }

  const handleTabClick = (e, tab) => {
    console.log(e, tab)
    e.preventDefault();
    setTabActive(tab)
  }

  return (
      <>
        <div className="container">
          <h1>Tenants</h1>
          <ul className="nav nav-tabs">
            {Object.values(TAB_NAVIGATOR).map((eachTab) => 
              <li className="nav-item" key={eachTab}>
                <a 
                  className={`nav-link ${eachTab === tabActive ? 'active' : ''}`} 
                  href="#"
                  onClick={(e) => handleTabClick(e, eachTab)}
                >
                  {eachTab}
                </a>
              </li>
            )}
          </ul>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Payment Status</th>
                <th>Lease End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Mark Otto</td>
                <td>CURRENT</td>
                <td>12/31/2020</td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="container">
          <button className="btn btn-secondary">Add Tenant</button>
        </div>
        <div className="container">
          <form>
            <div className="form-group">
              <label>Name</label>
              <input 
                className="form-control" 
                name='name' 
                value={formFields.name} 
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Payment Status</label>
              <select 
                className="form-control" 
                name='paymentStatus' 
                value={formFields.paymentStatus} 
                onChange={handleChange}
              >
                <option>CURRENT</option>
                <option>LATE</option>
              </select>
            </div>
            <div className="form-group">
              <label>Lease End Date</label>
              <input 
                className="form-control" 
                name='leaseEndDate' 
                value={formFields.leaseEndDate} 
                onChange={handleChange}
              />
            </div>
            <button className="btn btn-primary">Save</button>
            <button className="btn">Cancel</button>
          </form>
        </div>
      </>
  );
}

export default App;
