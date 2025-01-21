import { LoginButton } from '@telegram-auth/react';
import TelegramLoginButton, { TelegramUser } from 'telegram-login-button'

export default function Home() {
  return (
    <div className="telegram-login-container" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Custom Telegram OAuth Login</h1>
      <TelegramLoginButton
    botName="devforcedbot"
    dataOnauth={(user) => console.log(user)}
  />,
      {/* <LoginButton
      botUsername="devforcedbot"
      onAuthCallback={(data) => {
        console.log(JSON.stringify(data));
        // call your backend here to validate the data and sign in the user
      }}
      buttonSize="large" // "large" | "medium" | "small"
      cornerRadius={5} // 0 - 20
      showAvatar={false} // true | false
      lang="en"
       /> */}
    </div>
  );
}
