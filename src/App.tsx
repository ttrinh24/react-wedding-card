// src/App.tsx
import { useState } from 'react';
import Snowfall from 'react-snowfall';
import Confetti from 'react-confetti';
import Countdown from 'react-countdown';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import Lightbox from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";

const WEDDING_DATE_GROOM = new Date('2025-08-02T18:00:00');

export default function App() {
  const [confetti, setConfetti] = useState(false);
  const [wishes, setWishes] = useState([
    { name: "Hoàng Anh", message: "Chúc mừng tụi em đã tìm được nhau..." },
    { name: "C Ninh PCU", message: "Chúc hai em trăm năm hạnh phúc và sớm có baby nhé! Heart" },
    { name: "Chị Thoa", message: "Chị chúc 2 em Vĩnh-Loan luôn đồng hành..." },
    { name: "Lê Thành Nhân", message: "Dạ anh Vĩnh, chị Loan ơiiiiiiii..." },
    { name: "Anh Thịnh", message: "Hi 2 em - 2 người đồng nghiệp yêu quý..." },
    { name: "Chị Huyền", message: "Chúc mừng hạnh phúc hai vợ chồng nha..." },
    { name: "Manoj", message: "You two look absolutely stunning..." },
    { name: "Ms Kiêu Huyền", message: "Chúc hai em những điều tốt đẹp nhất..." },
    { name: "Thanh", message: "Đôi bạn đẹp đôi quá. Chúc hạnh phúc Heart" },
  ]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const photos = [
    { src: "https://via.placeholder.com/800x600?text=Photo+1", width: 800, height: 600 },
    { src: "https://via.placeholder.com/800x600?text=Photo+2", width: 800, height: 600 },
  ];

  const handleConfetti = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 5000);
  };

  const handleSubmitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) {
      setError('Vui lòng nhập tên và lời chúc!');
      return;
    }
    setWishes([...wishes, { name, message }]);
    setName('');
    setMessage('');
    setError('');
  };

  return (
    <>
      <Snowfall snowflakeCount={100} style={{ position: 'fixed', zIndex: 0 }} />
      {confetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-50 relative overflow-hidden">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 px-6 relative z-10"
          onClick={handleConfetti}
        >
          <h1 className="text-5xl md:text-7xl font-dancing text-rose-700 mb-4">
            Vĩnh & Loan
          </h1>
          <p className="text-xl md:text-2xl text-rose-600 font-light">
            Chúng tôi sắp kết hôn!
          </p>
          <div className="flex justify-center gap-8 mt-8 text-rose-600">
            <div>
              <p className="text-sm">Nhà gái</p>
              <p className="font-bold">13.07.2025</p>
            </div>
            <div className="text-3xl">Ring</div>
            <div>
              <p className="text-sm">Nhà trai</p>
              <p className="font-bold">02.08.2025</p>
            </div>
          </div>
        </motion.section>

        {/* Countdown */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="text-center py-10 bg-white/80 backdrop-blur-sm shadow-lg mx-6 md:mx-20 rounded-2xl"
        >
          <h2 className="text-3xl font-dancing text-rose-700 mb-6">Đếm ngược đến ngày vui</h2>
          <Countdown
            date={WEDDING_DATE_GROOM}
            renderer={({ days, hours, minutes, seconds }) => (
              <div className="flex justify-center gap-4 md:gap-8 text-2xl md:text-4xl">
                <div className="bg-rose-100 p-4 md:p-6 rounded-xl">
                  <div className="font-bold text-rose-700">{days}</div>
                  <div className="text-sm text-rose-600">Ngày</div>
                </div>
                <div className="bg-rose-100 p-4 md:p-6 rounded-xl">
                  <div className="font-bold text-rose-700">{hours}</div>
                  <div className="text-sm text-rose-600">Giờ</div>
                </div>
                <div className="bg-rose-100 p-4 md:p-6 rounded-xl">
                  <div className="font-bold text-rose-700">{minutes}</div>
                  <div className="text-sm text-rose-600">Phút</div>
                </div>
                <div className="bg-rose-100 p-4 md:p-6 rounded-xl">
                  <div className="font-bold text-rose-700">{seconds}</div>
                  <div className="text-sm text-rose-600">Giây</div>
                </div>
              </div>
            )}
          />
        </motion.div>

        {/* Events */}
        <section className="py-16 px-6">
          <h2 className="text-4xl font-dancing text-center text-rose-700 mb-12">Sự Kiện Cưới</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-8 rounded-2xl shadow-xl text-center">
              <h3 className="text-2xl font-bold text-rose-600 mb-2">TIỆC CƯỚI NHÀ GÁI</h3>
              <p className="text-gray-700 mb-4">
                17:30 13/07/2025<br />
                Nhà hàng Trầu Cau 2 - Quy Nhơn
              </p>
              <div className="flex justify-center gap-4">
                <a href="#" className="flex items-center gap-2 text-rose-600 hover:text-rose-700">
                  <FaCalendarAlt /> Thêm vào lịch
                </a>
                <a href="#" className="flex items-center gap-2 text-rose-600 hover:text-rose-700">
                  <FaMapMarkerAlt /> Xem bản đồ
                </a>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-8 rounded-2xl shadow-xl text-center">
              <h3 className="text-2xl font-bold text-rose-600 mb-2">TIỆC CƯỚI NHÀ TRAI</h3>
              <p className="text-gray-700 mb-4">
                18:00 02/08/2025<br />
                Riverside Palace - TP.HCM
              </p>
              <div className="flex justify-center gap-4">
                <a href="#" className="flex items-center gap-2 text-rose-600 hover:text-rose-700">
                  <FaCalendarAlt /> Thêm vào lịch
                </a>
                <a href="#" className="flex items-center gap-2 text-rose-600 hover:text-rose-700">
                  <FaMapMarkerAlt /> Xem bản đồ
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Love Story */}
        <section className="py-16 px-6 bg-rose-50">
          <h2 className="text-4xl font-dancing text-center text-rose-700 mb-12">Chuyện tình yêu</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg italic text-gray-700 leading-relaxed">
              "Tình yêu không có rào cản. Nó nhảy rào, vượt cản, xuyên tường để đến đích với đầy hy vọng..."
            </p>
            <p className="mt-6 text-2xl text-rose-600 font-dancing">2022 - Mãi mãi Peace</p>
          </div>
        </section>

        {/* Bride & Groom */}
        <section className="py-16 px-6">
          <h2 className="text-4xl font-dancing text-center text-rose-700 mb-12">Cô Dâu & Chú Rể</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div whileHover={{ y: -10 }} className="text-center">
              <div className="bg-gradient-to-br from-rose-200 to-pink-200 w-48 h-48 mx-auto rounded-full mb-6 flex items-center justify-center text-6xl">
                Groom
              </div>
              <h3 className="text-2xl font-bold text-rose-700">Thế Vĩnh</h3>
              <p className="text-gray-600 mt-2">Miền Tây sông nước • Hào sảng • Yêu cười</p>
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="text-center">
              <div className="bg-gradient-to-br from-pink-200 to-rose-200 w-48 h-48 mx-auto rounded-full mb-6 flex items-center justify-center text-6xl">
                Bride
              </div>
              <h3 className="text-2xl font-bold text-rose-700">Kiều Loan</h3>
              <p className="text-gray-600 mt-2">Miền Trung nắng gió • Hướng nội • Nói nhanh hơn chồng Laughing</p>
            </motion.div>
          </div>
        </section>

        {/* Guestbook */}
        <section className="py-16 px-6 bg-white">
          <h2 className="text-4xl font-dancing text-center text-rose-700 mb-12">Sổ Lưu Bút</h2>
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmitWish} className="mb-12 bg-rose-50 p-6 rounded-2xl">
              <input
                type="text"
                placeholder="Tên của bạn"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 mb-4 border border-rose-200 rounded-lg focus:outline-none focus:border-rose-500"
              />
              <textarea
                placeholder="Lời chúc của bạn..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full p-3 mb-4 border border-rose-200 rounded-lg focus:outline-none focus:border-rose-500"
              />
              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
              <button
                type="submit"
                className="w-full bg-rose-600 text-white py-3 rounded-lg hover:bg-rose-700 transition"
              >
                Gửi lời chúc Envelope
              </button>
            </form>

            <div className="space-y-6">
              {wishes.map((wish, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-rose-50 p-6 rounded-xl shadow-sm"
                >
                  <p className="font-bold text-rose-700">{wish.name}</p>
                  <p className="text-gray-700 mt-1">{wish.message}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-rose-600">
          <p className="text-sm">Cảm ơn bạn đã đến với ngày vui của chúng tôi Heart</p>
          <p className="mt-2 text-xs">Made with love by LoViFam</p>
        </footer>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={photos}
      />
    </>
  );
}