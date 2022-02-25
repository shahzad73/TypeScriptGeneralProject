import React, { useContext } from 'react';
import AppContext from '../AppContext';

export default function Example() {

    const myContext = useContext(AppContext);

    React.useEffect(() => {

        return () => {

        };

    }, []);
        
    return (    
        <div>
        Use of Hooks and state variable 
        <br /><br />
        <p>You clicked {myContext.count} times</p>
        <button onClick={() => myContext.tickCounter()}>
            Click me
        </button>
        </div>
    );

}



