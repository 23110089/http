// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDqtvmIthBm6YJ_aYAMvfCt02Ca0w0acMY",
    authDomain: "message-5b161.firebaseapp.com",
    projectId: "message-5b161",
    storageBucket: "message-5b161.appspot.com",
    messagingSenderId: "536015331602",
    appId: "1:536015331602:web:de596fa165aebfb205d3cb",
    measurementId: "G-XQ6TWC83J0"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Tham chiếu đến bộ sưu tập tin nhắn
const messagesRef = collection(db, "messages");

const messagesList = document.getElementById("messages");

// Hàm tải lại tin nhắn
const loadMessages = (senderName) => {
    onSnapshot(messagesRef, (snapshot) => {
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

            // Kiểm tra nếu tin nhắn là của người gửi hiện tại
            if (sender === senderName) {
                li.classList.add("sender");
                li.textContent = `${text}`; // Chỉ hiển thị nội dung tin nhắn
            } else if (receiver === senderName) { // Kiểm tra nếu người nhận là người hiện tại
                li.classList.add("receiver");
                li.textContent = `${text}`; // Chỉ hiển thị nội dung tin nhắn
            }

            messagesList.appendChild(li);
        });
        messagesList.scrollTop = messagesList.scrollHeight;
    });
};

// Gửi tin nhắn
const sendMessage = async () => {
    const senderInput = document.getElementById("sender-input");
    const receiverInput = document.getElementById("receiver-input");
    const messageInput = document.getElementById("message-input");
    
    const senderName = senderInput.value.trim();
    const receiverName = receiverInput.value.trim();
    const messageText = messageInput.value.trim();

    if (senderName && receiverName && messageText) {
        await addDoc(messagesRef, {
            sender: senderName,
            receiver: receiverName,
            text: messageText,
            timestamp: new Date() // Thêm timestamp
        });
        messageInput.value = ""; // Xóa trường nhập
    }
    messagesList.scrollTop = messagesList.scrollHeight;
};

// Gửi khi nhấn nút
document.getElementById("send-button").addEventListener("click", sendMessage);

// Gửi khi nhấn phím Enter
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
    if (senderName && receiverName) {
        loadMessages(senderName);
    }
});

receiverInput.addEventListener("input", () => {
    const senderName = senderInput.value.trim();
    const receiverName = receiverInput.value.trim();
    if (senderName && receiverName) {
        loadMessages(senderName);
    }
});
