import React from "react";

const About = () => {
   const containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px',
    background: '#18181b',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
    textAlign: 'center'
  };

  const socialBtnStyle = {
    display: 'inline-block',
    margin: '10px',
    padding: '10px 20px',
    background: '#27272a',
    color: '#fff',
    borderRadius: '8px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255,255,255,0.1)'
  };

  return (
    <div style={containerStyle}>
      <img
        src="/dp.jpg"
        alt="@thehimalaypuri"
        style={{
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          objectFit: 'cover',
          border: '4px solid #f97316',
          marginBottom: '20px',
          boxShadow: '0 4px 20px rgba(249, 115, 22, 0.4)'
        }}
      />
      <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#fff' }}>About Me</h2>
      <h3 style={{ fontSize: '1.8rem', color: '#f97316', marginBottom: '20px' }}>Himalay Puri (@thehimalaypuri)</h3>

      <p style={{ color: '#a1a1aa', fontSize: '1.2rem', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto 30px auto' }}>
        <strong>Join the community and grow together!</strong> Welcome to my platform where we build, deploy, and scale highly engineered systems.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        <a href="https://thehimalaypuri.com" target="_blank" rel="noreferrer" style={socialBtnStyle}>
          Website
        </a>
        <a
          href="https://www.youtube.com/@himalaypuri"
          target="_blank"
          rel="noreferrer"
          style={{ ...socialBtnStyle, background: 'rgba(239, 68, 68, 0.2)', borderColor: '#ef4444', color: '#ef4444' }}
        >
          YouTube
        </a>
        <a
          href="https://instagram.com/thehimalaypuriofficial"
          target="_blank"
          rel="noreferrer"
          style={{ ...socialBtnStyle, background: 'rgba(236, 72, 153, 0.2)', border: '1px solid #f5005f', color: '#f5005f' }}
        >
          Instagram
        </a>
      </div>
    </div>
  );
};

export default About;