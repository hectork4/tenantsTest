import React, {useState, useEffect} from 'react';
import { Service } from './Service';

const TAB_NAVIGATOR = {
  all: 'All',
  paymentDate: 'Payment is late',
  leaseEndDate: 'Lease ends in less than a month'
}

const HEADERS = {
  id: '#',
  name: 'Name',
  paymentStatus: 'Payment Status',
  leaseEndDate: 'Lease End Date',
  action: 'Actions'
}

function App() {

  const now = new Date()
  const minDate = now.toISOString();

  const [formFields, setFormFields] = useState({
    name: '',
    paymentStatus: 'CURRENT',
    leaseEndDate: '',
  })
  const [tabActive, setTabActive] = useState(TAB_NAVIGATOR.all)
  const [data, setData] = useState()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

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

  const handleHeaderClick = (headerId) => {
    const newData = (data.sort(function (a, b) {
      if (a[headerId] > b[headerId]) {
        return 1;
      }
      if (a[headerId] < b[headerId]) {
        return -1;
      }

      return 0;
    }));
    console.log(data, newData)
    setData(newData)
  }

  useEffect(() => {
    setError(false);
    setLoading(true)
    Service.getTenants()
    .then(res => {
      switch (tabActive) {
        case TAB_NAVIGATOR.paymentDate:
          setData(res.filter(eachRes => eachRes.paymentStatus === 'LATE'));
          setLoading(false);
          break;

        case TAB_NAVIGATOR.leaseEndDate:
          const limitDate = new Date(now.setMonth(now.getMonth() + 1)).toISOString();
          setData(res.filter(eachRes => eachRes.leaseEndDate <= limitDate && eachRes.leaseEndDate > minDate));
          setLoading(false);
          break;

        default:
          setData(res)
          setLoading(false)
          break;
      }
    },error => {
      console.error(error)
      setError(true);
    })
  }, [tabActive, error])

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
                {
                  Object.entries(HEADERS).map((header) => 
                    <th name={header[1]} onClick={() => handleHeaderClick(header[0])} key={header[1]}>{header[1]}</th>
                  )
                }
              </tr>
            </thead>
            <tbody>
            {
              loading ? "Loading..." : data.map((eachData) => 
             <tr key={eachData.id}>
                <th>{eachData.id}</th>
                <td>{eachData.name}</td>
                <td>{eachData.paymentStatus}</td>
                <td>{eachData.leaseEndDate}</td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
              )}
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
