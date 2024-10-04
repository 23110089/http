import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// khởi tạo Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDqtvmIthBm6YJ_aYAMvfCt02Ca0w0acMY",
    authDomain: "message-5b161.firebaseapp.com",
    projectId: "message-5b161",
    storageBucket: "message-5b161.appspot.com",
    messagingSenderId: "536015331602",
    appId: "1:536015331602:web:de596fa165aebfb205d3cb",
    measurementId: "G-XQ6TWC83J0"
};
const db = getFirestore(initializeApp(firebaseConfig));
const messagesRef = collection(db, "msg");

// Hàm tải lại tin nhắn
const loadMessages = async () => {
    onSnapshot(messagesRef, (snapshot) => {
        const senderName = document.getElementById("sender-input").value.trim();
        const receiverName = document.getElementById("receiver-input").value.trim();
        const messagesList = document.getElementById("messages");
        messagesList.innerHTML = ""; // Xóa danh sách tin nhắn hiện tại

        // Lưu tin nhắn vào mảng và sắp xếp theo timestamp
        const messagesArray = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            messagesArray.push({ id: doc.id, ...data }); // Lưu id cùng dữ liệu
        });

        // Sắp xếp tin nhắn theo timestamp (từ cũ đến mới)
        messagesArray.sort((a, b) => a.timestamp - b.timestamp);

        // Hiển thị tin nhắn
        messagesArray.forEach(({ sender, receiver, text }) => {
            const li = document.createElement("li");
            if (sender === senderName && receiver === receiverName) {
                li.classList.add("sender");
                li.textContent = `${text}`;
            } else if (receiver === senderName && sender === receiverName) {
                li.classList.add("receiver");
                li.textContent = `${text}`;
            }
            messagesList.appendChild(li);
        });
        messagesList.scrollTop = messagesList.scrollHeight;
    });
};

// Gửi tin nhắn
const sendMessage = async () => {
    const messagesList = document.getElementById("messages");
    const senderName = document.getElementById("sender-input").value.trim();
    const receiverName = document.getElementById("receiver-input").value.trim();
    const messageText = document.getElementById("message-input").value.trim();

    if (senderName && receiverName && messageText) {
        await addDoc(messagesRef, {
            sender: senderName,
            receiver: receiverName,
            text: messageText,
            timestamp: new Date()
        });
        document.getElementById("message-input").value = ""; // Xóa trường nhập
    }
    messagesList.scrollTop = messagesList.scrollHeight;
};

// Gửi tin nhắn
document.getElementById("send-button").addEventListener("click", sendMessage);
document.getElementById("message-input").addEventListener("keypress", (event) => {
    if (event.key === "Enter"&& !event.shiftKey) {
        event.preventDefault(); // Ngăn chặn hành động mặc định
        sendMessage(); // Gọi hàm gửi tin nhắn
    }
});

// Lắng nghe sự thay đổi trong trường nhập người gửi và người nhận
const senderInput = document.getElementById("sender-input");
const receiverInput = document.getElementById("receiver-input");
senderInput.addEventListener("input", () => {
    const senderName = senderInput.value.trim();
    const receiverName = receiverInput.value.trim();
    if (senderName && receiverName) loadMessages(senderName);
});
receiverInput.addEventListener("input", () => {
    const senderName = senderInput.value.trim();
    const receiverName = receiverInput.value.trim();
    if (senderName && receiverName) loadMessages(senderName);
});

// Hàm kiểm tra cookie và yêu cầu người dùng nhập tên đăng nhập và mật khẩu
function checkLogin() {
    // Lấy cookie tên đăng nhập
    const usernameCookie = getCookie("username");

    if (!usernameCookie) {
        // Nếu không có cookie tên đăng nhập, yêu cầu người dùng nhập
        const username = prompt("Xin vui lòng nhập tên đăng nhập: "+document.cookie);
        const password = prompt("Xin vui lòng nhập mật khẩu: ");

        // Bạn có thể thêm logic để kiểm tra tên đăng nhập và mật khẩu tại đây
        // Ví dụ: so sánh với thông tin đăng nhập đã lưu trữ

        // Lưu cookie tên đăng nhập (không bao gồm mật khẩu)
        document.cookie = `username=${username}; path=/`; // Cookie sẽ hết hạn sau 1 giờ
        alert("Đăng nhập thành công!");
    } else {
        alert(`Chào mừng trở lại, ${usernameCookie}!`);
    }
    document.getElementById("sender-input").value = username;
}

// Hàm để lấy giá trị của cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Gọi hàm kiểm tra đăng nhập khi trang được tải
window.onload = checkLogin;
