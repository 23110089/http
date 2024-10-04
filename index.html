import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Khởi tạo Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDqtvmIthBm6YJ_aYAMvfCt02Ca0w0acMY",
    authDomain: "message-5b161.firebaseapp.com",
    projectId: "message-5b161",
    storageBucket: "message-5b161.appspot.com",
    messagingSenderId: "536015331602",
    appId: "1:536015331602:web:de596fa165aebfb205d3cb",
    measurementId: "G-XQ6TWC83J0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const messagesRef = collection(db, "msg");

// Hàm đăng ký tài khoản
const registerUser = async () => {
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Đăng ký thành công!");
        document.getElementById("register-form").style.display = "none"; // Ẩn form đăng ký
        document.getElementById("login-form").style.display = "block"; // Hiện form đăng nhập
    } catch (error) {
        alert(error.message);
    }
};

// Hàm đăng nhập
const loginUser = async () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Đăng nhập thành công!");
        document.getElementById("login-form").style.display = "none"; // Ẩn form đăng nhập
        document.getElementById("chat-box").style.display = "block"; // Hiện khung chat
        loadMessages(); // Tải tin nhắn
    } catch (error) {
        alert(error.message);
    }
};

// Gọi hàm khi nhấn nút đăng ký
document.getElementById("register-button").addEventListener("click", registerUser);

// Gọi hàm khi nhấn nút đăng nhập
document.getElementById("login-button").addEventListener("click", loginUser);

// Hiển thị form đăng ký
document.getElementById("show-register").addEventListener("click", () => {
    document.getElementById("login-form").style.display = "none"; // Ẩn form đăng nhập
    document.getElementById("register-form").style.display = "block"; // Hiện form đăng ký
});

// Hiển thị form đăng nhập
document.getElementById("show-login").addEventListener("click", () => {
    document.getElementById("register-form").style.display = "none"; // Ẩn form đăng ký
    document.getElementById("login-form").style.display = "block"; // Hiện form đăng nhập
});

// Hàm tải lại tin nhắn
const loadMessages = async () => {
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
            li.textContent = `${sender}: ${text}`; // Hiển thị tên người gửi và tin nhắn
            messagesList.appendChild(li);
        });
    });
};

// Gửi tin nhắn
const sendMessage = async () => {
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
};

document.getElementById("send-button").addEventListener("click", sendMessage);
document.getElementById("message-input").addEventListener("keypress", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); // Ngăn chặn hành động mặc định
        sendMessage(); // Gọi hàm gửi tin nhắn
    }
});
