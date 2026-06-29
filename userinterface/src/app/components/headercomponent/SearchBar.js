"use client"

import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
export default function SearchBar() {
  const checkCursor = () => {
    alert('hii')
  }
  return (
    <div style={{ display: 'flex', gap: '9px' }}>



      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px 14px',
        border: '1px solid #e0e0e0',
        borderRadius: '12px', // Large radius from your image
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)', // Soft shadow
        width: '100%',
        maxWidth: '350px',
        backgroundColor: '#fff',
        cursor: "pointer"
      }}>
        <LocationOnIcon onClick={checkCursor} style={{ color: "gray", }} />
        <input
          type="text"
          placeholder="Gwalior Zoo, Gwalior"
          onClick={checkCursor}
          style={{
            border: 'none',
            outline: 'none',
            fontSize: '14px',
            color: '#333',
            flex: 1, // Takes up remaining space
            // fontFamily: 'inherit',
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Oxygen-Sans, Ubuntu, Cantarell, Helvetica, Arial, sans-serif',
            margin: '5px',
            fontWeight: '400px',
            cursor: "pointer", lineHeight: ' 20px', textAlign: "left"

          }}
        />
        <KeyboardArrowDownIcon onClick={checkCursor} style={{
          transform: 'scaleX(1)',
          marginRight: '0px',
          userSelect: 'inherit',
          cursor: 'inherit',
          touchAction: 'inherit',
          transitionDuration: '0s',
          color: 'gray'
        }} />

      </div>
      <div
        style={{

          display: 'flex',
          alignItems: 'center',
          padding: '10px 14px',
          border: '1px solid #e0e0e0',
          borderRadius: '12px', // Large radius from your image

          width: '100%',
          maxWidth: '350px',
          backgroundColor: '#fff',
          cursor: "pointer",
          gap: '5px'

        }}
      >
        <SearchIcon style={{ color: 'gray' }} />

        <input
          type="text"
          placeholder="Search category"
          onClick={checkCursor}
          style={{
            border: 'none',
            outline: 'none',
            fontSize: '15px',
            color: '#333',
            flex: 1, // Takes up remaining space
            fontFamily: 'inherit',
            margin: '5px',
            cursor: "pointer"

          }}
        />

      </div>


    </div>

  )
}