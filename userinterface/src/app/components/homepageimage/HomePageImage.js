"use client";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
// import { serverURL } from "../fetchserver/FetchServer";
import { serverURL } from "../../fetchserver/FetchServer";


function srcset(image, size, rows = 1, cols = 1) {
  const fullPath = `${serverURL}/images/${image}`;
  return {
    src: `${fullPath}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${fullPath}?w=${size * cols}&h=${size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}
export default function HoemPageImage({ data }) {
  return (
    <div style={{ display: 'flex', width: '93%' }}>


      <ImageList
        sx={{
          width: 700,
          height: 660,

          '&::-webkit-scrollbar': {
            display: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          },

        }}

        variant="quilted"
        cols={4}
        rowHeight={125}
      >
        {data.map((item) => (
          <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
            <img
              {...srcset(item.img, 121, item.rows, item.cols)}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>);
}

