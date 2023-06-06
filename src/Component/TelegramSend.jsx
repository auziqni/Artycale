import React from "react";
import axios from "axios";

function cekIdealBayi(berat, tinggi) {
  // Tabel WHO untuk berat dan tinggi bayi
  var tabelWHO = [
    // Rentang usia: 0-3 bulan
    [
      { berat: 3200, tinggi: 55 },
      { berat: 6600, tinggi: 61 },
    ],
    // Rentang usia: 3-6 bulan
    [
      { berat: 5000, tinggi: 60 },
      { berat: 8100, tinggi: 66 },
    ],
    // Rentang usia: 6-9 bulan
    [
      { berat: 6000, tinggi: 64 },
      { berat: 9600, tinggi: 71 },
    ],
    // Rentang usia: 9-12 bulan
    [
      { berat: 6700, tinggi: 67 },
      { berat: 1020, tinggi: 75 },
    ],
    // Rentang usia: 12-15 bulan
    [
      { berat: 7200, tinggi: 69 },
      { berat: 1080, tinggi: 79 },
    ],
    // Rentang usia: 15-18 bulan
    [
      { berat: 7600, tinggi: 71 },
      { berat: 1130, tinggi: 82 },
    ],
    // Rentang usia: 18-21 bulan
    [
      { berat: 8000, tinggi: 73 },
      { berat: 1180, tinggi: 85 },
    ],
    // Rentang usia: 21-24 bulan
    [
      { berat: 8400, tinggi: 75 },
      { berat: 1220, tinggi: 89 },
    ],
  ];

  // Mengecek apakah berat dan tinggi dalam rentang normal untuk setiap rentang usia
  for (var i = 0; i < tabelWHO.length; i++) {
    var rentangUsia = i * 3;
    var rentangBerat = tabelWHO[i];
    var rentangTinggi = tabelWHO[i];

    if (
      berat >= rentangBerat[0].berat &&
      berat <= rentangBerat[1].berat &&
      tinggi >= rentangTinggi[0].tinggi &&
      tinggi <= rentangTinggi[1].tinggi
    ) {
      return (
        "Bayi memiliki berat dan tinggi yang ideal untuk usia " +
        rentangUsia +
        "-" +
        (rentangUsia + 3) +
        " bulan."
      );
    }
  }

  // Jika tidak ada rentang usia yang cocok
  return "Berat dan tinggi bayi tidak sesuai dengan rentang normal untuk usia 0-24 bulan.";
}

// // Contoh penggunaan fungsi cekIdealBayi
// var beratBayi = 9; // Berat bayi dalam kilogram
// var tinggiBayi = 72; // Tinggi

const TelegramMessage = (props) => {
  const datas = props.data;
  const sendMessage = async () => {
    // const chatId = datas[0].IdTele; // Ganti dengan ID chat Anda
    const chatId1 = "1099351795"; // Ganti dengan ID chat Anda
    const chatId2 = "1241329167"; // Ganti dengan ID chat Anda
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
      var IsIdeal = cekIdealBayi(prop.SensWeight, prop.SensLenght);
      sentence += `Pada penimbangan tanggal: ${prop.Date} => Berat: ${prop.SensWeight}, Panjang: ${prop.SensLenght}, Suhu: ${prop.SensTemp}, ${IsIdeal} \n`;
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
      await axios.post(url, {
        chat_id: chatId1,
        text: sentence,
      });
      console.log("Pesan berhasil dikirim ke Telegram");
    } catch (error) {
      console.error("Gagal mengirim pesan ke Telegram:", error);
    }
    try {
      await axios.post(url, {
        chat_id: chatId2,
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
