import React, { useState } from 'react';
import Swal from 'sweetalert2';

const SubscribeAlert = () => {
  const [userName, setUserName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSubscribe = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Subscribe to Our Newsletter",
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="User Name">
        <input id="swal-input2" class="swal2-input" placeholder="Mobile Number">
      `,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value
        ];
      }
    });

    if (formValues) {
      setUserName(formValues[0]);
      setMobileNumber(formValues[1]);

      // Perform subscription logic here
      // You can send the data to your server or handle it as needed

      // For this example, we will just show a native alert
      Swal.fire({
        title: "Thank you for subscribing!",
        text: `User Name: ${formValues[0]}, Mobile Number: ${formValues[1]}`,
        icon: 'success'
      });
    }
  };

  return (
    <div>
      <h2>Subscribe to Our Newsletter</h2>
      <button onClick={handleSubscribe}>Subscribe</button>
    </div>
  );
};

export default SubscribeAlert;
