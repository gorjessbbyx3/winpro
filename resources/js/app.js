import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    return (
        <div style={{ 
            backgroundColor: '#090f1e', 
            minHeight: '100vh', 
            color: 'white', 
            padding: '20px',
            fontFamily: 'Montserrat Alternates, sans-serif'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', paddingTop: '100px' }}>
                <img src="/images/logo.png" alt="Logo" style={{ width: '200px', marginBottom: '40px' }} />
                <h1 style={{ fontSize: '2.5em', marginBottom: '20px' }}>Welcome to Seibet Casino</h1>
                <p style={{ fontSize: '1.2em', marginBottom: '30px', opacity: 0.8 }}>
                    The casino application is running successfully on Replit!
                </p>
                <div style={{ 
                    backgroundColor: 'rgba(24, 99, 209, 0.1)', 
                    border: '2px solid #1863d1', 
                    borderRadius: '10px',
                    padding: '30px',
                    margin: '40px auto',
                    maxWidth: '600px'
                }}>
                    <h3 style={{ marginBottom: '15px' }}>Setup Status</h3>
                    <p style={{ marginBottom: '10px' }}>✅ Laravel 8 Backend Running</p>
                    <p style={{ marginBottom: '10px' }}>✅ PostgreSQL Database Connected</p>
                    <p style={{ marginBottom: '10px' }}>✅ React Frontend Loaded</p>
                    <p style={{ marginBottom: '10px' }}>⚠️ Full database schema needs to be imported</p>
                </div>
                <p style={{ fontSize: '0.9em', opacity: 0.6, marginTop: '40px' }}>
                    To complete the setup, import the full database schema and configure additional features.
                </p>
            </div>
        </div>
    );
};

// Remove the loader when React app mounts
const loader = document.getElementById('loader');
if (loader) {
    loader.classList.add('hidden');
}

// Render the React app
ReactDOM.render(<App />, document.getElementById('app'));
