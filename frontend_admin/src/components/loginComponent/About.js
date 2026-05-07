import { Typography } from "@mui/material"
import { useStyles } from "./AboutCss"

export default function About() {


    const classes = useStyles()

    return (
        <div className={classes.content}>

            {/* Head */}
            <div style={{ display: "flex", flexDirection: "column",marginTop:20}}>
                <div className={classes.heading}>
                    <img className={classes.imageStyle} src="/logo.png" alt="logo" />
                    <span className={classes.headingText}>Work Connect</span>
                </div>

                {/* first */}
                <div className={classes.paras}>
                    <span className={classes.icons}>
                        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vclgxx" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="m18.04 7.99-.63-1.4-1.4-.63c-.39-.18-.39-.73 0-.91l1.4-.63.63-1.4c.18-.39.73-.39.91 0l.63 1.4 1.4.63c.39.18.39.73 0 .91l-1.4.63-.63 1.4c-.17.39-.73.39-.91 0m3.24 4.73-.32-.72c-.18-.39-.73-.39-.91 0l-.32.72-.73.32c-.39.18-.39.73 0 .91l.72.32.32.73c.18.39.73.39.91 0l.32-.72.73-.32c.39-.18.39-.73 0-.91zm-5.04 1.65 1.23.93c.4.3.51.86.26 1.3l-1.62 2.8c-.25.44-.79.62-1.25.42l-1.43-.6c-.2.13-.42.26-.64.37l-.19 1.54c-.06.5-.49.88-.99.88H8.38c-.5 0-.93-.38-.99-.88l-.19-1.54c-.22-.11-.43-.23-.64-.37l-1.43.6c-.46.2-1 .02-1.25-.42l-1.62-2.8c-.25-.44-.14-.99.26-1.3l1.23-.93V14c0-.12 0-.25.01-.37l-1.23-.93c-.4-.3-.51-.86-.26-1.3l1.62-2.8c.25-.44.79-.62 1.25-.42l1.43.6c.2-.13.42-.26.64-.37l.19-1.54c.05-.49.48-.87.98-.87h3.23c.5 0 .93.38.99.88l.19 1.54c.22.11.43.23.64.37l1.43-.6c.46-.2 1-.02 1.25.42l1.62 2.8c.25.44.14.99-.26 1.3l-1.23.93c.01.12.01.24.01.37s0 .24-.01.36M13 14c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3"></path></svg>
                    </span>
                    <span>
                        <Typography variant="body1">Adaptable Performance</Typography>
                        <Typography variant="body2" style={{ color: "grey" }}>Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.</Typography>
                    </span>
                </div>

                {/* second */}
                <div className={classes.paras}>
                    <span className={classes.icons}>
                        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vclgxx" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="m20.99 17.99-4.94-4.94-2.12 2.12 4.94 4.94c.59.59 1.54.59 2.12 0s.58-1.54 0-2.12M17.65 10c1.93 0 3.5-1.57 3.5-3.5 0-.58-.16-1.12-.41-1.6l-2.7 2.7-1.49-1.49 2.7-2.7c-.48-.25-1.02-.41-1.6-.41-1.93 0-3.5 1.57-3.5 3.5 0 .41.08.8.21 1.16l-1.85 1.85-1.78-1.78c.39-.39.39-1.02 0-1.41l-.71-.71 2.12-2.12c-1.17-1.17-3.07-1.17-4.24 0L5.08 6.32c-.39.39-.39 1.02 0 1.41l.71.71H3.25c-.19 0-.37.07-.5.21-.28.28-.28.72 0 1l2.54 2.54c.28.28.72.28 1 0 .13-.13.21-.31.21-.5V9.15l.7.7c.39.39 1.02.39 1.41 0l1.78 1.78-6.35 6.35c-.59.59-.59 1.54 0 2.12.59.59 1.54.59 2.12 0L16.48 9.79c.37.13.76.21 1.17.21"></path></svg>
                    </span>
                    <span>
                        <Typography variant="body1">Built To Last</Typography>
                        <Typography variant="body2" style={{ color: "grey" }}>Experience unmatched durability that goes above and beyond with lasting investment.</Typography>
                    </span>
                </div>

                {/* third */}
                <div className={classes.paras}>
                    <span className={classes.icons}>
                        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vclgxx" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M13.12 2.06 7.58 7.6c-.37.37-.58.88-.58 1.41V19c0 1.1.9 2 2 2h9c.8 0 1.52-.48 1.84-1.21l3.26-7.61C23.94 10.2 22.49 8 20.34 8h-5.65l.95-4.58c.1-.5-.05-1.01-.41-1.37-.59-.58-1.53-.58-2.11.01M3 21c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2s-2 .9-2 2v8c0 1.1.9 2 2 2"></path></svg>
                    </span>
                    <span>
                        <Typography>Great User Experience</Typography>
                        <Typography style={{ color: "grey" }}>Integrate our product into your routine with an intuitive and easy-to-use interface.</Typography>
                    </span>
                </div>

                {/* fourth */}
                <div className={classes.paras}>
                    <span className={classes.icons}>
                        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vclgxx" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="m20.45 6 .49-1.06L22 4.45c.39-.18.39-.73 0-.91l-1.06-.49L20.45 2c-.18-.39-.73-.39-.91 0l-.49 1.06-1.05.49c-.39.18-.39.73 0 .91l1.06.49.49 1.05c.17.39.73.39.9 0M8.95 6l.49-1.06 1.06-.49c.39-.18.39-.73 0-.91l-1.06-.48L8.95 2c-.17-.39-.73-.39-.9 0l-.49 1.06-1.06.49c-.39.18-.39.73 0 .91l1.06.49L8.05 6c.17.39.73.39.9 0m10.6 7.5-.49 1.06-1.06.49c-.39.18-.39.73 0 .91l1.06.49.49 1.06c.18.39.73.39.91 0l.49-1.06 1.05-.5c.39-.18.39-.73 0-.91l-1.06-.49-.49-1.06c-.17-.38-.73-.38-.9.01m-1.84-4.38-2.83-2.83a.996.996 0 0 0-1.41 0L2.29 17.46c-.39.39-.39 1.02 0 1.41l2.83 2.83c.39.39 1.02.39 1.41 0L17.7 10.53c.4-.38.4-1.02.01-1.41m-3.5 2.09L12.8 9.8l1.38-1.38 1.41 1.41z"></path></svg>
                    </span>
                    <span>
                        <Typography>Innovative Functionality</Typography>
                        <Typography style={{ color: "grey" }}>Stay ahead with features that set new standards, addressing your evolving needs better than the rest.</Typography>
                    </span>
                </div>
            </div>

        </div>


    )
}