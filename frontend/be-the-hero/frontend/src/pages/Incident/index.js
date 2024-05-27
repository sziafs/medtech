import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Incident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    async function handleIncident(e) {
        e.preventDefault(); //p/ nao rodar a pagina inteira apos executar o formulario

        const data = {
            title, 
            description,
            value
        };

        try{
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })
            history.push('/profile');
        }catch(err){
            alert('Error while registering new incident, try again.')
        }
    }

    return (
        <div className="incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Register a new incident</h1>
                    <p>Detailed describe your incident to find a hero to solve this.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Profile
                    </Link>
                </section>

                <form onSubmit={handleIncident}>
                    <input
                        placeholder="Incident title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        placeholder="Value in dollar"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}