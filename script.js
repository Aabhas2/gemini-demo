import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import { GoogleGenerativeAI } from "https://cdn.jsdelivr.net/npm/@google/generative-ai/+esm";

const input = document.getElementById("prompt");
const submit = document.getElementById("submit-button");
const chatSection = document.getElementById("chat-section");

const API_KEY = 'AIzaSyAGtNApuxtgFjnuDMhWDjhTOAqm86l8S7Q';
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// console.log(model);

async function generateResult(prompt){
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
}
generateResult('how many hours are there in a day?'); 

function click() {
    const value = input.value;
    if (value.trim()) {
        const div = document.createElement("div");
        div.textContent = value;
        div.className = "user-message";

        const copyButton = document.createElement("span");
        copyButton.textContent = "Copy";
        copyButton.className = 'copy-button';
        copyButton.onclick = function () {
            copyToClipboard(value);
            alert("Message copied!");
        };

        chatSection.appendChild(div);
        div.appendChild(copyButton);
        input.value = "";
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function () {
        console.log("Copied to clipboard");
    })
        .catch(err => {
            console.error("Failed to copy: ", err);
        });
}

submit.onclick = click;

function keypress(e) {
    if (e.key === 'Enter') submit.click();
}
// input.onkeypress = keypress;
input.addEventListener('keypress', keypress);