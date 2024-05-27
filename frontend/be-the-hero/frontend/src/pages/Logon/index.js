import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'; //feather icons

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try {
            const res = await api.post('sessions', { id });
            console.log(res)

            localStorage.setItem('ongId', id);
            // localStorage.setItem('ongName', res.data.name);
            localStorage.setItem('ongName', res.data);


            history.push('/profile');
        }catch(err){
            alert('Login failed, try again.')
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Do your logon</h1>

                    <input
                        placeholder="Your ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Login</button>

                    {/* Link ao inves de <a> p/ nao recarregar toda a page*/}
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#ef233c" />
                        <p>I don't have an account</p>
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}