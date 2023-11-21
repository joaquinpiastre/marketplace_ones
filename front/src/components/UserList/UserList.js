import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const UserList = () => {

  const [users, setUsers] = useState([]);


  useEffect(() => {
      fetchUser();
    }, []);

    
  const fetchUser = async () => {
      try {
          const response = await axios.get('http://localhost:5000/users');
          console.log(response)
          setUsers(response.data);
      } catch (error) {
          console.error(error);
      }
  };
  
  return (
      <div>
          <div className='row'>
              <div className='col-md-6'>
                  <table className="table">
                      <thead>
                          <tr>
                              <th scope="col">email</th>
                              <th scope="col">role</th>

                          </tr>
                      </thead>
                      <tbody>
                          {
                              users.map(person => (
                                  <tr key={person.id}>
                                      <td>{person.email}</td>
                                      <td>{person.role}</td>
                                  </tr>
                              ))
                          }  
                                              
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
  )
}