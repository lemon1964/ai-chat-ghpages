// ai-chat-ghpages/src/services/audioService.ts
import { Howl } from "howler";

class AudioService {
  private musicVolume: number;
  private speechVolume: number;
  private music: Howl | null;
  private currentLanguage: string;
  private sounds: Record<string, Howl>; // 🔊 Звуки

  constructor() {
    this.musicVolume = 0.5;
    this.speechVolume = 1;
    this.music = null;
    this.currentLanguage = "ru-RU";
    this.sounds = {}; // 🎵 Инициализация
  }

  // 🎼 Музыка
  playMusic(path: string): void {
    if (this.music) {
      this.music.stop();
    }
    this.music = new Howl({ src: [path], loop: true, volume: this.musicVolume });
    this.music.play();
  }

  stopMusic(): void {
    if (this.music) {
      this.music.stop();
      this.music = null;
    }
  }

  getMusicVolume(): number {
    return this.musicVolume;
  }

  setMusicVolume(volume: number): void {
    this.musicVolume = Math.max(0, Math.min(volume, 1));
    if (this.music) {
      this.music.volume(this.musicVolume);
    }
  }

  // 🔊 Однократное воспроизведение звука
  playSound(name: string, path: string, volume = 1): void {
    if (!this.sounds[name]) {
      this.sounds[name] = new Howl({ src: [path], volume });
    }
    this.sounds[name].play();
  }

  // 🛑 Остановить звук по имени
  stopSound(name: string): void {
    const sound = this.sounds[name];
    if (sound) {
      sound.stop();
    }
  }

  speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    utterance.pitch = 0.7;
    utterance.volume = 1;
    speechSynthesis.speak(utterance);
  }
  
}

export const audioService = new AudioService();


// // ai-chat-ghpages/src/services/audioService.ts
// import { Howl } from "howler";

// class AudioService {
//   private musicVolume: number;
//   private speechVolume: number;
//   private music: Howl | null;
//   private currentLanguage: string;

//   constructor() {
//     this.musicVolume = 0.5;
//     this.speechVolume = 1; // от 0 до 1
//     this.music = null;
//     this.currentLanguage = "ru-RU"; // Язык по умолчанию
//   }

//   playMusic(path: string): void {
//     if (this.music) {
//       this.music.stop();
//     }

//     this.music = new Howl({ src: [path], loop: true, volume: this.musicVolume });
//     this.music.play();
//   }

//   stopMusic(): void {
//     if (this.music) {
//       this.music.stop();
//       this.music = null;
//     }
//   }

//   getMusicVolume(): number {
//     return this.musicVolume;
//   }

//   setMusicVolume(volume: number): void {
//     this.musicVolume = Math.max(0, Math.min(volume, 1));
//     if (this.music) {
//       this.music.volume(this.musicVolume);
//     }
//   }


//   // Методы управления речью
//   speak(text: string): void {
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = this.currentLanguage;
//     utterance.volume = this.speechVolume;
//     speechSynthesis.speak(utterance);
//   }

//   setSpeechLanguage(language: string): void {
//     this.currentLanguage = language;
//   }

//   getSpeechVolume(): number {
//     return this.speechVolume;
//   }

//   setSpeechVolume(volume: number): void {
//     this.speechVolume = Math.max(0, Math.min(volume, 1));
//   }

//   getCurrentLanguage(): string {
//     return this.currentLanguage;
//   }
// }

// export const audioService = new AudioService();