import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Bio = () => {
    const { id } = useParams(); // Holt die ID aus der URL (z.B. /lokal)
    const [bio, setBio] = useState(null);

    useEffect(() => {
        // Daten von der API abrufen
        fetch(`/api/bio/${id}`)
            .then(response => response.json())
            .then(data => setBio(data))
            .catch(error => console.error('Fehler beim Laden der Bio:', error));
    }, [id]);

    if (!bio) return <div>Loading...</div>; // Ladeanzeige, während Daten geladen werden

    return (
        <div className="bio-container">
            <img src={bio.avatar} alt={bio.name} className="bio-avatar" />
            <h1>{bio.name}</h1>
            <ul className="bio-links">
                {bio.links.map((link, index) => (
                    <li key={index}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                            {link.name}
                        </a>
                    </li>
                ))}
            </ul>
            <footer>
                Made with ❤️ by Lokal
            </footer>
        </div>
    );
};

export default Bio;
