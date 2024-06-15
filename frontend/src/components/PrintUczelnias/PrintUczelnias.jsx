import { useEffect, useState } from "react";

const SERVER_URL = "http://127.0.0.1:8000";

export function PrintUczelnias() {

    const [uczelnias, setUczelnias] = useState([]);

    useEffect(() => {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        };

        fetch(SERVER_URL + "/api/bestkierunki", requestOptions)
          .then((response) => response.json())
          .then((newNotes) => setUczelnias(newNotes));
    }, []);
    
    return (
        <div style={{padding:"20px"}}>
            <h1>Uczelnias</h1>
            <br />
            <ul>
                {uczelnias.map((kierunek) => ( 
                    <li key={kierunek[0]}>
                        id: {kierunek[0]} <br />
                        nazwa: {kierunek[1]} <br />
                        opis: {kierunek[2]} <br />
                    </li>
                ))}
            </ul>
        </div>
    );
}