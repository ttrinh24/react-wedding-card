import { useState, useEffect } from 'react';
import Snowfall from 'react-snowfall';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCalendarAlt, FaHeart, FaEnvelope } from 'react-icons/fa';
import Lightbox from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";

// === Định nghĩa kiểu dữ liệu ===
interface Wish {
  name: string;
  message: string;
}

interface Photo {
  src: string;
  width: number;
  height: number;
}

// === Countdown tự viết ===
function CustomCountdown({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center gap-4 md:gap-8 text-2xl md:text-4xl">
      {[
        { value: timeLeft.days, label: "Ngày" },
        { value: timeLeft.hours, label: "Giờ" },
        { value: timeLeft.minutes, label: "Phút" },
        { value: timeLeft.seconds, label: "Giây" },
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="bg-rose-100 p-4 md:p-6 rounded-xl min-w-[60px] text-center"
        >
          <div className="font-bold text-rose-700">{item.value}</div>
          <div className="text-sm text-rose-600">{item.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

// === App Component ===
export default function App() {
  const [confetti, setConfetti] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>(() => {
    const saved = localStorage.getItem('weddingWishes');
    return saved
      ? JSON.parse(saved)
      : [
          { name: "Hoàng Anh", message: "Chúc mừng tụi em đã tìm được nhau..." },
          { name: "C Ninh PCU", message: "Chúc hai em trăm năm hạnh phúc và sớm có baby nhé! Heart" },
          { name: "Chị Thoa", message: "Chị chúc 2 em Vĩnh-Loan luôn đồng hành..." },
          { name: "Lê Thành Nhân", message: "Dạ anh Vĩnh, chị Loan ơiiiiiiii..." },
          { name: "Anh Thịnh", message: "Hi 2 em - 2 người đồng nghiệp yêu quý..." },
          { name: "Chị Huyền", message: "Chúc mừng hạnh phúc hai vợ chồng nha..." },
          { name: "Manoj", message: "You two look absolutely stunning..." },
          { name: "Ms Kiêu Huyền", message: "Chúc hai em những điều tốt đẹp nhất..." },
          { name: "Thanh", message: "Đôi bạn đẹp đôi quá. Chúc hạnh phúc Heart" },
        ];
  });
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const photos: Photo[] = [
    { src: "https://via.placeholder.com/800x600?text=Vinh+&+Loan+1", width: 800, height: 600 },
    { src: "https://via.placeholder.com/800x600?text=Vinh+&+Loan+2", width: 800, height: 600 },
  ];

  const WEDDING_DATE_GROOM = new Date('2026-08-02T18:00:00+07:00'); // Demo

  useEffect(() => {
    localStorage.setItem('weddingWishes', JSON.stringify(wishes));
  }, [wishes]);

  const handleConfetti = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 5000);
  };

  const handleSubmitWish = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError('Vui lòng nhập tên và lời chúc!');
      return;
    }
    const newWish: Wish = { name: name.trim(), message: message.trim() };
    setWishes((prev: Wish[]) => [...prev, newWish]);
    setName('');
    setMessage('');
    setError('');
  };

  // DÙNG openLightbox
  const openLightbox = (index: number) => {
    setPhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <Snowfall
        snowflakeCount={100}
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          top: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      {confetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-rose-100 relative overflow-hidden">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center py-20 px-6 relative z-10"
          onClick={handleConfetti}
        >
          <h1 className="text-5xl md:text-7xl font-dancing text-rose-700 mb-4">
            Vĩnh & Loan
          </h1>
          <p className="text-xl md:text-2xl text-rose-600 font-light mb-8">
            Chúng tôi sắp kết hôn!
          </p>
          <div className="flex justify-center items-center gap-8 mt-8 text-rose-600">
            <div className="text-center">
              <p className="text-sm opacity-80">Nhà gái</p>
              <p className="font-bold text-lg">13.07.2025</p>
            </div>
            <div className="text-4xl">Ring</div>
            <div className="text-center">
              <p className="text-sm opacity-80">Nhà trai</p>
              <p className="font-bold text-lg">02.08.2025</p>
            </div>
          </div>
        </motion.section>

        {/* Countdown */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center py-10 bg-white/80 backdrop-blur-sm shadow-xl mx-6 md:mx-20 rounded-2xl mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-dancing text-rose-700 mb-6">Đếm ngược đến ngày vui</h2>
          <CustomCountdown targetDate={WEDDING_DATE_GROOM} />
        </motion.div>

        {/* Events */}
        <section className="py-16 px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-dancing text-center text-rose-700 mb-12"
          >
            Sự Kiện Cưới
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-2xl shadow-xl text-center border border-rose-100"
            >
              <h3 className="text-2xl font-bold text-rose-600 mb-2">TIỆC CƯỚI NHÀ GÁI</h3>
              <p className="text-gray-700 mb-4 text-sm">
                17:30 13/07/2025<br />
                Nhà hàng Trầu Cau 2 - sảnh bờ hồ T3, đường Lê Lợi nối dài, TP. Quy Nhơn
              </p>
              <div className="flex justify-center gap-4">
                <a href="#" className="flex items-center gap-2 text-rose-600 hover:text-rose-700 text-sm">
                  <FaCalendarAlt /> Thêm vào lịch
                </a>
                <a href="#" className="flex items-center gap-2 text-rose-600 hover:text-rose-700 text-sm">
                  <FaMapMarkerAlt /> Xem bản đồ
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-2xl shadow-xl text-center border border-rose-100"
            >
              <h3 className="text-2xl font-bold text-rose-600 mb-2">TIỆC CƯỚI NHÀ TRAI</h3>
              <p className="text-gray-700 mb-4 text-sm">
                18:00 02/08/2025<br />
                Nhà Hàng Riverside Palace - Sảnh Nile 360D Bến Vân Đồn, phường 1, Quận 4, TP. Hồ Chí Minh
              </p>
              <div className="flex justify-center gap-4">
                <a href="#" className="flex items-center gap-2 text-rose-600 hover:text-rose-700 text-sm">
                  <FaCalendarAlt /> Thêm vào lịch
                </a>
                <a href="#" className="flex items-center gap-2 text-rose-600 hover:text-rose-700 text-sm">
                  <FaMapMarkerAlt /> Xem bản đồ
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Love Story */}
        <section className="py-16 px-6 bg-rose-50">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-dancing text-center text-rose-700 mb-12"
          >
            Chuyện tình yêu
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-lg italic text-gray-700 leading-relaxed mb-6">
              "Tình yêu không có rào cản. Nó nhảy rào, vượt cản, xuyên tường để đến đích với đầy hy vọng và bất chấp... như tình yêu của gia đình LoViFam"
            </p>
            <p className="text-2xl text-rose-600 font-dancing">2022 - Mãi mãi Peace</p>
          </motion.div>
        </section>

        {/* Bride & Groom */}
        <section className="py-16 px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-dancing text-center text-rose-700 mb-12"
          >
            Cô Dâu & Chú Rể
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              className="text-center"
            >
              <div
                className="bg-gradient-to-br from-rose-200 to-pink-200 w-48 h-48 mx-auto rounded-full mb-6 flex items-center justify-center text-6xl cursor-pointer"
                onClick={() => openLightbox(0)}
              >
                Groom
              </div>
              <h3 className="text-2xl font-bold text-rose-700">Thế Vĩnh</h3>
              <p className="text-gray-600 mt-2 text-sm">Sinh ra và lớn lên ở Miền Tây sông nước - Học tập và Phát triển tại thành phố Hồ Chí Minh. Tính cách thân thiện - Tiếng cười hào sảng</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              className="text-center"
            >
              <div
                className="bg-gradient-to-br from-pink-200 to-rose-200 w-48 h-48 mx-auto rounded-full mb-6 flex items-center justify-center text-6xl cursor-pointer"
                onClick={() => openLightbox(1)}
              >
                Bride
              </div>
              <h3 className="text-2xl font-bold text-rose-700">Kiều Loan</h3>
              <p className="text-gray-600 mt-2 text-sm">Sinh ra và lớn lên ở Miền Trung nắng gió - Học tập và Phát triển tại thành phố Hồ Chí Minh. Tính cách hướng nội nhưng nhiều lúc nói không cho chồng kịp trả lời Laughing</p>
            </motion.div>
          </div>
        </section>

        {/* Guestbook */}
        <section className="py-16 px-6 bg-white">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-dancing text-center text-rose-700 mb-12"
          >
            Sổ Lưu Bút
          </motion.h2>
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmitWish} className="mb-12 bg-rose-50 p-6 rounded-2xl shadow-inner">
              <input
                type="text"
                placeholder="Tên của bạn *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 mb-4 border border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                required
              />
              <textarea
                placeholder="Lời chúc của bạn *..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full p-3 mb-4 border border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 resize-none"
                required
              />
              {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
              <button
                type="submit"
                className="w-full bg-rose-600 text-white py-3 rounded-lg hover:bg-rose-700 transition-colors flex items-center justify-center gap-2"
              >
                <FaEnvelope /> Gửi lời chúc Mail
              </button>
            </form>

            <div className="space-y-6">
              {wishes.map((wish: Wish, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-rose-50 p-6 rounded-xl shadow-sm border border-rose-100 hover:shadow-md transition-shadow"
                >
                  <p className="font-bold text-rose-700 text-lg mb-1">{wish.name}</p>
                  <p className="text-gray-700 leading-relaxed">{wish.message}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-rose-600 border-t border-rose-100">
          <p className="text-sm mb-2">Cảm ơn tất cả những anh chị em thân yêu của tụi em! <FaHeart className="inline ml-1" /></p>
          <p className="text-xs opacity-75">Made with love by LoViFam</p>
        </footer>
      </div>

      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={photoIndex}
          slides={photos}
        />
      )}
    </>
  );
}