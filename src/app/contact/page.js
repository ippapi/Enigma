"use client";

export default function Contact() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Để Lại Lời Nhắn!</h2>
      <form>
        <table className="w-full mb-4">
          <tbody>
            <tr>
              <td className="pr-2">
                <input type="text" placeholder="Tên" className="border p-2 w-full" />
              </td>
              <td>
                <input type="email" placeholder="Email" className="border p-2 w-full" />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <textarea
                  cols="30"
                  rows="5"
                  placeholder="Tin nhắn"
                  className="border p-2 w-full mt-2"
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">GỬI LỜI NHẮN</button>
      </form>
      
      <div className="mt-6">
        <h2 className="text-2xl font-bold">Liên hệ chúng tôi</h2>
        <p>
          <b>Công ty TNHH Tarot Enigma</b><br />
          <b>GPĐKKD:</b> số 0123456789 do Sở KHĐT TP.HCM cấp ngày 03/04/2017<br />
          <b>Cửa hàng:</b> Khu phố 6, P.Linh Trung, Tp.Thủ Đức, Tp.Hồ Chí Minh.<br />
          <b>Hotline:</b> 0123456789 - 0123456789<br />
          <b>Email:</b> support@tarotenigma.com
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold">Trang xã hội</h2>
        <div className="flex space-x-4">
          <a href="https://www.facebook.com/UIT.Fanpage">
            <i className="fa-brands fa-facebook fa-2xl"></i>
          </a>
          <a href="https://www.instagram.com/truongdhcongnghethongtin/">
            <i className="fa-brands fa-instagram fa-2xl"></i>
          </a>
          <a href="https://www.pinterest.com/search/pins/?q=tarot&rs=typed">
            <i className="fa-brands fa-pinterest fa-2xl"></i>
          </a>
          <a href="https://www.youtube.com/@uitchannel">
            <i className="fa-brands fa-youtube fa-2xl"></i>
          </a>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold">Giờ làm việc</h2>
        <ul className="list-disc pl-5">
          <li><b>Văn phòng:</b> Thứ 2 – Thứ 7; 9:00 – 18:00</li>
          <li><b>Cửa hàng:</b> Thứ 2 - Chủ nhật; 9:00 - 21:00</li>
        </ul>
      </div>
    </div>
  );
}
