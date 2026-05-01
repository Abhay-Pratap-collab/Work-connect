import Button from '@mui/material/Button';
export default function SecondComponent() {
    return (
        <div style={{ marginLeft: '10px', display: 'flex' }}>



            <div class="classdiv">
                <img
                    src="firstback.png"
                />
                <img style={{
                    width: '250px', position: 'absolute',
                    right: '5%',
                    top: '15%',
                    zIndex: 10,
                    height: '250px'

                }}
                    src='doll.png'
                />

                {/* Text  */}
                <div style={{
                    position: "absolute",
                    left: '5%',
                    top: '30%',
                    // background: "#0bb259",
                    display: 'flex',
                    width: '50%',
                    zIndex: 11,
                    flexDirection: 'column',
                    gap: '15px',
                    // cursor: 'pointer' // Comment removed, property active
                }}>
                    <div
                        style={{
                            // position: "absolute",
                            color: "#f2f2f2",
                            fontWeight: 700,
                            fontSize: "1.75rem",
                            lineHeight: 1.5,
                            //   textTransform: "uppercase",
                            // zIndex: 10,

                            // left: '5%',
                            // top: '50%'

                        }}
                    >
                        Welcome back 👋
                        Jaydon Frankie

                    </div>
                    <div
                        style={{
                            // position: "absolute",
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontWeight: 700,
                            fontSize: "1.1rem",
                            lineHeight: 1.5,
                            //   textTransform: "uppercase",
                            // zIndex: 10,

                            // left: '5%',
                            // top: '60%'

                        }}
                    >
                        If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything.

                    </div>
                    {/* <Button>
                        <span style={{
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'center',
                            fontWeight: '700px', // Fixed typo: '700px' is invalid for fontWeight
                            fontSize: '0.75rem',
                            textTransform: 'unset'
                        }}>
                            Go now
                        </span>
                    </Button> */}
                    <div style={{
                        background: "#0bb259",
                        width: 'fit-content',
                        borderRadius: '8px',
                        cursor: 'pointer'
                    }}>
                        <Button style={{ textTransform: 'none', padding: '6px 16px' }}>
                            <span style={{
                                color: 'white',
                                fontWeight: 700, // Fixed: removed 'px'
                                fontSize: '0.875rem',
                            }}>
                                Go now
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>

    )
};