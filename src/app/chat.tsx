"use client";
import React from 'react';
import { useEffect, useRef, useState } from "react";
import './background.css'

interface Option {
  id: string;
  text: string;
}

interface Message {
  role: 'user' | 'system';
  content: string;
  options?: Option[];
}

const Chat = () => {
  const chatContainer = useRef<HTMLDivElement | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [userDetails, setUserDetails] = useState<{ gameId: string, phoneNumber: string }>({ gameId: '', phoneNumber: '' });
  const [isUserDetailsCollected, setIsUserDetailsCollected] = useState<boolean>(false);

  // const initialMessage: Message = {
  //   role: 'system',
  //   content: 'Please enter your Game ID and phone number to proceed (format: GameID,PhoneNumber)'
  // };
  useEffect(() => {
    if (chatContainer.current) {
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    }
  }, [messages]);

  const initialMessage: Message = {
    role: 'system',
    content: `
    Welcome to GOLDSBET! Our AI bot will respond to your concern, so please click on your concern the answer will all be given to you. Thank you!<br><br>
    We encourage you to join our Telegram Public Discussions Group and Channel for the latest updates! Click these links to join:<br>
    <a href="https://t.me/Goldsbet_VIP" target="_blank" style="text-decoration: underline; color: blue;">https://t.me/Goldsbet_VIP</a><br>
    <a href="https://t.me/+Z4mYeHQsJUg0OWNl" target="_blank" style="text-decoration: underline; color: blue;">https://t.me/+Z4mYeHQsJUg0OWNl</a>
  `, options: [
      { id: 'option1', text: 'General Questions - samanya sawal' },
      { id: 'option2', text: 'New Player - nae khilaadee' },
      { id: 'option3', text: 'Recharge Problem - recharge ki samasya' },
      { id: 'option4', text: 'Game issue - khel ank' },
      { id: 'option5', text: 'Withdraw Problem - samasaya vapas len' },
      { id: 'option6', text: 'Birthday Bonus' },
      { id: 'option7', text: 'Wagering' },
      { id: 'option8', text: 'Frozen Account' },
      { id: 'option9', text: 'How to become an Agent' },
      { id: 'option10', text: 'Bind Bankcard' },
      { id: 'option11', text: 'Bind UPI' },
    ]
  };

  const handleModalSubmit = () => {
    if (userDetails.gameId && userDetails.phoneNumber) {
      setIsModalOpen(false);
      setMessages((prevMessages) => [...prevMessages, initialMessage]);
    } else {
      // Handle invalid input
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'system', content: 'Please enter both Game ID and Phone Number.' }
      ]);
    }
  };


  const handleDetailsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [event.target.name]: event.target.value
    }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.trim() === '') return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    if (!isUserDetailsCollected) {
      const [gameId, phoneNumber] = input.split(',');
      if (gameId && phoneNumber) {
        setUserDetails({ gameId: gameId.trim(), phoneNumber: phoneNumber.trim() });
        setIsUserDetailsCollected(true);
        setMessages((prevMessages) => [...prevMessages, initialMessage]);
      } else {
        setMessages((prevMessages) => [...prevMessages, {
          role: 'system',
          content: `
          <p>For More Information Kindly Visit Our Website <a href="https://goldsbet.com" target="_blank" style="text-decoration: underline; color: blue;">GOLDSBET.COM</a></p>
          <p>For More Inquiries Please Send us Email On <a href="mailto:Goldsbetvip@gmail.com" style="text-decoration: underline; color: blue;">Goldsbetvip@gmail.com</a></p>
        `
        }]);
      }
    } else {
      // for handling main menu options
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const botResponse: Message = {
          role: 'system',
          content: `You said: ${input}. Here are some options:`,
          options: [
            { id: 'option1', text: 'Tell me more' },
            { id: 'option2', text: 'Go back' },
          ]
        };

        setMessages((prevMessages) => [...prevMessages, botResponse]);
      } catch (error) {
        console.error('Error communicating with ChatGPT:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'system', content: 'Failed to get a response. Please try again.' }
        ]);
      } finally {
        setLoading(false);
      }
    }
  };


  const handleOptionClick = async (optionText: string) => {
    const userMessage: Message = { role: 'user', content: optionText };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setLoading(true);

    try {
      let botResponse: Message;

      switch (optionText) {
        case 'General Questions - samanya sawal':
          botResponse = {
            role: 'system',
            content: 'Here are some general questions:',
            options: [
              { id: 'option1', text: 'How long does a withdrawal take?' },
              { id: 'option2', text: 'How long does it take to recharge?' },
              { id: 'option3', text: 'How to log in to the game after registration?' },
              { id: 'option4', text: 'How to make a withdrawal?' },
              { id: 'option5', text: 'How to play?' },
              { id: 'option6', text: 'How to Recharge?' },
              { id: 'option7', text: 'How to Register to the game?' },
              { id: 'option8', text: 'Is my money safe?' },
              { id: 'option9', text: 'Is my money secure during the withdrawal process?' },
              { id: 'option10', text: 'What if I need talk to a real customer care or human?' },
              { id: 'option11', text: 'What to do if you forget your password?' },
              { id: 'option12', text: 'Why do I need to provide my ID and recharge information for withdrawal?' },
            ]
          };
          break;

        case 'New Player - nae khilaadee':
          botResponse = {
            role: 'system',
            content: 'Having problems being a new player in the game application? Let me help you!\n\nKya hamare game application me naya khiladi ban ne me aapko samasya aaa rhi hai? Mujhe aapki madad krne de',
            options: [
              { id: 'option1', text: 'How to play game? - Game kaise khelen?' },
              { id: 'option2', text: 'Help me bind my bank account - Mere bank khaate ko Game se Jodne mein meree sahaayata karen.' },
              { id: 'option3', text: 'Help me bind my UPI account - Meri UPI Ko Game Account se Jodney Me Meri Sahatya karen' },
              { id: 'option4', text: 'Forgot Password - Password bhool gaye' },
            ]
          };
          break;

        case 'Recharge Problem - recharge ki samasya':
          botResponse = {
            role: 'system',
            content: 'Do you have problems with your recharge? I am happy to help you with that!\n\nKya aapke recharge me koi samasya aarhi hai? Mujhe isme aapki madad krne me bhot khushi hogi!',
            options: [
              { id: 'option1', text: 'How to recharge? - Recharge kaise kre?' },
              { id: 'option2', text: 'My recharge has not come yet, please check - Mera recharge abhee tak nahi aya hai, kripya kr check kr len' },
            ]
          };
          break;


        case 'Withdraw Problem - samasaya vapas len':
          botResponse = {
            role: 'system',
            content: 'Do you have problems with your WITHDRAW? I am happy to help you with that!\n\nKya aapke withdraw me koi samasya aarhi hai? Mujhe isme aapki madad krne me bhot khushi hogi!',
            options: [
              { id: 'option1', text: 'How to withdraw?' },
              { id: 'option2', text: 'Why is my withdraw on REVIEWING status?' },
              { id: 'option3', text: 'Why is my withdraw processing? How long should I wait?' },
              { id: 'option4', text: 'Why my withdraw returned on game account?' },
              { id: 'option5', text: 'Why should I provide my ID?' },
              { id: 'option6', text: 'I am trying to withdraw, why am I getting WAGERS?' },
              { id: 'option7', text: 'Withdraw Not Received After Success?' },
            ]
          };
          break;

        case 'Game issue - khel ank':
          botResponse = {
            role: 'system',
            content: 'Sir do you have any game issues? I am happy to help!\n\nKya aapko game me koi samasya aa rahi hai? Main madad karne ke liye yahan hoon!',
            options: [
              { id: 'option1', text: 'I am playing the game and it suddenly closed' },
              { id: 'option2', text: 'Cannot enter game room' },
              { id: 'option3', text: 'I lost the game please give refund' },
              { id: 'option4', text: 'Do you have any tips or tricks to win this game?' },
            ]
          };
          break;

        case 'Bind Bankcard':
          botResponse = {
            role: 'system',
            content: `<p>If you have deposited already, you can add <strong>5 Bankcards</strong> and <strong>3 UPI</strong>. We will help you bind your <strong>BANK account</strong>. Please provide bank card information in this format. Please type in <strong>CAPITAL LETTERS</strong>. Thank you!</p>

            <p><strong>Account number:</strong></p>
            <p><strong>IFSC:</strong></p>
            <p><strong>BANK NAME:</strong></p>
            <p><strong>Name:</strong></p>

            <p>Kindly send a screenshot of your Bank account/ Passbook that shows the details that you have provided. Thank you.</p>

            <p>Send us On Email <a href="mailto:goldsbetvip@gmail.com" class="text-blue-500 underline">goldsbetvip@gmail.com</a></p>
            `, options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Bind UPI':
          botResponse = {
            role: 'system',
            content: `<p>If you have deposited already you can add <strong>5 Bankcards</strong> and <strong>3 UPI</strong>. We will help you bind your UPI. Please provide UPI information in this format. Please type in <strong>CAPITAL LETTERS</strong>. Thank you!</p>
            <p><strong>UPI:</strong></p>
            <p><strong>Name On UPI:</strong></p>
            <p>Kindly send a screenshot of your Bank account/Passbook that shows the details that you have provided. Thank you.</p>
            <p>Send us On Email <a href="mailto:Goldsbetvip@gmail.com" class="text-blue-500 underline"><strong>Goldsbetvip@gmail.com</strong></a></p>
            `, options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break

        case 'Birthday Bonus':
          botResponse = {
            role: 'system',
            content: `
          <div class="formatted-text">
            <strong>Goldsbet Delight To Celebrate your Birthday!</strong><br>
            Kindly for claiming your Birthday bonus, you need to send us the following details on our email:<br><br>
            - <strong>Game ID</strong><br>
            - <strong>Aadhaar Card</strong><br><br>
            <strong>Our Email:</strong> <a href="mailto:Goldsbetvip@gmail.com" class="text-blue-500 underline">Goldsbetvip@gmail.com</a>
          </div>
              `,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Wagering':
          botResponse = {
            role: 'system',
            content: `
            <div class="formatted-text">
              <strong>Wagering</strong><br>
              Apologies, you need to complete the wager set by the system before you can withdraw. Thank you for your cooperation.
            </div>
            `,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Frozen Account':
          botResponse = {
            role: 'system',
            content: `
          <div class="formatted-text">
            <strong>Frozen Account</strong><br>
            Players who open multiple or fraudulent accounts will be disqualified from the game. The remaining amount may be forfeited and the account will be frozen.
            For the solution you have to register new account on GOLDSBET.COM & make you must make your account valid and donot use any multiple accounts in future
          </div>
              `,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'How to become an Agent':
          botResponse = {
            role: 'system',
            content: `
          <div class="formatted-text">
            <strong>How to become an Agent</strong><br>
            To become agent share your referral links  with your friends & family members to get more commission bonuses & agent salaries 
            kindly check refer & Earn section in offer Tab For more details of your subordinates kindly check agent tab in lobby
            <img src="/howtobecomeagent.jpg" alt="Game Instructions" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
              `,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;


        // Recharge Problem Options Responses start here
        case 'How to recharge? - Recharge kaise kre?':
          botResponse = {
            role: 'system',
            content: 'To top up, simply tap on "Deposit," select your desired amount and preferred payment method. Following that, fulfill the KYC requirements by providing the necessary information. Please ensure that you finalize your payment processing before you exit. Much appreciated.',
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };

          break;

        case 'My recharge has not come yet, please check - Mera recharge abhee tak nahi aya hai, kripya kr check kr len':
          botResponse = {
            role: 'system',
            content: 'Please send us a screenshot of your PAYMENT RECEIPT with the exact date and time with amount and UTR number or reference number on our email on <a href="mailto:Goldsbetvip@gmail.com" class="text-blue-500 underline">Goldsbetvip@gmail.com</a>. Thank you. Humen apni Reciept bejhen Jis Pr samay aur Tareekh Dono Ho. Apni Receipt Humen iss Email Par Send Karen.',
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        // General Options Responses start here
        case 'How long does a withdrawal take?':
          botResponse = {
            role: 'system',
            content: "Usually, the withdraw is immediately (5 To 45minutes). But sometimes, it will be at most up to 24-72 hours due to the bank delay, but you can track your withdrawal with our Customer Support for further help.",
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'How long does it take to recharge?':
          botResponse = {
            role: 'system',
            content: "Usually the recharge credit to your game account immediately (5-10min), but sometimes due to the delay of bank, we cannot receive your payment to your game account immediately, but you can track your payment with our Customer Support for further help.",
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'How to log in to the game after registration?':
          botResponse = {
            role: 'system',
            content: "Log On is only for registered players. Click Log on button. Enter your registered mobile number and the password you have set.",
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'How to make a withdrawal?':
          botResponse = {
            role: 'system',
            content: "Click Withdraw on your game lobby, if you are a new player you need to bind you Bank account first after binding enter your desire amount to withdraw, then click Withdraw button.",
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'How to play?':
          botResponse = {
            role: 'system',
            content: "For better understanding of the game, please read the rules and instructions of the game. The rules are inside every game. Thank you.",
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'How to Recharge?':
          botResponse = {
            role: 'system',
            content: "Open your game account, at the game lobby page click Deposit. Select your desire amount of recharge then you may now proceed by clicking Add Cash. Select your desire method of payment and click Next step then it will automatically direct you with the payment merchant page",
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'How to Register to the game?':
          botResponse = {
            role: 'system',
            content: "For new players please click On Register. Then proceed to Fill out the information with your mobile phone number and set your own desire password. Click OTP (One Time Pin) then you will receive code through text. After you received the code click Confirm to completely registered. Welcome and enjoy the game!",
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Is my money safe?':
          botResponse = {
            role: 'system',
            content: "Our Game application make use of highly advanced security features to ensure the safekeeping of financial and personal data gathered from players. We make sure that we keep up with data protection legislation and that their slots and other games get audited by external security companies.",
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Is my money secure during the withdrawal process?':
          botResponse = {
            role: 'system',
            content: "Yes. Please don't worry about your money because we assure you that it is secured during the process.",
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'What if I need talk to a real customer care or human?':
          botResponse = {
            role: 'system',
            content: "Just message to the AI that you need talk to a real customer care or human, then wait patiently for the connection.",
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'What to do if you forget your password?':
          botResponse = {
            role: 'system',
            content: "Click Forget password button to set again a new password. Fill out the asked information and then Click OTP (One Time Pin) then you will receive code through text. After you received the code click OK to completely change your new password. It can be seen on Log on.",
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Why do I need to provide my ID and recharge information for withdrawal?':
          botResponse = {
            role: 'system',
            content: "This is for the safety of our players. Our company is making sure that we will send the withdrawal money to the correct person. Please don't worry, because all player information is secured.",
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Learn more':
          botResponse = {
            role: 'system',
            content: `
            <p>For More Information Kindly Visit Our Website <a href="https://goldsbet.com" target="_blank" style="text-decoration: underline; color: blue;">GOLDSBET.COM</a></p>
            <p>For More Inquiries Please Send us Email On <a href="mailto:Goldsbetvip@gmail.com" style="text-decoration: underline; color: blue;">Goldsbetvip@gmail.com</a></p>
          `,
            options: [
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Go back to main menu':
          botResponse = initialMessage;
          break;
        // New Player Options Responses start here

        case 'How to play game? - Game kaise khelen?':
          botResponse = {
            role: 'system',
            content: `For better understanding of the game, please read the rules and instructions of the game. The rules are inside every game. You can find it.Thank you.

            khel ko behatar dhang se samajhane ke lie krpaya khel ke niyam aur nirdesh padhen. niyam har khel ke andar hote hain. aap ise skreen ke ooparee daen kone mein heere par pa sakate hain. dhanyavaad.

            <img src="/howtoplaygame.jpg" alt="Game Instructions" style={{ maxWidth: '100%', height: 'auto' }} />`,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Help me bind my bank account - Mere bank khaate ko Game se Jodne mein meree sahaayata karen.':
          botResponse = {
            role: 'system',
            content: `
          We will help you bind your BANK account. Please provide bank card information in this format. Please type in CAPITAL LETTERS. Thank you!<br><br>
          
          Account number:<br>
          IFSC:<br>
          BANK NAME:<br>
          Name:<br><br>
          
          Kindly send a screenshot of your Bank account/Passbook that shows the details that you have provided to <a href="mailto:Goldsbetvip@gmail.com" class="text-blue-500 underline">Goldsbetvip@gmail.com</a>
. Thank you.
              `,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;


        case 'Help me bind my UPI account - Meri UPI Ko Game Account se Jodney Me Meri Sahatya karen':
          botResponse = {
            role: 'system',
            content: `
            <div class="formatted-text">
              We will help you to change your UPI Information. But first, you need to fill out this for our reference. (CAPITAL LETTERS ONLY)<br>
              UPI Name:<br>
              UPI Mobile Number:<br>
              UPI ID:<br><br>
              Kindly send a screenshot of your Bank account/Passbook that shows the details that you have provided. Thank you.
            </div>`,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Forgot Password - Password bhool gaye':
          botResponse = {
            role: 'system',
            content: `
            <div class="formatted-text">
              Click "Forget Password". Enter your phone number and new password. After that, you will receive an SMS with OTP or verification code for you to reset the password of the game account.<br>
              "Forget Password" par Click karen. Apna phone number aur naya password darj karen. Uske baad, aapko game account ka password reset karne ke liye OTP ya verification code ke saath ek SMS prapt hoga. Taaki aap apne surakshit banke se apna paisa nikaal saken. Dhanyavaad.
            </div>`,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        // Withdraw Problem Options Responses start here

        case 'How to withdraw?':
          botResponse = {
            role: 'system',
            content: `
            <div class="formatted-text">
              <strong>How to withdraw?</strong><br>
              Click Withdraw on your game lobby, if you are a new player you need to bind your Bank account first after binding enter your desired amount to withdraw, then click Withdraw button.
              <img src="/howtowithdraw.jpg" alt="Game Instructions" style={{ maxWidth: '100%', height: 'auto' }} />
              </div>`,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Why is my withdraw on REVIEWING status?':
          botResponse = {
            role: 'system',
            content: `
            <div class="formatted-text">
              <strong>Why is my withdraw on REVIEWING status?</strong><br>
              Sir upon checking your withdrawal is still being reviewed, please wait patiently because we are assuring you that the game runs fair and square for all our players.
            </div>`,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Why is my withdraw processing? How long should I wait?':
          botResponse = {
            role: 'system',
            content: `
            <div class="formatted-text">
              <strong>Why is my withdraw PROCESSING?</strong><br>
              After reviewing our records, we can see that your withdrawal is currently being processed. Kindly exercise patience while waiting. Typically, withdrawals are processed promptly (within 5-10 minutes). However, there might be occasions where it could take up to a maximum of 24-72 hours due to potential delays from the bank. If the issue persists beyond the 24-72 hour waiting period, please mail us the precise withdrawal order number and attach a screenshot on <a href="mailto:Goldsbetvip@gmail.com" class="text-blue-500 underline">Goldsbetvip@gmail.com</a>
. Thank you!
            </div>`,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Withdraw Not Received After Success?':
          botResponse = {
            role: 'system',
            content: `
          <div class="formatted-text">
            We can see that your withdrawal is successful. Please wait patiently as typically, withdrawals are processed promptly (within 5-10 minutes). However, there might be issues due to the bank, and it could take 3 to 5 business days. If the issue persists beyond this waiting period, please email us at <a href="mailto:Goldsbetvip@gmail.com">Goldsbetvip@gmail.com</a>.<br><br>
            <strong>Required Documents:</strong><br>
            - Game Account<br>
            - Withdrawal Screenshot<br>
            - Withdrawal Amount<br>
            - Bank Statement in PDF Format with Password<br><br>
            Thank you!
          </div>
              `,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Why my withdraw returned on game account?':
          botResponse = {
            role: 'system',
            content: `
            <div class="formatted-text">
              <strong>Why my withdraw returned on game account?</strong><br>
              The primary causes include issues related to bank failure, exceeding withdrawal limits, and providing incorrect bank information. For a more precise understanding of the reasons, please consider attaching a screenshot of your withdrawal page. This will enable our human customer support team to provide you with an accurate response. We appreciate your cooperation.
            </div>`,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Why should I provide my ID?':
          botResponse = {
            role: 'system',
            content: `
            <div class="formatted-text">
              <strong>Why should I provide my ID?</strong><br>
              Collecting your personal information and verifying your ID is crucial in the verification process for various reasons. It ensures identity verification, prevents fraud, complies with legal regulations, enhances security, verifies age, and promotes responsible gaming. Overall, these measures maintain platform security, legality, and integrity while safeguarding both you as the player and the platform.
            </div>`,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'I am trying to withdraw, why am I getting WAGERS?':
          botResponse = {
            role: 'system',
            content: `
            <div class="formatted-text">
              <strong>I am trying to withdraw, why am I getting WAGERS?</strong><br>
              Please be aware that our platform operates on a Technology Running System, and thus, game control is beyond our scope. However, if you adhere to game rules and maintain sufficient bets, you can avoid any issues related to wagering. Once you enter the game room, events occur independently of our influence. Rest assured, fairness in game outcomes is guaranteed for all players. Thank you.
            </div>`,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        // Game issue Options Responses start here

        case 'I am playing the game and it suddenly closed':
          botResponse = {
            role: 'system',
            content: 'To achieve improved outcomes, kindly begin by restarting your Game app and ensuring a reliable and stable internet connection. Following this, we recommend waiting for a minimum of 15 minutes before attempting to log in once more. Your cooperation is appreciated. Thank you!\n\nIf problem still persist,\nKindly try to do this. Go to your mobile phone settings>Manager App>Search the game application>Clear data cache then restart again your game account and try again. Thank you!',
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Cannot enter game room':
          botResponse = {
            role: 'system',
            content: 'Regrettably, the game room you are attempting to access is currently at maximum capacity with players. Kindly consider retrying your entry after a duration of 1 hour or explore an alternative game room. We appreciate your understanding. Thank you.'
            , options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'I lost the game please give refund':
          botResponse = {
            role: 'system',
            content: 'Experiencing losses is a natural element of the game – there are moments of both winning and losing. Maintain your betting activity, for I am optimistic that fortune will smile upon you on this occasion.\n\nHowever, sir, you can still earn bonuses by inviting your friends to download and participate in our game.',
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Do you have any tips or tricks to win this game?':
          botResponse = {
            role: 'system',
            content: 'To win, you must be familiarized yourself in the game and take it seriously whenever you are playing. We also advised that you play in other gameroom because you never know where your luck will take you. If you want to continue having fun and playing, please recharge more and reach a high VIP level to receive a greater daily bonus',
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Go back to main menu':
          botResponse = initialMessage;
          break;

        default:
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));

          botResponse = {
            role: 'system',
            content: `You selected: ${optionText}. Here's more information:`,
            options: [
              { id: 'option1', text: 'Learn more' },
              { id: 'option2', text: 'Go back to main menu' },
            ]
          };
          break;
      }

      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error('Error processing option:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  const renderMessages = () => {
    return messages.map((message, index) => (
      <div
        key={index}
        className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
        ref={index === messages.length - 1 ? lastMessageRef : null}
      >
        <div
          className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-700 text-white' : 'bg-blue-100 text-black'}`}
          dangerouslySetInnerHTML={{ __html: message.content }}
        />
        {message.options && (
          <div className="mt-2">
            {message.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.text)}
                className="mr-2 mb-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {option.text}
              </button>
            ))}
          </div>
        )}
      </div>
    ));
  };


  return (
    <div ref={chatContainer}>
      <div className="bg-blue-800 text-white p-4 flex items-center gap-4">
        <img
          src="data:image/jpeg;base64,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"
          alt="chatbotlogo"
          className="h-12 w-12 rounded-full"
        />
        <div>
          <h1 className="text-xl font-bold">Goldsbet</h1>
          <p className="text-sm text-gray-300">Ask anything</p>
        </div>
      </div>
      <div className="h-full flex flex-col">
        {isModalOpen && (
          <div className="animation-popup modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-lg font-bold mb-4 text-blue-400">
                Please enter your details to proceed
              </h2>
              <input
                type="number"
                name="gameId"
                placeholder="Game ID"
                value={userDetails.gameId}
                onChange={handleDetailsChange}
                className="block w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <input
                type="number"
                name="phoneNumber"
                placeholder="Phone Number"
                value={userDetails.phoneNumber}
                onChange={handleDetailsChange}
                className="block w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <button
                onClick={handleModalSubmit}
                className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-200 w-full"
              >
                Submit
              </button>
            </div>
          </div>
        )}

        <div className="flex-grow flex flex-col">
          <div className="flex-grow overflow-y-auto p-4">
            {renderMessages()}
            {loading && <div className="text-center text-gray-500">Thinking...</div>}
          </div>
          {!isModalOpen && (
            <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
              <div className="flex">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
                <button
                  type="submit"
                  className="bg-blue-800 text-white px-4 py-2 rounded-r-lg hover:bg-blue-500 transition duration-200"
                  disabled={loading}
                >
                  Send
                </button>
              </div>
            </form>
          )}
          {isModalOpen && (
            <div className="background bg-white">
              <div className="area" >
                <ul className="circles">
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

};

export default Chat;
