"use client";

import {Admin, Resource,ListGuesser} from "react-admin"
import simpleRestProvider from "ra-data-simple-rest";

const dataProvider = simpleRestProvider("/api")

const App = () => {
    return ( 
        <Admin dataProvider={dataProvider}>
            <Resource 
            name="courses" 
            list={ListGuesser}
            recordRepresentation="title"
            />
        </Admin>
     );
}
 
export default App;