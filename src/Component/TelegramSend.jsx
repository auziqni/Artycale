import React from "react";
import axios from "axios";

const TelegramMessage = (props) => {
  const datas = props.data;
  const sendMessage = async () => {
    const chatId = datas[0].IdTele; // Ganti dengan ID chat Anda
    const botToken = "6293749848:AAEcc3l8gmjghyGi27EhZUhwmFngwVcIlZM"; // Ganti dengan token bot Anda
    // const message = "Halo, ini pesan dari React!"; // Ganti dengan pesan yang ingin dikirim
    // const usersString = JSON.stringify(
    //   datas.map((prop) => JSON.stringify(prop))
    // );
    // Variabel untuk menyimpan kalimat
    //Kepada Tn/Ny {orang tua} dengan nama anak {}
    let sentence = `Kepada Tn/Ny ${datas[0].Parent} dengan nama anak ${datas[0].Child} \n`;

    // Menggunakan for loop untuk membentuk kalimat
    for (let i = 0; i < datas.length; i++) {
      const prop = datas[i];
      sentence += `Pada penimbangan tanggal: ${prop.Date} => Berat: ${prop.SensWeight}, Panjang: ${prop.SensLenght}, Suhu: ${prop.SensTemp}, dengan kondisi Ideal \n`;
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
      await axios.post(url, {
        chat_id: chatId,
        text: sentence,
      });
      console.log("Pesan berhasil dikirim ke Telegram");
    } catch (error) {
      console.error("Gagal mengirim pesan ke Telegram:", error);
    }
  };

  return <button onClick={sendMessage}>Kirim pesan</button>;
};

export default TelegramMessage;
