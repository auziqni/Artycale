import React from "react";
import axios from "axios";

const TelegramMessage = () => {
  const sendMessage = async () => {
    const chatId = "1099351795"; // Ganti dengan ID chat Anda
    const botToken = "6293749848:AAEcc3l8gmjghyGi27EhZUhwmFngwVcIlZM"; // Ganti dengan token bot Anda
    const message = "Halo, ini pesan dari React!"; // Ganti dengan pesan yang ingin dikirim

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
      await axios.post(url, {
        chat_id: chatId,
        text: message,
      });
      console.log("Pesan berhasil dikirim ke Telegram");
    } catch (error) {
      console.error("Gagal mengirim pesan ke Telegram:", error);
    }
  };

  return <button onClick={sendMessage}>Kirim Pesan</button>;
};

export default TelegramMessage;
