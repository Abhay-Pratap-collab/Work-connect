
"use client";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SearchBar from './SearchBar';
import CardandUSer from './CardandUser';
import styles from "./Header.module.css"
export default function Header() {
    return (
        <div>
            <AppBar position='fixed' className={styles.appbar}>
                <Toolbar style={{ height: '84px', }}>
                    <div >

                        <img
                            src='/abc.png'
                            style={{ width: 110, height: 30, marginLeft: '85px', transition: "transform 0.2s ease-in-out", cursor: 'pointer', objectFit: "contain" }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "scale(1.02)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                            }}
                            alt="Logo"
                        />
                    </div>
                    <div className={styles.native}>
                        Native
                    </div>


                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '70%',

                        justifyContent: 'center',
                        maxWidth: '1200px',
                        margin: '0 auto',
                        marginRight: '80px'

                    }}>



                        <div className={styles.searchBarDiv}>
                            <div style={{ width: '100%', maxWidth: '500px' }}> {/* Constrains search width */}
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