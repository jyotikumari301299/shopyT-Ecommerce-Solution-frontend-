// import React from 'react';
// import { API } from '../../backend';


// const ImageHelper = ({product}) =>{
//     const imageurl = product ? `${API}/product/photo/${product._id}` : `https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500`;
//     return (
//         <div className="rounded border border-success p-2">
//         <img
//           src={imageurl}
//           alt="tshirt Display"
//           style={{ maxHeight: "100%", maxWidth: "100%" }}
//           className="mb-3 rounded"
//         />
//       </div>
//     )
// };

import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageurl = product
    ? `${API}/product/photo/${product._id}`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageurl}
        alt="tshirt display"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default ImageHelper;
