window.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const closeModalBtn = document.getElementById("closeModal");
  const greeting = document.getElementById("greeting");
  const btn = document.getElementById("btn");
  const voice = document.getElementById("voice");

  const hour = new Date().getHours();
  let wish = "Hello!";
  if (hour < 12) wish = "Good Morning! Welcome to Vishuddhi Assistant.";
  else if (hour < 18) wish = "Good Afternoon! Welcome to Vishuddhi Assistant.";
  else wish = "Good Evening! Welcome to Vishuddhi Assistant.";
  greeting.textContent = wish;
  modal.classList.remove("hidden");

  const speakGreeting = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;
    utterance.lang = 'hi-IN';
    speechSynthesis.speak(utterance);
  };

  speakGreeting(wish);

  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    speechSynthesis.cancel();
  });

  btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
  });
});

function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  text_speak.lang = "hi-IN";
  window.speechSynthesis.speak(text_speak);
}



let speechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
  let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  recognition.start();
  btn.style.display = "none";
  voice.style.display = "block";
});
function getRandomJoke() {
  const jokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs!",
    "How many programmers does it take to change a light bulb? None, that is a hardware problem!",
    "Why do Java developers wear glasses? Because they cannot C Sharp!",
    "What is a programmer favorite hangout place? Foo Bar!",
    "Why did the programmer quit his job? He did not get arrays!",
  ];
  return jokes[Math.floor(Math.random() * jokes.length)];
}
async function takeCommand(message) {
  btn.style.display = "flex";
  voice.style.display = "none";

  if (message.includes("hello") || message.includes("hey")) {
    speak("Hello sir, what can I help you with?");
  } else if (message.includes("who are you")) {
    speak("I am your virtual assistant, created by Vishuddhi.");
  } else if (message.includes("open youtube")) {
    speak("Opening YouTube...");
    window.open("https://www.youtube.com/", "_blank");
  } else if (message.includes("open instagram")) {
    speak("Opening Instagram...");
    window.open("https://www.instagram.com/", "_blank");
  } else if (message.includes("open google")) {
    speak("Opening Google...");
    window.open("https://www.google.com/", "_blank");
  } else if (message.includes("open facebook")) {
    speak("Opening Facebook...");
    window.open("https://www.facebook.com/", "_blank");
  } else if (message.includes("time")) {
    let time = new Date().toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    speak(time);
  } else if (message.includes("date")) {
    let date = new Date().toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
    });
    speak("Today's date is " + date);
  } else if (message.includes("weather") || message.includes("temperature")) {
    speak("Fetching weather details...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        let apiKey = "c73e027f2dfe04ecc18e15c09ee79205";
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        try {
          let response = await fetch(url);
          let data = await response.json();
          let temp = data.main.temp;
          let desc = data.weather[0].description;
          speak(`The temperature is ${temp} degrees Celsius with ${desc}.`);
        } catch (error) {
          speak("Sorry, I couldn't fetch the weather details.");
        }
      },
      () => {
        speak("Location access denied.");
      }
    );
  } else if (message.includes("calculate") || message.includes("what is")) {
    let expression = message
      .replace("calculate", "")
      .replace("what is", "")
      .trim();
    expression = expression
      .replace(/plus/gi, "+")
      .replace(/minus/gi, "-")
      .replace(/times|multiplied by/gi, "*")
      .replace(/divided by|over/gi, "/");

    try {
      let result = math.evaluate(expression);
      speak(`The result is ${result}`);
    } catch (e) {
      speak("Sorry, I couldn't calculate that.");
    }
  } else if (
    message.includes("play music") ||
    message.includes("open spotify")
  ) {
    speak("Opening Spotify...");
    window.open("https://open.spotify.com/", "_blank");
  } else if (message.includes("open youtube music")) {
    speak("Opening YouTube Music...");
    window.open("https://music.youtube.com/", "_blank");
  } else if (message.includes("open gmail")) {
    response = "Opening Gmail...";
    window.open("https://mail.google.com/", "_blank");
  } else if (message.includes("open github")) {
    response = "Opening GitHub...";
    window.open("https://github.com/", "_blank");
  } else if (message.includes("news") || message.includes("headlines")) {
    speak("Opening the latest news headlines for you.");
    window.open("https://news.google.com/topstories", "_blank");
  } else if (message.includes("open calculator")) {
    speak("Opening Calculator...");
    window.open("calculator://");
  } else if (message.includes("open whatsapp")) {
    speak("Opening Whatsapp...");
    window.open("whatsapp://");
  } else if (message.includes("joke")) {
    response = this.getRandomJoke();
  } else {
    let cleanedQuery = message
      .replace("search", "")
      .replace("vishuddhi", "")
      .trim();
    let finalText = `This is what I found on the internet regarding ${cleanedQuery}`;
    speak(finalText);
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(cleanedQuery)}`,
      "_blank"
    );
  }
}
