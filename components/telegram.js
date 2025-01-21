'use client'
import { useEffect } from 'react';

const TelegramWidget = () => {
  useEffect(() => {
    // Load the Telegram script only on the client side
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    script.setAttribute('data-telegram-login', 'devforced'); // Replace with your Telegram bot username
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-userpic', 'false');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    document.getElementById('telegram-login').appendChild(script);
    
    document.body.appendChild(script);

    // Cleanup on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []); // Empty dependency array means this effect runs only once, like componentDidMount

  // Define the function that gets called on authentication
  console.log("window..")
  if (typeof window !== 'undefined') {
    window.onTelegramAuth = (user) => {
      alert(
        'Logged in as ' +
          user.first_name +
          ' ' +
          user.last_name +
          ' (' +
          user.id +
          (user.username ? ', @' + user.username : '') +
          ')'
      );
    };
  }
  

  return <div id="telegram-login"></div>;
};

export default TelegramWidget;
