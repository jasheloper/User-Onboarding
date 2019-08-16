import React from 'react';



const UserList = props => {
   
    return (

        <div>

            {props.userList.map(person => {

                return (

                    <div key = {person.id}>
                        
                        <br />


                    <h2>{person.name}</h2>
                    <p>{person.email}</p>

                    <br />
                    <hr />

                    </div>
                )
            })}

        </div>
    )
}

export default UserList; 