import  {useState, useEffect}  from  'react' ;
import Sorting from './Component/Sorting';
import './App.css';


function App() {

const getDataLs = () => {
    const data = localStorage.getItem('employs');
    if(data){
      return JSON.parse(data);
    } else {
      return [];
    }
  }

  
const [employs, setEmploys] = useState(getDataLs());

  // input filds
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [id, setId] = useState();

  // form submit event
  const hendleSubmit = (e) => {
    e.preventDefault();

    const employ = {
      name,
      email,
      phone,
      id
    }
    
    setEmploys([...employs, employ]);
    setName('');
    setEmail('');
    setPhone('');
    setId('');
  }
  
  
  useEffect (() => {
    localStorage.setItem('employs', JSON.stringify(employs));
  }, [employs]);

  // delete employ
  const deleteEmploy = (id) => {
    const newEmploys = employs.filter((employ) => employ.id !== id); 
    setEmploys(newEmploys);
  }

  // edit employ
  const editEmploy = (id) => {
    const newEmploys = employs.filter((employ) => employ.id !== id); 
    const employ = employs.find((employ) => employ.id === id);
    setEmploys(newEmploys);
    setName(employ.name);
    setEmail(employ.email);
    setPhone(employ.phone);
    setId(employ.id);
  }


  return (
    <>
      <h1>Employee Data</h1>
      <div className="Employdata">
        <form className="form" onSubmit={hendleSubmit}>
          <label >Employee Name :</label><br />
          <input for='username' type="text" className ="form-control" id='Ename' placeholder="Enter Employee Name" 
                 required onChange={(e)=>setName(e.target.value)} value={name}></input><br />
          <label>Employee ID :</label><br />
          <input type="text" className ="form-control" placeholder="Enter Employee ID" 
                 required onChange={(e)=>setId(e.target.value)} value={id}></input>
          <div id='emailHelp' className='form-text'>We'll never share your email with anyone else.</div>
          <br />
          <label>Employee Email :</label><br />
          <input type="email" className ="form-control" placeholder="Enter Employee Email" 
                 required onChange={(e)=>setEmail(e.target.value)} value={email}></input><br />
          <label>Employee Phone :</label><br />
          <input type="tel" className ="form-control" placeholder="Enter Employee Phone" 
                 required onChange={(e)=>setPhone(e.target.value)} value={phone}></input><br />
          <div className='bt'>
          <button type="submit" className='btn btn-primary'>submit</button><br /><br/>

          <Sorting employ={employs} setEmploys={setEmploys} /><br/>

          </div>
        </form><br/>
      </div>

        

        <div className='table'>
          {employs.length > 0&&<>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope='col'>Employee Name</th>
                <th scope='col'>Employee ID</th>
                <th scope='col'>Employee Email</th>
                <th scope='col'>Employee Phone</th>
                <th scope='col'>Action</th>
                 
              </tr>
            </thead>  
              <tbody>
                {employs.map((employ) => {
                  return (
                    <tr key={employ.id}>
                      <td>{employ.name}</td>
                      <td>{employ.id}</td>
                      <td>{employ.email}</td>
                      <td>{employ.phone}</td>
                      <td><button className='btn btn-danger' onClick={() => deleteEmploy(employ.id)}>Delete</button> & <button className='btn btn-warning' onClick={() => editEmploy(employ.id)}>Edit</button></td>
                    
                    </tr>
                  )
                })} 
              </tbody>
          </table> 
          </>} 
        </div>
    </>
  );
}

export default App;
