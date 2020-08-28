import React from 'react'

export default function CellBgSvg() {
  return (
    <svg width='156' height='156' xmlnsXlink='http://www.w3.org/1999/xlink'>
      <defs>
        <pattern
          id='c'
          width='8'
          height='8'
          x='-8'
          y='-8'
          patternUnits='userSpaceOnUse'
        >
          <use xlinkHref='#a' transform='scale(.25)' />
        </pattern>
        <image
          id='a'
          width='32'
          height='32'
          xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGN5fIAKQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACPTkDJAAAA00lEQVRYCcXXuw2DMBCA4YCQR8gQYQsaD+zKDSxBlsgIdpM7S4mCwsOPeyBZovv+s6vrnHOrMWay1r5uQp/3/h5CmIEbBw08xrgA/oDz7ISGTszv5Ijj8GIBezg+u0jAEY7Xwh5whrMHXOGsATk4W0AuzhJQgpMHlOKkATU4WUAtThLQgjcHtOJNARR4dQAVXhVAiRcHUONFARx4dgAXnhXAiV8GcOOnARL4YYAUvhsgif8FSOObAA38G6CFpwBNHAP6z5YK/2lXk96Se4BHLRyHfwMvZiCRO/E6zQAAAABJRU5ErkJggg=='
        />
        <rect id='b' x='0' y='0' width='156' height='156' rx='6' />
      </defs>
      <g fill='none' fillRule='evenodd' fillOpacity='.5'>
        <use fill='#FAFAFC' xlinkHref='#b' />
        <use
          fill='url(#c)'
          className='mix-blend-mode:multiply'
          xlinkHref='#b'
        />
      </g>
    </svg>
  )
}
