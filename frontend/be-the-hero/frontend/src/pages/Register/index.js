import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const history = useHistory();

    async function handleRegister(event) {
        event.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            state
        };

        try {
            const res = await api.post('ongs', data);

            alert(`Your ID: ${res.data.id}`);
            history.push('/'); //voltando para a rota depois de cadastrar
        }catch (err) {
            alert('Registration error, try again.')
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Register</h1>
                    <p>Make your registration, join this platform and help people to find incidents from your ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Logon
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input
                        placeholder="ONG name"
                        value={name}
                        onChange={event => setName(event.target.value)} // event.target.value = valor do input sendo inserido dentro da variavel to estado
                    />
                    <input type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />

                    <input placeholder="Whatspp"
                        value={whatsapp}
                        onChange={event => setWhatsapp(event.target.value)}
                    />

                    <div className="input-group">
                        <input
                            placeholder="City"
                            value={city}
                            onChange={event => setCity(event.target.value)}
                        />

                        <input placeholder="UF"
                            style={{ width: 80 }}
                            value={state}
                            onChange={event => setState(event.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}