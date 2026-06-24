
"use client";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SearchBar from './SearchBar';
import CardandUSer from './CardandUser';

export default function Header() {
    return (
        <div>
            <AppBar position='fixed' style={{ background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.05)', boxShadow: 'none', zIndex: '1100px' }}>
                <Toolbar style={{ height: '84px' }}>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        // background: 'yellow',
                        justifyContent: 'center',
                        maxWidth: '1200px',
                        margin: '0 auto',
                        gap: '20px'
                    }}>
                        <div >

                            <img
                                src='/logo.png'
                                style={{ width: 180, height: 150, marginTop: 10, marginLeft: -75, transition: "transform 0.2s ease-in-out", cursor: 'pointer', objectFit: "contain" }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "scale(1.02)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "scale(1)";
                                }}
                                alt="Logo"
                            />
                        </div>

                        <div style={{
                            color: '#8b8989', fontSize: 15, marginTop: 4, cursor: 'pointer', marginLeft: -20, overflowX: 'auto',
                            overflowY: 'hidden',
                            scrollbarWidth: 'none',
                            transform: 'translateZ(0)',
                        }}>
                            Native
                        </div>

                        <div style={{ flexGrow: 1, display: 'flex', paddingLeft: '94px', justifyContent: 'center', }}>
                            <div style={{ width: '100%', maxWidth: '600px' }}> {/* Constrains search width */}
                                <SearchBar />
                            </div>
                        </div>

                        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                            <CardandUSer />

                        </div>




                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}